const video = require('./video');
const countdown = require('./countdown');
const thumbnail = require('./thumbnail');
const flash = require('./flash');
const effects = require('./effects');
const COUNTDOWN = 3;
const ipcRenderer = require('electron').ipcRenderer;

let seriously = new Seriously();
let videoSrc;
let canvasTarget;

window.addEventListener('DOMContentLoaded', _ => {
    const videoElement = document.getElementById('video');
    const canvasElement = document.getElementById('canvas');
    const recordElement = document.getElementById('record');
    const photosElement = document.querySelector('.photosContainer');
    const counterElement = document.getElementById('counter');
    const flashElement = document.getElementById('flash');

    videoSrc = seriously.source('#video');
    canvasTarget = seriously.target('#canvas');
    effects.choose(seriously, videoSrc, canvasTarget, 'default');

    video.init(navigator, videoElement);
    recordElement.onclick = _ => {
        recordElement.disabled = true;
        countdown.start(counterElement, COUNTDOWN, () => {
            flash.show(flashElement);
            const bytes = video.capture(canvasElement);
            thumbnail.create(bytes, photosElement);
            recordElement.disabled = false;
        });
    }
});

ipcRenderer.on('effect-chosen', (e, effectName) => {
    effects.choose(seriously, videoSrc, canvasTarget, effectName);
});
