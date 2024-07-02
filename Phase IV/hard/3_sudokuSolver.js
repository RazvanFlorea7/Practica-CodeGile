function solveSudoku(board) {
    if (solve(board)) {
        return board;
    } else {
        return "No solution exists";
    }
}

function solve(board) {
    let emptyCell = findEmpty(board);
    if (!emptyCell) {
        return true;
    }

    let [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solve(board)) {
                return true;
            }

            board[row][col] = 0;
        }
    }

    return false;
}

function findEmpty(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }

    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}


let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log(solveSudoku(board));
