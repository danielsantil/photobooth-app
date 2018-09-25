/**
 * Initializes the element.
 * 
 * @param {Navigator} navigator 
 * @param {HTMLVideoElement} videoElement 
 */
function init(navigator, videoElement) {
    let videoConstraints = {
        audio: false,
        video: {
            width: { exact: 853 },
            height: { exact: 480 }
        }
    }

    navigator.mediaDevices.getUserMedia(videoConstraints)
        .then(stream => {
            videoElement.srcObject = stream;
        })
        .catch(error => {
            console.log('Camera error: ', error);
        });
}
/**
 * Takes a capture and returns the PNG image as Base64.
 * @param {HTMLVideoElement} videoElement 
 * @param {CanvasRenderingContext2D} context 
 * @param {HTMLCanvasElement} canvasElement 
 */
function toPNGCapture(videoElement, context, canvasElement) {
    context.drawImage(videoElement, 0, 0);
    return capture(canvasElement);
}

/**
 * Takes a capture from the canvas
 * @param {HTMLCanvasElement} canvasElement 
 */
function capture(canvasElement) {
    return canvasElement.toDataURL('image/png');
}

module.exports = {
    init,
    toPNGCapture,
    capture
}