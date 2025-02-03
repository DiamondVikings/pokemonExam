const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod
const audio = new Audio('assets/pokemon_vs_trainer.mp3')
function playPauseMusic () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.paused;
    }
}