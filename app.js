// ===============================
// CARRINHO
// ===============================
let carrinho = []
let numeroPedido = Number(localStorage.getItem("numeroPedido")) || 0
const whatsappNumero = "5531983391576"

// ===============================
// CADASTRO DO CLIENTE
// ===============================

let cliente = JSON.parse(localStorage.getItem("clienteCadastro")) || null

function salvarCliente(dados){
    localStorage.setItem("clienteCadastro", JSON.stringify(dados))
    cliente = dados
}

function verificarCadastro(){
    if(!cliente){
        mostrarModalCadastro()
    } else {
        mostrarBoasVindas()
    }
}

function mostrarModalCadastro(){
    document.getElementById("modalCadastro")?.remove()
    document.body.insertAdjacentHTML("beforeend", `
    <div id="modalCadastro" class="modal-cadastro">
      <div class="cadastro-box">
        <div class="cadastro-header">
          <div class="cadastro-logo">Pizza</div>
          <h2>Bem-vindo ao<br><span>Sabore In Casa!</span></h2>
          <p>Cadastre-se e ganhe vantagens exclusivas</p>
        </div>
        <div class="cadastro-beneficios">
          <div class="beneficio-item">Desconto no aniversario</div>
          <div class="beneficio-item">Programa de fidelidade</div>
          <div class="beneficio-item">Cupons exclusivos</div>
          <div class="beneficio-item">Frete gratis progressivo</div>
        </div>
        <div class="cadastro-form">
          <label>Nome completo</label>
          <input class="cadastro-input" id="cadNome" placeholder="Ex: Joao Silva" type="text">
          <label>WhatsApp</label>
          <input class="cadastro-input" id="cadWhats" placeholder="Ex: 31987654321" type="tel" maxlength="11">
          <label>Data de nascimento</label>
          <input class="cadastro-input" id="cadAniv" type="date">
          <div id="cadastroErro" class="cadastro-erro"></div>
          <button class="btn-cadastrar" onclick="concluirCadastro()">Cadastrar e aproveitar!</button>
          <button class="btn-pular" onclick="pularCadastro()">Pular por agora</button>
        </div>
      </div>
    </div>`)
}

function concluirCadastro(){
    const nome  = document.getElementById("cadNome")?.value?.trim()
    const whats = document.getElementById("cadWhats")?.value?.trim()
    const aniv  = document.getElementById("cadAniv")?.value

    if(!nome){
        document.getElementById("cadastroErro").innerText = "Digite seu nome!"
        document.getElementById("cadNome").focus()
        return
    }

    const dados = { nome, whatsapp: whats || "", aniversario: aniv || "", dataCadastro: new Date().toISOString() }
    salvarCliente(dados)

    if(aniv){
        const [ano, mes, dia] = aniv.split("-")
        fidelidade.aniversario = `${mes}-${dia}`
        salvarFidelidade()
    }

    document.getElementById("modalCadastro")?.remove()
    mostrarToastSimples(`Bem-vindo(a) ${nome.split(" ")[0]}!`)

    if(verificarAniversario()){
        setTimeout(()=> mostrarToastSimples("Feliz Aniversario! Use SABOREANIV para 10% off!"), 2500)
    }

    mostrarBoasVindas()
}

function pularCadastro(){
    document.getElementById("modalCadastro")?.remove()
}

function mostrarBoasVindas(){
    if(!cliente) return
    const hora = new Date().getHours()
    let saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite"
    const primeiroNome = cliente.nome.split(" ")[0]
    const el = document.getElementById("boasVindas")
    if(el){
        el.innerHTML = `${saudacao}, <b>${primeiroNome}</b>! Toque para ver seu perfil`
        el.style.display = "block"
    }
    if(verificarAniversario()){
        setTimeout(()=> mostrarToastSimples("Feliz Aniversario! Use SABOREANIV para 10% off!"), 1500)
    }
}

function abrirPerfilCliente(){
    document.getElementById("modalPerfil")?.remove()
    const nivel = calcularNivel()
    const info  = getNivelInfo(nivel)
    const metas = { bronze:200, prata:500, ouro:1000, diamante:null }
    const proxNomes = { bronze:"Prata", prata:"Ouro", ouro:"Diamante", diamante:null }
    const meta = metas[nivel]
    const pct  = meta ? Math.min(100,(fidelidade.totalGasto/meta)*100).toFixed(0) : 100
    const faltaTexto = meta ? `R$${Math.max(0,meta-fidelidade.totalGasto).toFixed(2)} para ${proxNomes[nivel]}` : "Nivel maximo!"
    const nomeExibir  = cliente?.nome || "Cliente"
    const whatsExibir = cliente?.whatsapp || "Nao informado"
    const anivExibir  = cliente?.aniversario ? new Date(cliente.aniversario + "T00:00:00").toLocaleDateString("pt-BR") : "Nao informado"

    document.body.insertAdjacentHTML("beforeend", `
    <div id="modalPerfil" class="modal-fid">
      <div class="fid-box">
        <div class="fid-header" style="background:linear-gradient(135deg,${info.cor}44,#1a1a1a)">
          <span style="font-size:44px;font-weight:900;color:${info.cor}">${info.nome}</span>
          <div><h2 style="color:${info.cor}">${nomeExibir}</h2><p>${info.desc}</p></div>
          <button class="fid-fechar" onclick="document.getElementById('modalPerfil').remove()">X</button>
        </div>
        <div class="fid-stats">
          <div class="fid-stat"><span class="fid-stat-num">R$${fidelidade.totalGasto.toFixed(2)}</span><span class="fid-stat-label">Total gasto</span></div>
          <div class="fid-stat"><span class="fid-stat-num">${fidelidade.totalPedidos}</span><span class="fid-stat-label">Pedidos</span></div>
          <div class="fid-stat"><span class="fid-stat-num">${fidelidade.pizzasContadas}</span><span class="fid-stat-label">Pizzas</span></div>
        </div>
        <div class="fid-progresso-box">
          <p>Faltam <b>${faltaTexto}</b></p>
          <div class="fid-barra-bg"><div class="fid-barra-fill" style="width:${pct}%;background:${info.cor}"></div></div>
          <small>${pct}% concluido</small>
        </div>
        <div class="perfil-dados">
          <h3>Meus Dados</h3>
          <div class="perfil-linha"><span>Nome</span><b>${nomeExibir}</b></div>
          <div class="perfil-linha"><span>WhatsApp</span><b>${whatsExibir}</b></div>
          <div class="perfil-linha"><span>Aniversario</span><b>${anivExibir}</b></div>
          <div class="perfil-linha"><span>Nivel</span><b>${info.nome}</b></div>
        </div>
        <div style="padding:16px 20px">
          <button onclick="editarCadastro()" style="width:100%;background:#ff9800;border:none;color:#fff;padding:14px;border-radius:12px;font-weight:800;font-size:16px;margin-bottom:10px">Editar meus dados</button>
          <button onclick="mostrarPainelFidelidade()" style="width:100%;background:#2a2a2a;border:none;color:#fff;padding:14px;border-radius:12px;font-weight:800;font-size:16px">Ver programa de fidelidade</button>
        </div>
        <button onclick="document.getElementById('modalPerfil').remove()" class="fid-btn-fechar">Fechar</button>
      </div>
    </div>`)
}

function editarCadastro(){
    document.getElementById("modalPerfil")?.remove()
    mostrarModalCadastro()
    setTimeout(()=>{
        if(cliente){
            const nome  = document.getElementById("cadNome")
            const whats = document.getElementById("cadWhats")
            const aniv  = document.getElementById("cadAniv")
            if(nome)  nome.value  = cliente.nome || ""
            if(whats) whats.value = cliente.whatsapp || ""
            if(aniv)  aniv.value  = cliente.aniversario || ""
        }
    }, 150)
}

// ===============================
// FIDELIDADE
// ===============================

let fidelidade = JSON.parse(localStorage.getItem("fidelidade")) || {
    totalGasto: 0, totalPedidos: 0, pedidosComComida: 0,
    pizzasContadas: 0, aniversario: "", nivel: "bronze"
}

function salvarFidelidade(){
    localStorage.setItem("fidelidade", JSON.stringify(fidelidade))
}

function calcularNivel(){
    let g = fidelidade.totalGasto
    if(g >= 1000) return "diamante"
    if(g >= 500)  return "ouro"
    if(g >= 200)  return "prata"
    return "bronze"
}

function getNivelInfo(nivel){
    const n = {
        bronze:   { nome:"Bronze",   cor:"#cd7f32", desc:"Gaste R$200 para virar Prata!" },
        prata:    { nome:"Prata",    cor:"#c0c0c0", desc:"Frete gratis 1x desbloqueado!" },
        ouro:     { nome:"Ouro",     cor:"#ffd700", desc:"10% de desconto desbloqueado!" },
        diamante: { nome:"Diamante", cor:"#7df9ff", desc:"15% off + frete sempre gratis!" }
    }
    return n[nivel] || n.bronze
}

// ===============================
// HORARIO
// ===============================

function verificarHorario(){
    const agora = new Date()
    const dia   = agora.getDay()
    const h     = agora.getHours() + agora.getMinutes()/60
    if(dia === 1) return { aberto: false, msg: "Fechado hoje (segunda-feira) - Pedidos entram na fila para amanha!" }
    if(h >= 18 && h < 24) return { aberto: true, msg: "Aberto agora - Fecha as 00:00" }
    const falta = 18 - h
    const hf = Math.floor(falta)
    const mf = Math.floor((falta % 1) * 60)
    return { aberto: false, msg: `Abrimos as 18h - Faltam ${hf > 0 ? hf+"h " : ""}${mf}min - Seu pedido entrara na fila!` }
}

function mostrarHorario(){
    const el = document.getElementById("statusHorario")
    if(!el) return
    const s = verificarHorario()
    el.innerHTML = s.msg
    el.className = s.aberto ? "horario-aberto" : "horario-fechado"
}

// ===============================
// RELAMPAGO
// ===============================

function verificarRelampago(){
    return new Date().getHours() >= 18 && new Date().getHours() < 19
}

function mostrarBannerRelampago(){
    const el = document.getElementById("bannerRelampago")
    if(!el) return
    if(verificarRelampago()){
        el.style.display = "flex"
        atualizarCountdown()
        setInterval(atualizarCountdown, 1000)
    } else {
        el.style.display = "none"
    }
}

function atualizarCountdown(){
    const el = document.getElementById("countdownRelampago")
    if(!el) return
    const agora = new Date()
    const fim   = new Date(); fim.setHours(19,0,0,0)
    const diff  = fim - agora
    if(diff <= 0){ document.getElementById("bannerRelampago").style.display="none"; return }
    const m = Math.floor(diff/60000)
    const s = Math.floor((diff%60000)/1000)
    el.innerText = `${m}:${String(s).padStart(2,"0")}`
}

// ===============================
// ANIVERSARIO
// ===============================

function verificarAniversario(){
    const anivFid = fidelidade.aniversario
    const anivCli = cliente?.aniversario ? (() => {
        const parts = cliente.aniversario.split("-")
        return parts.length === 3 ? `${parts[1]}-${parts[2]}` : ""
    })() : ""
    const aniv = anivFid || anivCli
    if(!aniv) return false
    const hoje = new Date()
    const [mes, dia] = aniv.split("-")
    return hoje.getMonth()+1 === Number(mes) && hoje.getDate() === Number(dia)
}

// ===============================
// CUPOM
// ===============================

let cupomAplicado = null

const cupons = {
    "SABORE10":  { desconto:10, condicao:()=> fidelidade.totalGasto >= 500,  msg:"10% off - Cliente Ouro!" },
    "SABORE15":  { desconto:15, condicao:()=> fidelidade.totalGasto >= 1000, msg:"15% off - Cliente Diamante!" },
    "SABOREANIV":{ desconto:10, condicao:()=> verificarAniversario(),         msg:"Desconto de aniversario!" },
    "SABORECASA":{ desconto:10, condicao:()=> true,                           msg:"Cupom especial Sabore In Casa!" }
}

function aplicarCupom(){
    const codigo = document.getElementById("campoCupom")?.value?.trim().toUpperCase()
    if(!codigo){ mostrarMsgCupom("Digite um codigo de cupom","erro"); return }
    const cupom = cupons[codigo]
    if(!cupom){ mostrarMsgCupom("Cupom invalido","erro"); return }
    if(!cupom.condicao()){
        if(codigo === "SABORE10") mostrarMsgCupom(`Faltam R$${(500-fidelidade.totalGasto).toFixed(2)} em compras para este cupom`,"erro")
        else if(codigo === "SABOREANIV") mostrarMsgCupom("Valido apenas no seu mes de aniversario","erro")
        else mostrarMsgCupom("Cupom nao disponivel agora","erro")
        return
    }
    cupomAplicado = { codigo, ...cupom }
    mostrarMsgCupom(`OK! ${cupom.msg} (-${cupom.desconto}%)`,"sucesso")
    atualizarCarrinho()
}

function mostrarMsgCupom(msg, tipo){
    const el = document.getElementById("msgCupom")
    if(!el) return
    el.innerText = msg
    el.className = tipo === "sucesso" ? "cupom-sucesso" : "cupom-erro"
}

function removerCupom(){
    cupomAplicado = null
    const el = document.getElementById("campoCupom")
    if(el) el.value = ""
    const msg = document.getElementById("msgCupom")
    if(msg) msg.innerText = ""
    atualizarCarrinho()
}

// ===============================
// PAINEL FIDELIDADE
// ===============================

function mostrarPainelFidelidade(){
    document.getElementById("modalFidelidade")?.remove()
    const nivel = calcularNivel()
    const info  = getNivelInfo(nivel)
    const metas = { bronze:200, prata:500, ouro:1000, diamante:null }
    const proxNomes = { bronze:"Prata", prata:"Ouro", ouro:"Diamante", diamante:null }
    const meta = metas[nivel]
    const pct  = meta ? Math.min(100,(fidelidade.totalGasto/meta)*100).toFixed(0) : 100
    const falta = meta ? Math.max(0,meta-fidelidade.totalGasto).toFixed(2) : 0
    const pizzasPct  = ((fidelidade.pizzasContadas%10)/10*100).toFixed(0)
    const pizzasRest = 10-(fidelidade.pizzasContadas%10)
    const pedRest    = Math.max(0,5-fidelidade.pedidosComComida)

    const progresso = meta
        ? `<div class="fid-progresso-box"><p>Faltam <b>R$${falta}</b> para <b>${proxNomes[nivel]}</b></p><div class="fid-barra-bg"><div class="fid-barra-fill" style="width:${pct}%;background:${info.cor}"></div></div><small>${pct}% concluido</small></div>`
        : `<div class="fid-progresso-box"><p>Voce esta no nivel maximo!</p></div>`

    document.body.insertAdjacentHTML("beforeend", `
    <div id="modalFidelidade" class="modal-fid">
      <div class="fid-box">
        <div class="fid-header" style="background:linear-gradient(135deg,${info.cor}44,#1a1a1a)">
          <span style="font-size:40px;font-weight:900;color:${info.cor}">${info.nome}</span>
          <div><h2 style="color:${info.cor}">Cliente ${info.nome}</h2><p>${info.desc}</p></div>
          <button class="fid-fechar" onclick="document.getElementById('modalFidelidade').remove()">X</button>
        </div>
        <div class="fid-stats">
          <div class="fid-stat"><span class="fid-stat-num">R$${fidelidade.totalGasto.toFixed(2)}</span><span class="fid-stat-label">Total gasto</span></div>
          <div class="fid-stat"><span class="fid-stat-num">${fidelidade.totalPedidos}</span><span class="fid-stat-label">Pedidos</span></div>
          <div class="fid-stat"><span class="fid-stat-num">${fidelidade.pizzasContadas}</span><span class="fid-stat-label">Pizzas</span></div>
        </div>
        ${progresso}
        <div class="fid-missao"><div class="fid-missao-icone">Pizza</div><div class="fid-missao-info"><b>Pizza gratis na 10a!</b><div class="fid-mini-barra-bg"><div class="fid-mini-barra-fill" style="width:${pizzasPct}%"></div></div><small>Faltam ${pizzasRest} pizza(s)</small></div></div>
        <div class="fid-missao"><div class="fid-missao-icone">Frete</div><div class="fid-missao-info"><b>Frete gratis no 5o pedido com comida!</b><div class="fid-mini-barra-bg"><div class="fid-mini-barra-fill" style="width:${Math.min(100,(fidelidade.pedidosComComida/5*100)).toFixed(0)}%"></div></div><small>${pedRest > 0 ? `Faltam ${pedRest} pedido(s) com comida` : "Frete gratis desbloqueado!"}</small></div></div>
        <div class="fid-missao"><div class="fid-missao-icone">Aniv</div><div class="fid-missao-info"><b>Desconto de aniversario - 10% off!</b>${fidelidade.aniversario ? `<small style="color:#2ecc71">Cadastrado: ${fidelidade.aniversario}</small>` : `<button onclick="editarCadastro()" style="margin-top:6px;background:#ff9800;border:none;color:#fff;padding:8px 14px;border-radius:8px;cursor:pointer;font-weight:800;width:100%;font-size:14px">Cadastrar aniversario</button>`}</div></div>
        <div class="fid-missao"><div class="fid-missao-icone">Amigos</div><div class="fid-missao-info"><b>Indique um amigo!</b><small>Compartilhe o app pelo WhatsApp</small><button onclick="indicarAmigo()" style="margin-top:6px;background:#25D366;border:none;color:#fff;padding:8px 14px;border-radius:8px;cursor:pointer;font-weight:800;width:100%;font-size:14px">Compartilhar app</button></div></div>
        <div class="fid-cupons"><h3>Seus Cupons</h3>${gerarListaCupons()}</div>
        <button onclick="document.getElementById('modalFidelidade').remove()" class="fid-btn-fechar">Fechar</button>
      </div>
    </div>`)
}

function gerarListaCupons(){
    let html = ""
    if(fidelidade.totalGasto >= 500) html += `<div class="fid-cupom-item"><b>SABORE10</b> - 10% off <button onclick="usarCupomDireto('SABORE10')">Usar</button></div>`
    else html += `<div class="fid-cupom-item locked">BLOQUEADO - SABORE10 - Falta R$${(500-fidelidade.totalGasto).toFixed(2)}</div>`
    if(fidelidade.totalGasto >= 1000) html += `<div class="fid-cupom-item"><b>SABORE15</b> - 15% off <button onclick="usarCupomDireto('SABORE15')">Usar</button></div>`
    else html += `<div class="fid-cupom-item locked">BLOQUEADO - SABORE15 - Falta R$${(1000-fidelidade.totalGasto).toFixed(2)}</div>`
    if(verificarAniversario()) html += `<div class="fid-cupom-item"><b>SABOREANIV</b> - 10% off aniversario <button onclick="usarCupomDireto('SABOREANIV')">Usar</button></div>`
    return html || `<p style="color:#888;font-size:14px">Continue comprando para desbloquear cupons!</p>`
}

function usarCupomDireto(codigo){
    document.getElementById("modalFidelidade")?.remove()
    const el = document.getElementById("campoCupom")
    if(el) el.value = codigo
    aplicarCupom()
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

function indicarAmigo(){
    const msg = encodeURIComponent("Conhece o Sabore In Casa? Delivery de pizza incrivel em BH! Peca aqui: https://saboreincasa.github.io/app-delivery-sabore-in-casa/")
    window.open(`https://wa.me/?text=${msg}`)
}

function mostrarModalSubiuNivel(info){
    document.getElementById("modalNivel")?.remove()
    document.body.insertAdjacentHTML("beforeend",`
    <div id="modalNivel" style="position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;justify-content:center;align-items:center;z-index:999999;padding:20px;">
      <div style="background:#1f1f1f;border-radius:22px;padding:32px 24px;text-align:center;max-width:340px;width:100%;border:2px solid ${info.cor};box-shadow:0 0 50px ${info.cor}88;animation:pixShow .3s ease">
        <div style="font-size:52px;font-weight:900;color:${info.cor};margin-bottom:12px">${info.nome}</div>
        <h2 style="color:${info.cor};font-size:26px;margin-bottom:8px">Voce subiu de nivel!</h2>
        <p style="font-size:20px;font-weight:800;margin-bottom:6px">Cliente ${info.nome}</p>
        <p style="color:#ccc;font-size:15px;margin-bottom:22px">${info.desc}</p>
        <button onclick="document.getElementById('modalNivel').remove()" style="background:${info.cor};border:none;color:#000;padding:14px;border-radius:12px;font-weight:800;font-size:17px;cursor:pointer;width:100%">Incrivel!</button>
      </div>
    </div>`)
}

function mostrarProgressoFidelidade(totalFinal, temComida){
    const nivelAntes = calcularNivel()
    fidelidade.totalGasto += totalFinal
    fidelidade.totalPedidos++
    if(temComida) fidelidade.pedidosComComida++
    carrinho.forEach(item=>{
        if(item.tipo === "pizza" || item.tipo === "combo") fidelidade.pizzasContadas++
    })
    fidelidade.nivel = calcularNivel()
    salvarFidelidade()
    const nivelDepois = calcularNivel()
    if(nivelAntes !== nivelDepois){ setTimeout(()=> mostrarModalSubiuNivel(getNivelInfo(nivelDepois)), 1500); return }
    if(fidelidade.pizzasContadas > 0 && fidelidade.pizzasContadas % 10 === 0){
        setTimeout(()=> mostrarToastSimples("Parabens! Voce ganhou uma pizza gratis! Avise no proximo pedido."), 2000)
    }
    const metas = { bronze:200, prata:500, ouro:1000, diamante:null }
    const proxNomes = { bronze:"Prata", prata:"Ouro", ouro:"Diamante" }
    const meta = metas[nivelDepois]
    if(meta) mostrarToastSimples(`Faltam R$${Math.max(0,meta-fidelidade.totalGasto).toFixed(2)} para virar ${proxNomes[nivelDepois]}!`)
}

function mostrarBarraFidelidade(){
    const el = document.getElementById("barraFidelidade")
    if(!el) return
    const nivel = calcularNivel()
    const info  = getNivelInfo(nivel)
    const metas = { bronze:200, prata:500, ouro:1000, diamante:null }
    const proxNomes = { bronze:"Prata", prata:"Ouro", ouro:"Diamante", diamante:null }
    const meta = metas[nivel]
    const pct  = meta ? Math.min(100,(fidelidade.totalGasto/meta)*100) : 100
    const faltaTexto = meta ? `R$${Math.max(0,meta-fidelidade.totalGasto).toFixed(2)} para ${proxNomes[nivel]}` : "Nivel maximo!"
    el.innerHTML = `
    <div class="fid-barra-topo" onclick="mostrarPainelFidelidade()">
      <span class="fid-nivel-badge" style="color:${info.cor}">${info.nome}</span>
      <div class="fid-barra-mini-bg"><div class="fid-barra-mini-fill" style="width:${pct}%;background:${info.cor}"></div></div>
      <span class="fid-falta-texto">${faltaTexto}</span>
      <span class="fid-ver-btn">Ver</span>
    </div>`
}

// ===============================
// BUSCA
// ===============================

function iniciarBusca(){
    const input = document.getElementById("busca")
    if(!input) return
    input.addEventListener("input", function(){
        const termo = this.value.toLowerCase().trim()
        document.querySelectorAll(".card").forEach(c=>{
            c.style.display = (!termo || c.innerText.toLowerCase().includes(termo)) ? "" : "none"
        })
    })
}

// ===============================
// INICIO
// ===============================

window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
    mostrarHorario()
    mostrarBannerRelampago()
    iniciarBusca()
    mostrarBarraFidelidade()
    setInterval(mostrarHorario, 60000)
    setTimeout(verificarCadastro, 1000)
}

// ===============================
// COMBOS / PRODUTOS
// ===============================

function esconderCombos(){
    document.getElementById("combosSemana").innerHTML = ""
    document.getElementById("tituloCombos").style.display = "none"
}

function mostrarCombos(){
    document.getElementById("tituloCombos").style.display = "block"
    carregarCombosSemana()
    document.getElementById("produtos").innerHTML = ""
}

function abrirPizzas(){
    esconderCombos()
    let html = "<h2>Escolha sua Pizza</h2>"
    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola",img:"imagens/pizzas/calabresa.png"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry",img:"imagens/pizzas/franco_com_catupiry.png"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesao, catupiry",img:"imagens/pizzas/quatro_queijos.png"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha",img:"imagens/pizzas/portuguesa.png"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericao",img:"imagens/pizzas/marguerita.png"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola",img:"imagens/pizzas/baiana.png"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesao",img:"imagens/pizzas/napolitana.png"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela",img:"imagens/pizzas/milho_com_bacon.png"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry",img:"imagens/pizzas/moda_da_casa.png"}
    ]
    pizzas.forEach(p=>{
        html += `<div class="card pizza-card">
            <img src="${p.img}" onerror="this.src='imagens/pizza-padrao.png'">
            <div class="card-content">
                <h3>${p.nome}</h3><p>${p.desc}</p>
                <button onclick="abrirMontagemPizza('${p.nome}')">Montar Pizza</button>
            </div></div>`
    })
    document.getElementById("produtos").innerHTML = html
}

function abrirMontagemPizza(nome){
    const imgs = {
        "Calabresa":"imagens/pizzas/calabresa.png","Frango com Catupiry":"imagens/pizzas/franco_com_catupiry.png",
        "4 Queijos":"imagens/pizzas/quatro_queijos.png","Portuguesa":"imagens/pizzas/portuguesa.png",
        "Marguerita":"imagens/pizzas/marguerita.png","Baiana":"imagens/pizzas/baiana.png",
        "Napolitana":"imagens/pizzas/napolitana.png","Milho com Bacon":"imagens/pizzas/milho_com_bacon.png",
        "Moda da Casa":"imagens/pizzas/moda_da_casa.png"
    }
    document.getElementById("produtos").innerHTML = `
    <div class="montagem-box">
        <h2>Pizza ${nome}</h2>
        <img class="pizza-preview" src="${imgs[nome]}" onerror="this.src='imagens/pizza-padrao.png'">
        <div class="opcoes-pizza">
            <div class="campo"><label>Tamanho:</label><select id="tamanho">
                <option value="25">Pequena 25cm - R$42,90</option>
                <option value="30">Grande 30cm - R$54,90</option>
                <option value="35">Gigante 35cm - R$69,90</option>
            </select></div>
            <div class="campo"><label>Borda:</label><select id="borda">
                <option value="0">Normal</option>
                <option value="10">Catupiry (+R$10)</option>
                <option value="10">Cheddar (+R$10)</option>
            </select></div>
            <div class="campo"><label>Meio a Meio:</label><select id="meio">
                <option value="">Nao</option>
                <option>Calabresa</option><option>Frango com Catupiry</option><option>4 Queijos</option>
                <option>Portuguesa</option><option>Marguerita</option><option>Baiana</option>
                <option>Napolitana</option><option>Milho com Bacon</option><option>Moda da Casa</option>
            </select></div>
        </div>
        <button class="btn-montar" onclick="adicionarPizza('${nome}')">Adicionar ao Carrinho</button>
        <span class="voltar" onclick="abrirPizzas()">Voltar</span>
    </div>`
}

function adicionarPizza(nome){
    const tam = document.getElementById("tamanho").value
    const bordaEl = document.getElementById("borda")
    const borda = Number(bordaEl.value)
    const bordaTxt = bordaEl.options[bordaEl.selectedIndex].text
    const meio = document.getElementById("meio").value
    let preco = tam==25?42.90:tam==30?54.90:69.90
    preco += borda
    let nomeFinal = `Pizza ${nome} ${tam}cm`
    if(meio) nomeFinal += " / Meio: " + meio
    if(borda) nomeFinal += " / Borda: " + bordaTxt
    addCarrinho(nomeFinal, preco, "pizza")
    abrirPizzas()
}

function filtrar(tipo){
    if(tipo === "combo"){ mostrarCombos(); return }
    esconderCombos()
    fetch("produtos.json").then(r=>r.json()).then(produtos=>{
        let html = ""
        produtos.filter(p=>p.categoria===tipo).forEach(p=>{
            html += `<div class="card">
                <img src="${p.foto}" onerror="this.src='imagens/sem-imagem.png'">
                <div class="card-content">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <div class="card-rodape">
                        <span class="preco">R$ ${Number(p.preco).toFixed(2)}</span>
                        <button onclick="addCarrinho('${p.nome}',${p.preco},'${tipo}')">Adicionar</button>
                    </div>
                </div>
            </div>`
        })
        document.getElementById("produtos").innerHTML = html
    })
}

// ===============================
// CARROSSEL DE COMBOS
// ===============================

let combosLista = []
let comboAtualIndex = 0

function carregarCombosSemana(){
    fetch("produtos.json").then(r=>r.json()).then(produtos=>{
        combosLista = produtos.filter(p=>p.categoria==="combos")
        let html = ""
        combosLista.forEach(c=>{
            html += `<div class="card destaque">
                <img src="${c.foto}" onerror="this.src='imagens/sem-imagem.png'">
                <div class="card-content">
                    <h3>${c.nome}</h3>
                    <p class="combo-desc">${c.descricao.split("+").map(i=>`${i.trim()}`).join(" + ")}</p>
                    <div class="card-rodape">
                        <span class="preco preco-destaque">R$ ${Number(c.preco).toFixed(2)}</span>
                        <button onclick="abrirMontagemCombo('${c.nome}')">Montar Combo</button>
                    </div>
                </div>
            </div>`
        })
        document.getElementById("combosSemana").innerHTML = html
    })
}

function abrirMontagemCombo(nome){
    fetch("produtos.json").then(r=>r.json()).then(produtos=>{
        combosLista = produtos.filter(p=>p.categoria==="combos")
        comboAtualIndex = combosLista.findIndex(c=>c.nome===nome)
        if(comboAtualIndex < 0) comboAtualIndex = 0
        renderizarMontagemCombo()
    })
}

function navegarCombo(direcao){
    comboAtualIndex += direcao
    if(comboAtualIndex < 0) comboAtualIndex = combosLista.length - 1
    if(comboAtualIndex >= combosLista.length) comboAtualIndex = 0
    renderizarMontagemCombo()
}

function renderizarMontagemCombo(){
    fetch("produtos.json").then(r=>r.json()).then(produtos=>{
        const combo = combosLista[comboAtualIndex]
        if(!combo) return
        const desc     = combo.descricao.toLowerCase()
        const semRefri = combo.nome.toLowerCase().includes("amigos")
        const qtdPizzas = desc.includes("familia") ? 2 : 1
        const bebidas = produtos.filter(p=>{
            if(p.categoria!=="bebidas") return false
            if(semRefri) return false
            const nb = p.nome.toLowerCase()
            if(desc.includes("refrigerante")) return nb.includes("2l")||nb.includes("2000")
            if(desc.includes("lata")||desc.includes("350ml")) return nb.includes("350")||nb.includes("lata")
            return false
        })
        const pOpts = `<option value="">Selecione</option><option>Calabresa</option><option>Frango com Catupiry</option><option>4 Queijos</option><option>Portuguesa</option><option>Marguerita</option><option>Baiana</option><option>Napolitana</option><option>Milho com Bacon</option><option>Moda da Casa</option>`
        let rOpts = `<option value="">Selecione</option>`
        bebidas.forEach(b=>{ rOpts += `<option value="${b.nome}">${b.nome}</option>` })
        const dots = combosLista.map((c,i)=>`<span class="combo-dot ${i===comboAtualIndex?"ativo":""}" onclick="comboAtualIndex=${i};renderizarMontagemCombo()"></span>`).join("")
        let html = `
        <div class="montagem-box">
          <div class="combo-carrossel-header">
            <button class="combo-nav-btn" onclick="navegarCombo(-1)">&#8592;</button>
            <div class="combo-carrossel-info">
              <h2>${combo.nome}</h2>
              <div class="combo-dots">${dots}</div>
              <small>${comboAtualIndex+1} de ${combosLista.length} combos</small>
            </div>
            <button class="combo-nav-btn" onclick="navegarCombo(1)">&#8594;</button>
          </div>
          <img class="pizza-preview" src="${combo.foto}" onerror="this.src='imagens/sem-imagem.png'">
          <p class="combo-preco-destaque">R$ ${Number(combo.preco).toFixed(2)}</p>
          <div class="opcoes-pizza">`
        for(let i=1;i<=qtdPizzas;i++) html += `<div class="campo"><label>Pizza ${i}:</label><select id="pizza${i}">${pOpts}</select></div>`
        html += `<div class="campo"><label>Borda:</label><select id="borda"><option value="0">Normal</option><option value="10">Catupiry +R$10</option><option value="10">Cheddar +R$10</option></select></div>`
        if(!semRefri){
            const qtdR = desc.includes("familia")?2:1
            for(let i=1;i<=qtdR;i++) html += `<div class="campo"><label>Refrigerante ${i}:</label><select id="refri${i}">${rOpts}</select></div>`
        }
        html += `</div>
        <div class="campo">
            <label>Bebidas Extras (opcional):</label>
            <div id="extrasBebidas"></div>
            <button onclick="adicionarLinhaBebida()" class="btn-add-bebida">+ Adicionar Bebida</button>
        </div>
        <button class="btn-montar" onclick="adicionarComboFinal('${combo.nome}',${combo.preco},${qtdPizzas},${semRefri})">Adicionar Combo ao Carrinho</button>
        <span class="voltar" onclick="mostrarCombos()">Voltar para combos</span>
        </div>`
        document.getElementById("produtos").innerHTML = html
        setTimeout(()=>document.getElementById("produtos").scrollIntoView({behavior:"smooth"}),100)
    })
}

function adicionarComboFinal(nome,preco,qtdPizzas,semRefri){
    let detalhes = []
    let total = preco
    for(let i=1;i<=qtdPizzas;i++){
        const p=document.getElementById(`pizza${i}`)?.value
        if(p) detalhes.push(`Pizza ${i}: ${p}`)
    }
    const bordaEl=document.getElementById("borda")
    const borda=Number(bordaEl?.value)
    if(borda===10){ detalhes.push(`Borda: ${bordaEl.selectedOptions[0].text}`); total+=10 }
    if(!semRefri){
        const qtdR=nome.toLowerCase().includes("familia")?2:1
        for(let i=1;i<=qtdR;i++){
            const r=document.getElementById(`refri${i}`)?.value
            if(r) detalhes.push(`Refri ${i}: ${r}`)
        }
    }
    document.querySelectorAll("#extrasBebidas > div").forEach(div=>{
        const sel=div.querySelector(".bebidaSelect")
        const id=div.id.split("_")[1]
        const qtd=Number(document.getElementById("qtd_"+id).innerText)
        const nb=sel.value
        const pb=Number(sel.selectedOptions[0]?.dataset.preco||0)
        if(nb){ detalhes.push(`${qtd}x ${nb}`); total+=pb*qtd }
    })
    const descCompleta = detalhes.length > 0 ? ` (${detalhes.join(" | ")})` : ""
    addCarrinho(nome + descCompleta, total, "combo")
    mostrarCombos()
}

// ===============================
// BANNER
// ===============================

let banners = [
    {nome:"Combo Familia",  preco:168.90, foto:"imagens/banners/combo-familia.png"},
    {nome:"Combo Amigos",   preco:169.90, foto:"imagens/banners/combo-amigos.png"},
    {nome:"Combo Casal",    preco:82.90,  foto:"imagens/banners/combo-casal.png"}
]
let bannerIndex = 0, bannerDiv

function iniciarBanner(){
    bannerDiv = document.getElementById("banner")
    if(!bannerDiv) return
    mostrarBanner()
    setInterval(mostrarBanner, 5000)
}

function mostrarBanner(){
    let combo = banners[bannerIndex]
    bannerDiv.style.backgroundImage = `url('${combo.foto}')`
    bannerDiv.onclick = ()=>{ mostrarToast(combo); setTimeout(()=>abrirMontagemCombo(combo.nome),800) }
    bannerIndex = (bannerIndex+1) % banners.length
}

// ===============================
// CARRINHO
// ===============================

function addCarrinho(nome, preco, tipo="outro"){
    let item = carrinho.find(i=>i.nome===nome)
    if(item) item.qtd++
    else carrinho.push({nome, preco:Number(preco), qtd:1, tipo})
    const btn = document.getElementById("botaoCarrinho")
    if(btn){ btn.classList.add("pulsar"); setTimeout(()=>btn.classList.remove("pulsar"),600) }
    atualizarCarrinho()
}

function contarItensFreteGratis(){
    return carrinho.reduce((a,i)=>a+(i.tipo==="pizza"||i.tipo==="combo"?i.qtd:0),0)
}

function temComidaNoCarrinho(){
    return carrinho.some(i=>["pizza","combo","snacks"].includes(i.tipo))
}

function atualizarCarrinho(){
    const lista    = document.getElementById("lista")
    const contador = document.getElementById("contador")
    if(!lista) return
    let subtotal = 0
    lista.innerHTML = ""
    carrinho.forEach((item,index)=>{
        const sub = item.preco * item.qtd
        subtotal += sub
        lista.innerHTML += `
        <div class="item-carr">
            <div class="item-carr-info">
                <b>${item.nome}</b>
                <span class="item-carr-preco">R$ ${sub.toFixed(2).replace(".",",")}</span>
            </div>
            <div class="item-carr-ctrl">
                <button class="btn-qtd" onclick="diminuir(${index})">-</button>
                <span class="item-carr-qtd">${item.qtd}</span>
                <button class="btn-qtd" onclick="aumentar(${index})">+</button>
                <span class="btn-remover-link" onclick="removerItem(${index})">
                    <span class="x-vermelho">X</span>
                    <span class="remover-branco">Remover</span>
                </span>
            </div>
        </div>`
    })
    if(contador) contador.innerText = carrinho.length
    let descRelampago = verificarRelampago() ? subtotal * 0.05 : 0
    let descCupom     = cupomAplicado ? (subtotal-descRelampago)*(cupomAplicado.desconto/100) : 0
    let descDiamante  = (calcularNivel()==="diamante"&&!cupomAplicado) ? subtotal*0.15 : 0
    let totalComDesc  = subtotal - descRelampago - descCupom - descDiamante
    const totalEl = document.getElementById("total")
    if(totalEl) totalEl.innerText = totalComDesc.toFixed(2).replace(".",",")
    const descEl = document.getElementById("descontosAtivos")
    if(descEl){
        let tags = ""
        if(descRelampago > 0) tags += `<span class="desc-tag">Relampago -R$${descRelampago.toFixed(2)}</span>`
        if(descCupom > 0)     tags += `<span class="desc-tag">Cupom -R$${descCupom.toFixed(2)}</span>`
        if(descDiamante > 0)  tags += `<span class="desc-tag">Diamante -R$${descDiamante.toFixed(2)}</span>`
        descEl.innerHTML = tags
    }
    const infoEl = document.getElementById("infoFrete")
    if(infoEl){
        const itens = contarItensFreteGratis()
        const freteGratis = itens>=5||fidelidade.pedidosComComida>=5||calcularNivel()==="diamante"
        if(freteGratis){
            infoEl.innerHTML = `<div class="frete-badge frete-gratis">Parabens! Voce ganhou FRETE GRATIS!</div>`
        } else {
            const falta = 5-itens
            const pct = Math.min(100,(itens/5)*100)
            const pizzasFeitas = Array(itens).fill("[X]").join(" ")
            const pizzasFaltam = Array(Math.max(0,5-itens)).fill("[ ]").join(" ")
            infoEl.innerHTML = `
            <div class="frete-badge frete-progresso">
                <div class="frete-texto">Adicione mais <b>${falta} item(s)</b> com comida para ganhar <b>frete gratis!</b></div>
                <div class="frete-barra-bg"><div class="frete-barra-fill" style="width:${pct}%"></div></div>
                <div class="frete-steps">${pizzasFeitas} ${pizzasFaltam} <span>${itens}/5</span></div>
            </div>`
        }
    }
    const pag = document.getElementById("pagamento")?.value
    const trocoBox = document.getElementById("trocoBox")
    if(trocoBox) trocoBox.style.display = pag==="Dinheiro" ? "block" : "none"
    mostrarBarraFidelidade()
}

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }
function scrollCarrinho(){ document.getElementById("carrinho").scrollIntoView({behavior:"smooth"}) }

function mostrarToast(combo){
    const toast = document.getElementById("toast")
    if(!toast) return
    if(combo.nome.includes("Familia"))     toast.innerText = `${combo.nome} perfeito pra dividir!`
    else if(combo.nome.includes("Casal"))  toast.innerText = `${combo.nome} clima perfeito!`
    else if(combo.nome.includes("Amigos")) toast.innerText = `${combo.nome} partiu resenha!`
    else                                   toast.innerText = `${combo.nome} adicionado!`
    toast.className = "show"
    setTimeout(()=>{ toast.className = "" }, 4000)
}

function mostrarToastSimples(msg){
    const toast = document.getElementById("toast")
    if(!toast) return
    toast.innerText = msg
    toast.className = "show"
    setTimeout(()=>{ toast.className = "" }, 4000)
}

function abrirMapa(){
    window.open("https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378+Belo+Horizonte")
}

// ===============================
// FRETE E TEMPO
// ===============================

const bairrosProximos = ["Mantiqueira","Juliana","Sao Benedito","Sao Tomas","Serra Verde","Jardim Vitoria","Vila Cloris","Jardim Da Gloria","Nova Pampulha","Gavea","Celvia","Minas Caixa","Ceu Azul","Rio Branco","Venda Nova","Parque Sao Pedro","Lagoinha Leblon","Jardim Dos Comerciarios","Santa Branca"]
const bairrosMedios   = ["Justinopolis","Floramar","Heliopolis","Planalto","Itapoa","Santa Monica","Copacabana","Sao Joao Batista","Sao Bernardo","Jardim Atlantico","Santa Amelia","Centro De Vespasiano","Caieiras","Nossa Senhora De Fatima","Morro Alto","Gavea II","Jardim Leblon","Piratininga","Sao Jose","Santa Isabel","Santa Fe","Vereda","Florenca","Pedra Branca","Jardim Colonial","Jardim Verona","Botafogo","Areias","Veneza"]
const bairrosLongos   = ["Centro De Ribeirao Das Neves","Belo Vale","Barcelona","Alterosa","Bom Sossego","Rosaneves","Sevilha","Contagem","Santa Luzia","Pampulha","Castelo","Ouro Preto","Caicara","Padre Eustachio","Dom Bosco","Alipio De Melo","Guarani","Centro De Belo Horizonte","Lagoa Da Pampulha","Vespasiano","Jardim Europa"]

function norm(b){ return b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"") }

function calcularFretePorBairro(b){
    if(!b) return 20
    const bn = norm(b)
    if(bairrosProximos.some(x=>norm(x)===bn)) return 7
    if(bairrosMedios.some(x=>norm(x)===bn))   return 10
    if(bairrosLongos.some(x=>norm(x)===bn))   return 20
    return 20
}

function tempoEstimadoPorBairro(b){
    if(!b) return "40-60 min"
    const bn = norm(b)
    if(bairrosProximos.some(x=>norm(x)===bn)) return "20-30 min"
    if(bairrosMedios.some(x=>norm(x)===bn))   return "30-45 min"
    return "45-60 min"
}

function abrirModalBairros(){
    document.getElementById("modalBairro")?.remove()
    const todos = [...bairrosProximos,...bairrosMedios,...bairrosLongos]
    const lista = todos.map(b=>`<div onclick="selecionarBairro('${b}')" style="padding:14px 12px;border-bottom:1px solid #eee;cursor:pointer;font-size:16px;font-weight:600">- ${b}</div>`).join("")
    document.body.insertAdjacentHTML("beforeend",`
    <div id="modalBairro" style="position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:99999;display:flex;justify-content:center;align-items:center">
      <div style="background:#fff;color:#000;width:92%;max-width:420px;padding:20px;border-radius:18px;max-height:85vh;display:flex;flex-direction:column;">
        <h2 style="margin-bottom:12px;font-size:20px">Selecione seu bairro</h2>
        <div style="overflow:auto;flex:1">${lista}</div>
        <button onclick="fecharModalBairro()" style="margin-top:14px;width:100%;padding:14px;background:#e53935;color:#fff;border:none;border-radius:12px;font-weight:800;font-size:16px">Fechar</button>
      </div>
    </div>`)
}

function fecharModalBairro(){ document.getElementById("modalBairro")?.remove() }

function selecionarBairro(nome){
    document.getElementById("bairroSelecionado").value = nome
    fecharModalBairro()
    const frete = calcularFretePorBairro(nome)
    const tempo = tempoEstimadoPorBairro(nome)
    document.getElementById("freteInfo").innerHTML = `
    <div class="frete-badge frete-info-bairro">
        Frete: <b>R$${frete},00</b>  |  Estimativa: <b>${tempo}</b>
    </div>`
}

// ===============================
// BEBIDAS EXTRAS
// ===============================

function adicionarLinhaBebida(){
    fetch("produtos.json").then(r=>r.json()).then(produtos=>{
        const bebidas=produtos.filter(p=>p.categoria==="bebidas")
        let opts=`<option value="">Selecione</option>`
        bebidas.forEach(b=>{ opts+=`<option value="${b.nome}" data-preco="${b.preco}">${b.nome} - R$${b.preco.toFixed(2)}</option>` })
        const id=Date.now()
        document.getElementById("extrasBebidas").insertAdjacentHTML("beforeend",`
        <div id="bebida_${id}" class="linha-bebida-extra">
            <select class="bebidaSelect">${opts}</select>
            <div class="ctrl-bebida-extra">
                <button class="btn-qtd" onclick="diminuirBebida(${id})">-</button>
                <span id="qtd_${id}" class="qtd-bebida">1</span>
                <button class="btn-qtd" onclick="aumentarBebida(${id})">+</button>
                <span class="btn-remover-link" onclick="removerLinhaBebida(${id})">
                    <span class="x-vermelho">X</span>
                    <span class="remover-branco">Remover</span>
                </span>
            </div>
        </div>`)
    })
}

function aumentarBebida(id){ const e=document.getElementById("qtd_"+id); e.innerText=Number(e.innerText)+1 }
function diminuirBebida(id){ const e=document.getElementById("qtd_"+id); const v=Number(e.innerText); if(v>1) e.innerText=v-1 }
function removerLinhaBebida(id){ document.getElementById("bebida_"+id)?.remove() }

// ===============================
// PIX EMV
// ===============================

function gerarCodigoPix(chave,nome,cidade,valor,txid="PEDIDO"){
    const vf=valor.toFixed(2)
    const lim=(s,n)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9 ]/g,"").substring(0,n).trim()
    const c=(id,v)=>`${id}${String(v.length).padStart(2,"0")}${v}`
    const mai=c("26",c("00","BR.GOV.BCB.PIX")+c("01",chave))
    const ad=c("62",c("05",lim(txid,25).replace(/ /g,"")||"***"))
    let p=c("00","01")+mai+c("52","0000")+c("53","986")+c("54",vf)+c("58","BR")+c("59",lim(nome,25))+c("60",lim(cidade,15))+ad+"6304"
    function crc(s){ let r=0xFFFF; for(let i=0;i<s.length;i++){ r^=s.charCodeAt(i)<<8; for(let j=0;j<8;j++){ r=(r&0x8000)?(r<<1)^0x1021:r<<1; r&=0xFFFF } } return r.toString(16).toUpperCase().padStart(4,"0") }
    return p+crc(p)
}

// ===============================
// ENVIAR PEDIDO
// ===============================

function enviarPedido(){
    const status = verificarHorario()
    if(carrinho.length===0){ mostrarToastSimples("Seu carrinho esta vazio!"); return }
    const nomeCliente = document.getElementById("nomeCliente")?.value?.trim() || cliente?.nome?.trim() || ""
    if(!nomeCliente){
        const el=document.getElementById("nomeCliente")
        if(el){ el.style.border="2px solid red"; el.placeholder="Digite seu nome primeiro"; el.focus() }
        return
    }
    numeroPedido++
    localStorage.setItem("numeroPedido",numeroPedido)
    const nf=numeroPedido.toString().padStart(3,"0")
    const rua    = document.getElementById("rua")?.value||""
    const numero = document.getElementById("numero")?.value||""
    const bairro = document.getElementById("bairroSelecionado")?.value||""
    const compl  = document.getElementById("complemento")?.value||""
    let end=`${rua}, No ${numero} - ${bairro}`
    if(compl) end+=` (${compl})`
    const pagamento = document.getElementById("pagamento")?.value||"Nao informado"
    const troco     = document.getElementById("troco")?.value||""
    let frete=calcularFretePorBairro(bairro)
    const tempo=tempoEstimadoPorBairro(bairro)
    const itens=contarItensFreteGratis()
    const freteGratis=itens>=5||fidelidade.pedidosComComida>=5||calcularNivel()==="diamante"
    if(freteGratis) frete=0
    const sub=carrinho.reduce((a,i)=>a+i.preco*i.qtd,0)
    const dr=verificarRelampago()?sub*0.05:0
    const dc=cupomAplicado?(sub-dr)*(cupomAplicado.desconto/100):0
    const dd=(calcularNivel()==="diamante"&&!cupomAplicado)?sub*0.15:0
    const total=sub-dr-dc-dd+frete
    const nivelInfo=getNivelInfo(calcularNivel())

    let msg=""
    msg+="*SABORE IN CASA*\n"
    msg+=`*Pedido No ${nf}*\n`
    if(!status.aberto) msg+=`*PEDIDO AGENDADO - Entrara na fila as 18h*\n`
    msg+="-------------------------\n\n"
    msg+=`*Cliente:* ${nomeCliente}\n`
    msg+=`*Nivel:* ${nivelInfo.nome}\n\n`
    msg+="*ITENS DO PEDIDO:*\n"
    carrinho.forEach(i=>{ msg+=`  - ${i.qtd}x ${i.nome}\n` })
    msg+="\n-------------------------\n"
    msg+=`Subtotal: R$ ${sub.toFixed(2)}\n`
    if(dr>0) msg+=`Desconto relampago (5%): -R$ ${dr.toFixed(2)}\n`
    if(dc>0) msg+=`Cupom ${cupomAplicado.codigo}: -R$ ${dc.toFixed(2)}\n`
    if(dd>0) msg+=`Desconto Diamante (15%): -R$ ${dd.toFixed(2)}\n`
    msg+=`Frete: ${freteGratis?"GRATIS":"R$ "+frete.toFixed(2)}\n`
    msg+=`\n*TOTAL A PAGAR: R$ ${total.toFixed(2)}*\n`
    msg+=`\nTempo estimado: *${tempo}*\n`
    msg+=`Endereco: ${end}\n`
    msg+=`Pagamento: ${pagamento}\n`

    if(pagamento==="Pix"){
        const cod=gerarCodigoPix("31983391576","Carlos Henrique","Belo Horizonte",total,"SABORECASA"+nf)
        msg+="\n-------------------------\n"
        msg+="*PAGAMENTO VIA PIX*\n\n"
        msg+=`Valor: *R$ ${total.toFixed(2)}*\n`
        msg+=`Recebedor: Carlos Henrique\n\n`
        msg+="*PIX Copia e Cola:*\n"
        msg+=`${cod}\n\n`
        msg+="*Como pagar:*\n"
        msg+="  1. Abra o app do seu banco\n"
        msg+="  2. Va em PIX > Copia e Cola\n"
        msg+="  3. Cole o codigo - o valor ja aparece preenchido!\n"
        msg+="  4. Confirme o pagamento\n\n"
        msg+="*Apos pagar:* Envie o comprovante aqui no WhatsApp\n"
        msg+="*Assim que recebermos, seu pedido entra imediatamente em preparo!*\n"
        msg+="-------------------------\n"
        mostrarProgressoFidelidade(total,temComidaNoCarrinho())
        mostrarModalPix(total,cod,()=>finalizarPedido(msg))
        return
    }

    if(pagamento==="Dinheiro"&&troco) msg+=`Troco para: R$ ${troco}\n`
    msg+="\nObrigado pela preferencia!\n"
    msg+="Acompanhe seu pedido pelo WhatsApp."
    mostrarProgressoFidelidade(total,temComidaNoCarrinho())
    finalizarPedido(msg)
}

function finalizarPedido(msg){
    carrinho=[]; atualizarCarrinho(); cupomAplicado=null
    window.location.href=`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`
}

// ===============================
// MODAL PIX
// ===============================

function mostrarModalPix(valor,codigoPix,callback){
    document.getElementById("modalPix")?.remove()
    document.body.insertAdjacentHTML("beforeend",`
    <div id="modalPix" class="modal-pix">
      <div class="pix-box">
        <div class="pix-topo">
          <h2>Pagamento PIX</h2>
          <div class="pix-valor">R$ ${valor.toFixed(2).replace(".",",")}</div>
          <p>Escaneie o QR Code ou copie o codigo abaixo</p>
        </div>
        <div class="pix-qrcode-area"><div id="qrcode"></div></div>
        <div class="pix-copia-box">
          <label>PIX Copia e Cola</label>
          <textarea id="codigoPixTexto" readonly>${codigoPix}</textarea>
        </div>
        <div class="pix-steps">
          <div class="pix-step"><span>1</span> Abra o app do seu banco</div>
          <div class="pix-step"><span>2</span> Va em PIX > Copia e Cola</div>
          <div class="pix-step"><span>3</span> Cole o codigo - valor preenchido automaticamente!</div>
          <div class="pix-step"><span>4</span> Confirme o pagamento</div>
        </div>
        <div class="pix-botoes">
          <button class="btn-copiar" onclick="copiarCodigoPix()">Copiar Codigo PIX</button>
          <button class="btn-pago" onclick="confirmarPix()">Enviei o Comprovante</button>
        </div>
        <div class="pix-info">
          Recebedor: <b>Carlos Henrique</b><br>
          Envie o comprovante no WhatsApp apos pagar<br>
          <b>Assim que recebermos, seu pedido entra imediatamente em preparo!</b>
        </div>
        <button class="fechar-pix" onclick="fecharModalPix()">Fechar</button>
      </div>
    </div>`)

    if(typeof QRCode!=="undefined"){
        new QRCode(document.getElementById("qrcode"),{text:codigoPix,width:220,height:220,colorDark:"#000",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H})
    } else {
        document.getElementById("qrcode").innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(codigoPix)}" style="width:220px;height:220px;border-radius:8px">`
    }
    window._callbackPix=callback
}

function copiarCodigoPix(){
    const cod=document.getElementById("codigoPixTexto")?.value?.trim()
    if(!cod) return
    if(navigator.clipboard) navigator.clipboard.writeText(cod).then(()=>mostrarToastSimples("Codigo PIX copiado!")).catch(()=>copiarFallback(cod))
    else copiarFallback(cod)
}
function copiarFallback(t){ const el=document.createElement("textarea"); el.value=t; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); mostrarToastSimples("Codigo PIX copiado!") }
function fecharModalPix(){ document.getElementById("modalPix")?.remove() }
function confirmarPix(){ fecharModalPix(); window._callbackPix?.() }

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("pagamento")?.addEventListener("change", atualizarCarrinho)
})
