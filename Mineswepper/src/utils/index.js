import {cellValue, cellState} from "../types";

export const generateCells = () => {
    let cells = [];

    // generating all cells
    for (let row = 0; row < 9; row++) {
        cells.push([]);
        for (let col = 0; col < 9; col++) {
            cells[row].push({
                value: cellValue.none,
                state: cellState.close,
            });
        }
    }

    // random 10 bombs
    let bombs = 0;
    while (bombs < 10) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);
        const currentCell = cells[randomRow][randomCol];
        if (currentCell.value !== cellValue.bomb) {
            currentCell.value = cellValue.bomb;
            bombs++;
        }
    }

    // Calculate the adjacent bomb counts
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const currentCell = cells[row][col];
            if (currentCell.value !== cellValue.bomb) {
                let bombCount = 0;

                // Check the neighboring cells for bombs
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue; // Skip the current cell
                        const newRow = row + i;
                        const newCol = col + j;
                        if (
                            newRow >= 0 &&
                            newRow < 9 &&
                            newCol >= 0 &&
                            newCol < 9 &&
                            cells[newRow][newCol].value === cellValue.bomb
                        ) {
                            bombCount++;
                        }
                    }
                }

                // Assign the bomb count to the current cell
                currentCell.value = bombCount;
            }
        }
    }

    return cells;
};

export const revealAllCells = (cells) => {
    cells.forEach(row =>
        row.forEach(cell => {
            cell.state = 1;
        })
    );
    return cells;
};

// export const openZeros = (cells, rowIndex, colIndex) => {
//     const cell = cells[rowIndex][colIndex];
//
//     if (cell.state !== 0 || cell.value === 9) {
//         return;
//     }
//
//     cell.state = 1;
//
//     for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
//         for (let col = colIndex - 1; col <= colIndex + 1; col++) {
//             if (row >= 0 && row < cells.length && col >= 0 && col < cells[row].length && !(row === rowIndex && col === colIndex)) {
//                 openZeros(cells, row, col);
//             }
//         }
//     }
// };





