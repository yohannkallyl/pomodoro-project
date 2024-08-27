const html = document.querySelector("html")

//Elementos
const appCard = document.querySelector(".app__card")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const botoes = document.querySelectorAll(".app__card-button")

const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")

const startPauseBt = document.querySelector("#start-pause span")
const buttonIcon = document.querySelector(".app__card-primary-button-icon")
const tempoNaTela = document.querySelector("#timer")

//Efeitos sonoros ações
const playTime = new Audio("./sons/play.wav")
const pauseTime = new Audio("./sons/pause.mp3")
const timeOut = new Audio("./sons/beep.mp3")

// Timer
let intervaloId = null //por default ele é assim, e significa que o contador não está rolando
let tempoDecorridoEmSegundos = 1500

//Música
const musicaFocoInput = document.querySelector("#alternar-musica")
const musica = new Audio("./sons/playlist-brasil-lofi.mp3")
musica.loop = true


// Funções

function mudarContexto(contexto){
    
    
    html.setAttribute("data-contexto", contexto)
    
    banner.setAttribute("src", `./imagens/${contexto}.png`)

    botoes.forEach(function(contexto){
        contexto.classList.remove("active") //remove a classe "active" de todos os botões para, somente ao clicar neles, ela seja adicionada.
    })

    mostrarTempo()

    
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Não se compare com os outros.<br>
                <strong class="app__title-strong">Faça o seu.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Muito bem :)<br>
                <strong class="app__title-strong">Só aquela pausa para o café ☕</strong>
            `
            break
        case "descanso-longo":
            titulo.innerHTML = `Descansar, né?<br>
                <strong class="app__title-strong">Porque o homem não é de ferro.</strong>`
            break
    
        default:
            break;
    }


}

const contagemRegressiva = () => {
    //Fazendo com que o tempo não seja negativo
    if(tempoDecorridoEmSegundos <= 0){
        timeOut.play()
        alert("Tempo Finalizado")
        zerar()
        buttonIcon.src = "./imagens/play_arrow.png"      
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

function iniciarOuPausar(){
    // Se "intervaloId tiver algum valor". (pausar contador) - já que o valor dele por default é "null"
    if(intervaloId){
        zerar()
        pauseTime.play()
        buttonIcon.src = "./imagens/play_arrow.png"
        return
    }
    
    // Como aqui o contador já está executando, por isso eu mudo o conteúdo do botão para "Pausar"
    intervaloId = setInterval(contagemRegressiva, 1000)
    playTime.play()
    startPauseBt.textContent = "Pausar"
    buttonIcon.src = "./imagens/pause.png"

    
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000) //porque esse objeto só funciona em milissegundos 
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

//  method clears a timer set with the setInterval() method.
function zerar(){
    clearInterval(intervaloId)
    startPauseBt.textContent = "Começar"
    intervaloId = null

}





// Eventos
focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    mudarContexto("foco")
    focoBt.classList.add("active")
    appCard.style.background = "linear-gradient(to top, #bf565f4f, #591c2c3d, #26142333, #797ff227, #f2a97e38)"
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    mudarContexto("descanso-curto")
    curtoBt.classList.add("active")
    appCard.style.background = "linear-gradient(to top, #8c735d46, #f2d8c24b, #c94c54a4)"
    
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    mudarContexto("descanso-longo")
    longoBt.classList.add("active")
    appCard.style.background = "linear-gradient(to top, #bf565f4f, #591c2c3d, #26142333, #797ff227, #f2a97e38)"
})

musicaFocoInput.addEventListener("change", () => { //estamos usando o "change", pois quando nos referimos a eventos em checkbox's, os mais indicado é ele do que o "click"
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

startPauseBt.addEventListener("click", iniciarOuPausar)



mostrarTempo() // escopo global, para quando iniciarmos a página, ela já esteja executada







