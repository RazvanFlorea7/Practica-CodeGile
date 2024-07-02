class Node {
    constructor(x, y, isWalkable) {
        this.x = x;
        this.y = y;
        this.isWalkable = isWalkable;
        this.g = 0; 
        this.h = 0; 
        this.f = 0;
        this.parent = null; 
    }
}
function aStar(grid, start, end) {
    const openList = [];
    const closedList = [];
    openList.push(start);

    while (openList.length > 0) {
        let lowestIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowestIndex].f) {
                lowestIndex = i;
            }
        }

        const currentNode = openList[lowestIndex];

        if (currentNode === end) {
            const path = [];
            let current = currentNode;
            while (current) {
                path.push([current.x, current.y]);
                current = current.parent;
            }
            return path.reverse();
        }

        openList.splice(lowestIndex, 1);
        closedList.push(currentNode);

        const neighbors = getNeighbors(grid, currentNode);

        for (let neighbor of neighbors) {
            if (!neighbor.isWalkable || closedList.includes(neighbor)) {
                continue;
            }

            const tentativeG = currentNode.g + 1;

            let newPath = false;
            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
                newPath = true;
            } else if (tentativeG < neighbor.g) {
                newPath = true;
            }

            if (newPath) {
                neighbor.parent = currentNode;
                neighbor.g = tentativeG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    return [];
}

function getNeighbors(grid, node) {
    const neighbors = [];
    const { x, y } = node;
    if (grid[x - 1] && grid[x - 1][y]) neighbors.push(grid[x - 1][y]);
    if (grid[x + 1] && grid[x + 1][y]) neighbors.push(grid[x + 1][y]);
    if (grid[x][y - 1]) neighbors.push(grid[x][y - 1]);
    if (grid[x][y + 1]) neighbors.push(grid[x][y + 1]);
    return neighbors;
}

function heuristic(node, end) {
    return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

const grid = [];
const gridSize = 5;
for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = new Node(i, j, true); 
    }
}

grid[1][1].isWalkable = false;
grid[2][1].isWalkable = false;
grid[3][1].isWalkable = false;

const start = grid[0][0];
const end = grid[4][4];

const path = aStar(grid, start, end);
console.log("Path:" + path);

