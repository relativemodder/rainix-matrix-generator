/**
 * @param {number} width 
 * @param {number} height 
 * @returns {Array<Array<number>>}
 */
function create2DArray(width, height) {
    let arr = [];
    let rows = height;
    let columns = width;

    let value = 0;
    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

export { create2DArray }