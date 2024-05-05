const container = document.getElementById('grid');

let slider = document.getElementById('myRange');
let output = document.getElementById('size-text');
output.textContent = `${slider.value} x ${slider.value}`;
let gridSize = slider.value;
var board = createGrid();

slider.oninput = function() {
    output.textContent = `${this.value} x ${this.value}`;
  }

slider.onchange = function() {
    gridSize = this.value;

    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
    console.log(this.value);
    board = createGrid();
    colorSquare();
    
}


function createRow() {
    const row = document.createElement('div');
    // add classlist for css style
    row.classList.add('row');
    return row;

}

function createSquare() {
    const square = document.createElement('div');
    square.setAttribute('name', 'square');
    // add classlist for css style
    square.classList.add('square');
    return square;
}


function createGrid() {
    for (i = 0; i < gridSize; i++) {
        const row = createRow();
        container.appendChild(row);
        for (j = 0; j < gridSize; j++) {
            const square = createSquare();
            row.appendChild(square); 
        }
    } 
}

function colorSquare() {

    let squares = document.getElementsByName('square');
    var flag = false;
    window.onmouseup = () => {flag = false};
    squares.forEach(square => {
        square.onmouseover = () => {
            if (flag) {
                square.style.backgroundColor = color;
            }
        }
        square.onmousedown = () => {
            square.style.backgroundColor= color; 
            flag = true;
        }
})

}
colorSquare()

// UI

// user's choice of color (HEX value)
let color = document.getElementById('favcolor').value;

// if the user changes color, need to update color

document.getElementById('favcolor').onchange = function() {
    color = this.value;
  }
// button to clear 
// rainbow 
// shadow/opacity thingy 





function clearBoard() {
    container.style.backgroundColor = 'white';
}

function sketchBoard() {
    // 1. not resized

    // 2. resized
}