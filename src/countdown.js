/**
 * Starts the counter
 * @param {HTMLDivElement} counterElement 
 * @param {number} count 
 * @param {Function} finished 
 */
function start(counterElement, count, finished) {
    for (let i = 0; i <= count; i++) {
        setTimeout(() => {
            counterElement.innerText = count - i;
            if (i == count) {
                counterElement.innerText = '';
                finished();
            }
        }, i * 1000);
    }
}

module.exports = {
    start
}