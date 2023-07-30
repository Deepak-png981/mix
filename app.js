let audio1 = new Howl({
    src: ['input1.wav'],
    html5: true
});

let audio2 = new Howl({
    src: ['input2.wav'],
    html5: true
});

function playAudio(audio) {
    audio.play();
}

function pauseAudio(audio) {
    audio.pause();
}

function applyLowPass(audio) {
    let lowPass = Howler.ctx.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.value = 1000;
    audio.filters = [lowPass];
}

function applyHighPass(audio) {
    let highPass = Howler.ctx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.value = 2000;
    audio.filters = [highPass];
}

function applyReverb(audio) {
    let convolver = Howler.ctx.createConvolver();
    fetch('impulse-response.wav').then(response => response.arrayBuffer()).then(buffer => Howler.ctx.decodeAudioData(buffer)).then(decodedData => {
        convolver.buffer = decodedData;
        audio.filters = [convolver];
    });
}

function applyEcho(audio) {
    let delay = Howler.ctx.createDelay();
    delay.delayTime.value = 0.5;
    let feedback = Howler.ctx.createGain();
    feedback.gain.value = 0.5;
    delay.connect(feedback).connect(delay);
    audio.filters = [delay];
}

function applyCompression(audio) {
    let compressor = Howler.ctx.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    audio.filters = [compressor];
}

function applyDelay(audio) {
    let delay = Howler.ctx.createDelay();
    delay.delayTime.value = 2.0;
    audio.filters = [delay];
}

function increaseVolume(audio) {
    let volume = audio.volume();
    if (volume < 1.0) audio.volume(volume + 0.1);
}

function decreaseVolume(audio) {
    let volume = audio.volume();
    if (volume > 0.0) audio.volume(volume - 0.1);
}

