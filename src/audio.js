let sounds = {};
sounds.countdown = new Audio("assets/tic_tock_countdown.mp3");

export let play = (sound, time) => {
    if (sounds[sound]) {
        sounds[sound].currentTime = time;
        sounds[sound].play();
    }
};

export let stop = sound => {
    let time;
    if (sounds[sound]) {
        sounds[sound].pause();
        time = sounds[sound].currentTime;
    }
    return time || 0;
};