const container = document.getElementById('grid');

let slider = document.getElementById('myRange');
let output = document.getElementById('size-text');
output.textContent = `${slider.value} x ${slider.value}`;
let gridSize = slider.value;
var board = createGrid();
let colorSquare = '';
let rainbowSquare = '';
let randomColor = '';


// user's choice of color (HEX value)
let color = document.getElementById('favcolor').value;

// 1. Basic mode (single color)
let basicBtn = document.getElementById('basic');
basicBtn.addEventListener('click', colorBasic);
// 2. Rainbow Mode (random color generated for each square)
let rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', rainbowPen);
// 3. Clear the board
let clearBtn = document.getElementById('clear-board');
clearBtn.addEventListener('click', clearBoard);

function sketchPad() {
    // initial set up with basic mode
    colorBasic()
    // interact with the grid size slider to create a sketch board
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
        colorMode(colorSquare,rainbowSquare);
    }

    // if the user changes color, need to update color
    document.getElementById('favcolor').onchange = function() {
        color = this.value;
    }

    
}

// create a row div
function createRow() {
    const row = document.createElement('div');
    // add classlist for css style
    row.classList.add('row');
    return row;

}

// create individual cell/square
function createSquare() {
    const square = document.createElement('div');
    square.setAttribute('name', 'square');
    // add classlist for css style
    square.classList.add('square');
    return square;
}

// append div row x column to make a grid
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

// select color mode 
function colorMode(colorSquare, rainbowSquare) {
    if (colorSquare == 'True') {
        colorBasic();
    } else if (rainbowSquare == 'True') {
        rainbowPen();
    }
}

// 1. Basic: single color mode
function colorBasic() {
    colorSquare = 'True';
    rainbowSquare = 'False';
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

// random color generator
function makeRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 2. Rainbow color mode
function rainbowPen() {
    rainbowSquare = 'True';
    colorSquare = 'False';
    let squares = document.getElementsByName('square');
    var flag = false;
    
    window.onmouseup = () => {flag = false};
    squares.forEach(square => {
        square.onmouseover = () => {
            if (flag) {
                square.style.backgroundColor =  makeRandomColor();
            }
        }
        square.onmousedown = () => {
            square.style.backgroundColor= makeRandomColor();
            flag = true;
        }
    })
}


function increaseOpacity(elem) {
    setInterval(function() {
        var opacity = elem.style.opacity;
        if (opacity < 1) {
           opacity += 0.1;
           elem.style.opacity = opacity;
        } else {
            clearInterval(interval); // Stop the interval when opacity reaches 0
            el.style.display = 'none';
        }
    },1);

}

// clear the board
function clearBoard() {
    let squares = document.getElementsByName('square');
    squares.forEach(square => {
        square.style.background = 'white';
        square.style.opacity = 1;
    })
}

sketchPad()