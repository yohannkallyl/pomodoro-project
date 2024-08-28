const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/playlist-brasil-lofi.mp3");
musica.loop = true;

let intervaloId = null;
let tempoDecorridoEmSegundos = 1500;
let focoDuration = 1500;
let curtoDuration = 300;
let longoDuration = 900;

const modal = document.getElementById("settings-modal");
const openSettingsBtn = document.getElementById("open-settings");
const closeBtn = document.querySelector(".close");
const timerForm = document.getElementById("timer-form");

function mudarContexto(contexto) {
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagens/${contexto}.png`);
    botoes.forEach(function(botao) {
        botao.classList.remove("active");
    });

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Não se compare com os outros.<br>
            <strong class="app__title-strong">Faça o seu.</strong>`;
            tempoDecorridoEmSegundos = focoDuration;
            focoBt.classList.add("active");
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Muito bem :)<br>
            <strong class="app__title-strong">Só aquela pausa para o café ☕</strong>`;
            tempoDecorridoEmSegundos = curtoDuration;
            curtoBt.classList.add("active");
            break;
        case "descanso-longo":
            titulo.innerHTML = `Descansar, né?<br>
            <strong class="app__title-strong">Porque o homem não é de ferro.</strong>`;
            tempoDecorridoEmSegundos = longoDuration;
            longoBt.classList.add("active");
            break;
    }

    mostrarTempo();
}

openSettingsBtn.onclick = function() {
    modal.style.display = "block";
    document.getElementById("foco-time").value = focoDuration / 60;
    document.getElementById("curto-time").value = curtoDuration / 60;
    document.getElementById("longo-time").value = longoDuration / 60;
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

timerForm.onsubmit = function(e) {
    e.preventDefault();
    focoDuration = document.getElementById("foco-time").value * 60;
    curtoDuration = document.getElementById("curto-time").value * 60;
    longoDuration = document.getElementById("longo-time").value * 60;

    const currentContext = html.getAttribute("data-contexto");
    mudarContexto(currentContext);
    modal.style.display = "none";
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        timeOut.play();
        alert("Tempo Finalizado");
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        pauseTime.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    playTime.play();
    startPauseBt.textContent = "Pausar";
    buttonIcon.src = "./imagens/pause.png";
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function zerar(){
    clearInterval(intervaloId);
    startPauseBt.textContent = "Começar";
    buttonIcon.src = "./imagens/play_arrow.png";
    intervaloId = null;
}

focoBt.addEventListener("click", () => mudarContexto("foco"));
curtoBt.addEventListener("click", () => mudarContexto("descanso-curto"));
longoBt.addEventListener("click", () => mudarContexto("descanso-longo"));

musicaFocoInput.addEventListener("change", () => {
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
});

startPauseBt.addEventListener("click", iniciarOuPausar);

mostrarTempo();