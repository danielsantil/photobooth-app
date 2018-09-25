const { ipcRenderer: ipc, shell, remote } = require('electron');
const images = remote.require('./images');

/**
 * Creates a thumbnail element with its events.
 * @param {string} imageBytes 
 * @param {HTMLDivElement} photosElement 
 */
function create(imageBytes, photosElement) {
    let imageId = generateId(new Date());
    let div = document.createElement('div');
    div.classList.add('photo');

    let save = document.createElement('div');
    save.classList.add('photoSave');
    save.addEventListener('click', () => {
        ipc.send('save-image', [imageId, imageBytes]);
    });

    let close = document.createElement('div');
    close.classList.add('photoClose');
    close.addEventListener('click', () => {
        photosElement.removeChild(div);
    });

    let img = document.createElement('img');
    img.classList.add('photoImg');
    img.src = imageBytes;
    img.id = imageId;

    div.appendChild(img);
    div.appendChild(save);
    div.appendChild(close);
    photosElement.appendChild(div);
}

/**
 * Generates the image id based on the passed date object
 * @param {Date} date 
 */
function generateId(date) {
    return `IMG_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` +
        `-${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
}

ipc.on('image-saved', (e, savedImage) => {
    let photoElement = document.getElementById(savedImage).parentElement;
    let save = photoElement.getElementsByClassName('photoSave')[0];

    let saved = document.createElement('div');
    saved.classList.add('photoSaved');
    saved.addEventListener('click', () => {
        let imagePath = images.getImage(savedImage);
        shell.showItemInFolder(imagePath);
    });

    photoElement.replaceChild(saved, save);
});

module.exports = {
    create
}