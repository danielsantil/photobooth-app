let timer;

/**
 * Shows flash element
 * @param {HTMLDivElement} flashElement 
 */
function show(flashElement) {
    if (flashElement.classList.contains('is-flashing'))
        flashElement.classList.remove('is-flashing');

    flashElement.classList.add('is-flashing');
    clearTimeout(timer);
    timer = setTimeout(() => {
        flashElement.classList.remove('is-flashing');
    }, 2000);
}

module.exports = {
    show
}