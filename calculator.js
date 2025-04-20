//Document Container
const mainContainer = document.querySelector(".mainContainer");

//Header container
const headerContainer = document.createElement("h1");
    headerContainer.classList.add("headerContainer");
    headerContainer.textContent = "Calculator";

//Calculator Container
const calContainer = document.createElement("div");
    calContainer.classList.add("calContainer");

//Display Container
const display = document.createElement("div");
    display.classList.add("display");

//Grid Container
const calGridContainer = document.createElement("div");
    calGridContainer.classList.add("calGridContainer");

calContainer.appendChild(display);
calContainer.appendChild(calGridContainer);
mainContainer.appendChild(headerContainer);
mainContainer.appendChild(calContainer);

//Calculator buttons
function calcButtons() {
    const calcBtnElements = ["A/C","+/-","%","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","="];
    const buttonGrid = document.querySelector(".calGridContainer");
    
    let gridWidth = 400 / 4;
    let gridHeight = 350 / 5;
    let zeroWidth = gridWidth * 2;

    for (let i = 0; i < calcBtnElements.length; i++ ) {

        //Button creation
        const btn = document.createElement("button");

            if(["A/C","+/-","%"].includes(calcBtnElements[i])){
                btn.classList.add("specOpButton");

            }else if(["/","*","-","=","+"].includes(calcBtnElements[i])) {
                btn.classList.add("operatorButton");

            }else {
                btn.classList.add("button");
            };
            
        btn.textContent = calcBtnElements[i];
        btn.dataset.choice = calcBtnElements[i];

        //Button size     
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

//Basic computing fucntions
function add(value1, value2){
    return value1 + value2
};

function substract(value1, value2){
    return value1 - value2
};

function multiply(value1, value2){
    return value1 * value2
};

function divide(value1, value2){
    return value1 / value2
};


//Main fucntion to make calculations
function operate(value1, operator, value2){
    let result = "";
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);
    
    if (operator === "/" && value2 === 0) {
        return "Apocalype Initiated";
    };    
    if (operator === "+") return add(value1, value2);
    if (operator === "-") return subtract(value1, value2);
    if (operator === "*") return multiply(value1, value2);
    if (operator === "/") return divide(value1, value2);
    return "Error";
}


function displayOutput(){
    const display = document.querySelector(".display");
    const btn = document.querySelectorAll("button");


    let value1 = "";
    let value2 = "";
    let operator = "";
    let result = 0;
    let justCalculated = false;

    function handleEquals(value1, operator, value2, result){
        let newresult = ""

        if(justCalculated == false){
            newresult = operate(value1, operator, value2)
        }else if (justCalculated == true){
            newresult = operate(result, operator, value2)
        }else {
            newresult = 0;
        };
    return newresult
    };


    function clearCalculator(){
        value1 = "";
        value2 = "";
        operator = "";
        result = 0;
    };



    btn.forEach(button => {
        button.addEventListener("click", () => {
            const choice = button.dataset.choice;

            if (choice === "=") {
                if (value1 && operator && value2) {
                    result = operate(value1, operator, value2);
                    if (!isNaN(result)) {
                        result = parseFloat(result).toFixed(2);
                    }
                    display.textContent = result;
                    value1 = result;
                    value2 = "";
                    operator = "";
                    justCalculated = true;
                }
            } else if (choice === "A/C") {
                clearCalculator();
                display.textContent = "";
            } else if (choice === "%") {
                if (operator === "" && value1 !== "") {
                    value1 = (parseFloat(value1) / 100).toString();
                    display.textContent = value1;
                } else if (value2 !== "") {
                    value2 = (parseFloat(value2) / 100).toString();
                    display.textContent = value1 + operator + value2;
                }
            } else if (choice === ".") {
                if (!operator) {
                    if (!value1.includes(".")) {
                        value1 += ".";
                        display.textContent = value1;
                    }
                } else {
                    if (!value2.includes(".")) {
                        value2 += ".";
                        display.textContent = value1 + operator + value2;
                    }
                }
            } else if (["+", "-", "*", "/"].includes(choice)) {
                if (value1 && value2) {
                    result = operate(value1, operator, value2);
                    if (!isNaN(result)) {
                        result = parseFloat(result).toFixed(2);
                    }
                    value1 = result.toString();
                    value2 = "";
                    display.textContent = value1 + choice;
                } else if (value1) {
                    display.textContent = value1 + choice;
                }
                operator = choice;
                justCalculated = false;
            } else {
                // If result was just shown and user presses a digit (not operator), reset
                if (justCalculated && !["+", "-", "*", "/"].includes(choice)) {
                    clearCalculator();
                }

                if (!operator) {
                    value1 += choice;
                } else {
                    value2 += choice;
                }

                display.textContent = value1 + operator + value2;
                justCalculated = false;
            }
        });
    });
}

displayOutput();





