'use strict';

// Expand header animation

let expandButton = document.getElementById("expandButton");
expandButton.addEventListener("click", function () {

        let block = document.getElementById("expanded");
        let arrow = document.getElementById("arrow");

        if (block.style.maxHeight){
            block.style.maxHeight = null;
            arrow.src = "images/arrow-down.svg";
        } else {
            arrow.src = "images/arrow-up.svg";
            block.style.maxHeight = block.scrollHeight + "px";
        }
    }
);

let xField = document.getElementById("xSelect");
let yField = document.getElementById("yField");
// let rBox = document.getElementById("rSelect");

let checkBtn = document.getElementById("checkRequest");
let wrongInpMsg = document.getElementById("incorrectInputText");
checkBtn.addEventListener("click", function () {
    wrongInpMsg.style.visibility = "hidden";

    if (xField.value === "0") {
        wrongInpMsg.textContent = "You should select X value";
        wrongInpMsg.style.visibility = "visible";
        return;
    }

    let val = +yField.value;

    if (yField.value == null || yField.value === "") {
        wrongInpMsg.textContent = "You should enter Y value";
        wrongInpMsg.style.visibility = "visible";
        return;
    }
    else if (isNaN(val)) {
        wrongInpMsg.textContent = "You may input only numbers in Y field";
        wrongInpMsg.style.visibility = "visible";
        return;
    }
    else if (val < -5 || val > 3) {
        wrongInpMsg.textContent = "Available range for Y field is {-5; 3}";
        wrongInpMsg.style.visibility = "visible";
        return;
    }

    let rButtons = document.getElementsByName("rChoosing");
    let f = false;
    for (let i = 0; i < rButtons.length; i++) {
        if (rButtons[i].checked === true) {
            f = true;
            break;
        }
    }
    if (f === false) {
        wrongInpMsg.textContent = "You should select R value";
        wrongInpMsg.style.visibility = "visible";
        return;
    }

    alert("Request to server...");
});

let rButtons = document.getElementsByName("rChoosing");
let resetBtn = document.getElementById("resetRequest");

resetBtn.addEventListener("click", function () {
    wrongInpMsg.style.visibility = "hidden";
    xField.value = "0";
    yField.value = null;

    for (let i= 0; i < rButtons.length; i++){
        rButtons[i].checked = false;
    }

    resetRValues();
});

let mR = document.getElementsByClassName("mR");
let mR2 = document.getElementsByClassName("mR2");
let R2 = document.getElementsByClassName("R2");
let R = document.getElementsByClassName("R");

function getChecked() {
    for (let i= 0; i < rButtons.length; i++){
        if (rButtons[i].checked === true) {
            return rButtons[i].value;
        }
    }
}

function setRValues() {
    let rVal = getChecked();

    mR[0].textContent = -rVal;
    mR[1].textContent = -rVal;
    mR2[0].textContent = (-rVal/2).toFixed(1);
    mR2[1].textContent = (-rVal/2).toFixed(1);
    R[0].textContent = rVal;
    R[1].textContent = rVal;
    R2[0].textContent = (rVal/2).toFixed(1);
    R2[1].textContent = (rVal/2).toFixed(1);
}

function resetRValues() {
    mR[0].textContent = "-R";
    mR[1].textContent = "-R";
    mR2[0].textContent = "-R/2";
    mR2[1].textContent = "-R/2";
    R[0].textContent = "R";
    R[1].textContent = "R";
    R2[0].textContent = "R/2";
    R2[1].textContent = "R/2";
}

for (let i = 0; i < rButtons.length; i++) {
    rButtons[i].addEventListener("click", setRValues);
}