const fs = require('fs-extra');
const path = require('path');

const imagesCache = [];

/**
 * Saves the image in the specified path
 * @param {string} path 
 * @param {string} imageId
 * @param {string} base64Bytes
 * @param {Function} done
 */
function save(picturesPath, imageId, base64Bytes, done) {
    let base64Data = base64Bytes.replace(/^data:image\/png;base64,/, '');
    let imageFullPath = path.join(picturesPath, imageId + '.png');
    imagesCache.push({ id: imageId, path: imageFullPath });
    fs.outputFile(imageFullPath, base64Data, { encoding: 'base64' });

    done(imageId);
}

/**
 * Retrieves the path where images will be saved
 * @param {Electron.App} app
 */
function getPath(app) {
    return path.join(app.getPath('pictures'), 'photobooth');
}

/**
 * Retrieves the absolute path of the previously saved image.
 * @param {string} id 
 */
function getImage(id) {
    let img = imagesCache.find(x => x.id == id);
    if (img) return img.path;
}

module.exports = {
    save, getPath, getImage
}