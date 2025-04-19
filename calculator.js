//Document Container
const mainContainer = document.querySelector(".mainContainer");

//Calculator Container
const calContainer = document.createElement("div");
    calContainer.classList.add("calContainer");

//Display Container
const display = document.createElement("div");
    display.classList.add("display");
    display.textContent = "Display"

//Grid Container
const calGridContainer = document.createElement("div");
    calGridContainer.classList.add("calGridContainer");

calContainer.appendChild(display);
calContainer.appendChild(calGridContainer);
mainContainer.appendChild(calContainer);

//Calculator buttons
function calcButtons() {
    const calcBtnElements = ["A/C","+/-","%","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","="];
    const buttonGrid = document.querySelector(".calGridContainer");
    
    let gridWidth = 400 / 4;
    let gridHeight = 350 / 5;
    let zeroWidth = gridWidth * 2;

    for (let i = 0; i < calcBtnElements.length; i++ ) {
        const btn = document.createElement("button");
            btn.classList.add("button");
            btn.textContent = calcBtnElements[i];

        if (calcBtnElements[i] == "0") {
            btn.style.width = `${zeroWidth}px`;
            btn.style.height = `${gridHeight}px`;
        }else {
            btn.style.width = `${gridWidth}px`;
            btn.style.height = `${gridHeight}px`;
        };
        buttonGrid.appendChild(btn);
    };
};  

//Function call to create buttons
calcButtons();
