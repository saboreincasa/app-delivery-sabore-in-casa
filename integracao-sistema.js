// ===============================
// INTEGRACAO COM O SISTEMA DE GESTAO (Sabore In Casa / Supabase)
// ===============================
// Este app de delivery passa a buscar o cardapio (pizzas e bebidas) e a
// registrar cada pedido diretamente no mesmo banco do painel de gestao
// (https://saboreincasa.github.io/sabore-in-casa-sistema/).
//
// Se o Supabase estiver fora do ar, o app continua funcionando normalmente
// com os dados locais (produtos.json / listas de fallback abaixo) - o envio
// do pedido pelo WhatsApp NUNCA fica bloqueado por causa disso.

const SISTEMA_SUPABASE_URL = "https://hzkmhtfwulxvysorvcjb.supabase.co"
const SISTEMA_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6a21odGZ3dWx4dnlzb3J2Y2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2OTk2MDksImV4cCI6MjEwMjI3NTYwOX0.TgB3ePpPMCHTvHiK56pZFAY--YPw625HidVRnHaFfZ4"

const sistemaSupabase = (typeof window.supabase !== "undefined")
    ? window.supabase.createClient(SISTEMA_SUPABASE_URL, SISTEMA_SUPABASE_ANON_KEY)
    : null

// O banco de dados nao guarda a descricao/ingredientes dos sabores, entao
// mantemos aqui um texto para os sabores classicos. Sabores novos cadastrados
// no painel de gestao aparecem sem essa linha (nao impede o funcionamento).
const DESCRICOES_SABORES = {
    "Calabresa": "Molho, mussarela, calabresa, cebola",
    "Frango com Catupiry": "Molho, frango desfiado, catupiry",
    "Quatro Queijos": "Mussarela, provolone, parmesao, catupiry",
    "4 Queijos": "Mussarela, provolone, parmesao, catupiry",
    "Portuguesa": "Presunto, ovo, cebola, ervilha",
    "Marguerita": "Mussarela, tomate, manjericao",
    "Baiana": "Calabresa, ovo, pimenta, cebola",
    "A Baiana": "Calabresa, ovo, pimenta, cebola",
    "Napolitana": "Mussarela, tomate, parmesao",
    "Milho com Bacon": "Milho, bacon, mussarela",
    "Moda da Casa": "Frango, bacon, milho, catupiry",
    "À Moda da Casa": "Frango, bacon, milho, catupiry"
}

// Diferencial da casa: toda pizza e feita com massa 100% integral. Sempre
// aparece na descricao, ate para sabores novos sem ingredientes cadastrados
// acima (cadastrados direto no painel de gestao).
function descricaoComMassaIntegral(ingredientes){
    return ingredientes ? `Massa 100% integral. ${ingredientes}` : "Massa 100% integral."
}

let cardapioPizzas = []
let cardapioBebidas = []

const cardapioProntoPromise = carregarCardapioDoSistema()

async function carregarCardapioDoSistema(){
    if(!sistemaSupabase) return
    try{
        const [pizzasRes, bebidasRes] = await Promise.all([
            sistemaSupabase.from("v_delivery_pizzas").select("*"),
            sistemaSupabase.from("v_delivery_bebidas").select("*")
        ])
        if(!pizzasRes.error && pizzasRes.data && pizzasRes.data.length){
            cardapioPizzas = pizzasRes.data.map(s => ({
                id: s.id,
                nome: s.nome,
                desc: descricaoComMassaIntegral(DESCRICOES_SABORES[s.nome]),
                img: s.imagem_url || "imagens/pizza-padrao.png",
                precoP: Number(s.preco_p || 0),
                precoM: Number(s.preco_m || 0),
                precoG: Number(s.preco_g || 0)
            }))
        }
        if(!bebidasRes.error && bebidasRes.data && bebidasRes.data.length){
            cardapioBebidas = bebidasRes.data.map(b => ({
                id: b.id,
                nome: b.nome,
                preco: Number(b.preco || 0),
                img: b.imagem_url || "imagens/sem-imagem.png"
            }))
        }
    }catch(e){
        console.warn("Nao foi possivel carregar o cardapio do sistema de gestao. Usando dados locais.", e)
    }
}

// Registra o pedido como venda(s) no sistema de gestao. Nunca lanca erro para
// quem chamou - se falhar (ou demorar demais), so avisa no console e o pedido
// segue normalmente pelo WhatsApp, que continua sendo a forma oficial do pedido.
// Tem um limite de tempo curto porque quem chama espera essa promise terminar
// antes de redirecionar para o WhatsApp (senao a navegacao pode cancelar a
// requisicao no meio do caminho).
async function enviarPedidoParaSistema({ itens, nome, telefone, endereco, aniversario, observacoes }){
    if(!sistemaSupabase) return null
    if(!itens || itens.length === 0) return null
    try{
        const chamada = sistemaSupabase.rpc("criar_pedido_delivery", {
            p_itens: itens,
            p_cliente_nome: nome,
            p_cliente_telefone: telefone || null,
            p_cliente_endereco: endereco || null,
            p_cliente_aniversario: aniversario || null,
            p_observacoes: observacoes || null
        })
        const timeout = new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 4000))
        const resultado = await Promise.race([chamada, timeout])
        if(resultado.timeout){
            console.warn("Sincronizacao com o sistema de gestao demorou demais, seguindo sem esperar.")
            return null
        }
        if(resultado.error){
            console.warn("Pedido nao foi sincronizado com o sistema de gestao:", resultado.error.message)
            return null
        }
        return resultado.data
    }catch(e){
        console.warn("Pedido nao foi sincronizado com o sistema de gestao:", e)
        return null
    }
}
