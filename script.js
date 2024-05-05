const container = document.getElementById('grid');

let slider = document.getElementById('myRange');
let output = document.getElementById('size-text');
output.textContent = `${slider.value} x ${slider.value}`;
let gridSize = slider.value;
var board = createGrid();
let colorSquare = '';
let rainbowSquare = '';
let shadingSquare = '';
let randomColor = '';


// user's choice of color (HEX value)
let color = document.getElementById('favcolor').value;

// 1. Basic mode (single color)
let basicBtn = document.getElementById('basic');
basicBtn.addEventListener('click', colorBasic);
// 2. Rainbow Mode (random color generated for each square)
let rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', rainbowPen);
// 3. Shading mode
let shadingBtn = document.getElementById('shading');
shadingBtn.addEventListener('click', shadingPen);
// 4. Clear the board
let clearBtn = document.getElementById('clear-board');
clearBtn.addEventListener('click', clearBoard);

function sketchPad() {
    colorBasic()

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
        board = createGrid();
        colorMode(colorSquare,rainbowSquare,shadingSquare);
    }

    // if the user changes color, need to update color
    document.getElementById('favcolor').onchange = function() {
        color = this.value;
    }

    
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
function colorMode(colorSquare, rainbowSquare, shadingSquare) {
    if (colorSquare == 'True') {
        colorBasic();
    } else if (rainbowSquare == 'True') {
        rainbowPen();
    } else if (shadingSquare == 'True') {
        //
    }
}
function colorBasic() {
    colorSquare = 'True';
    rainbowSquare, shadingSquare = 'False';
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

function makeRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function rainbowPen() {
    randomColor = makeRandomColor();
    rainbowSquare = 'True';
    colorSquare,shadingSquare = 'False';
    let squares = document.getElementsByName('square');
    var flag = false;
    
    window.onmouseup = () => {flag = false};
    squares.forEach(square => {
        square.onmouseover = () => {
            if (flag) {
                
                square.style.backgroundColor = randomColor = makeRandomColor();
            }
        }
        square.onmousedown = () => {
            square.style.backgroundColor= randomColor = makeRandomColor();
            flag = true;
        }
})

}

function shadingPen() {
    
}


// clear the board
function clearBoard() {
    let squares = document.getElementsByName('square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    })
}

sketchPad()