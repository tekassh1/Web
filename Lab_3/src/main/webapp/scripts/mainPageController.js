'use strict';

let xButtons = document.getElementsByName("xChoosing");
let yField = document.getElementById("yField");
let rButtons = document.getElementsByName("rChoosing");

function checkX(){
    for (let btn of xButtons) {
        if (btn.checked === true)
            return true;
    }
    wrongInpMsg.textContent = "You should select X value";
    wrongInpMsg.style.visibility = "visible";
    return false;
}

function checkY(){

    if (yField.value == null || yField.value === "") {
        wrongInpMsg.textContent = "You should enter Y value";
        wrongInpMsg.style.visibility = "visible";
        return false;
    }
    yField.value = yField.value.replaceAll(',', '.');
    let val = +(yField.value);

    if (isNaN(val)) {
        wrongInpMsg.textContent = "You may input only numbers in Y field";
        wrongInpMsg.style.visibility = "visible";
        return false;
    }
    else if (val < -3 || val > 3) {
        wrongInpMsg.textContent = "Available range for Y field is {-3; 3}";
        wrongInpMsg.style.visibility = "visible";
        return false;
    }
    return true;
}

function checkRAmount(){
    let c = 0;
    for (let i = 0; i < rButtons.length; i++) {
        if (rButtons[i].checked === true)
            c++;
    }
    return c;
}

function checkR(){
    let amount = checkRAmount();

    if (amount === 0) {
        wrongInpMsg.textContent = "You should select R value";
        wrongInpMsg.style.visibility = "visible";
        return false;
    }
    else if (amount > 1) {
        wrongInpMsg.textContent = "You should select only one R value";
        wrongInpMsg.style.visibility = "visible";
        return false;
    }

    return true;
}

let checkBtn = document.getElementById("checkRequestButton");
let wrongInpMsg = document.getElementById("incorrectInputText");

let resetBtn = document.getElementById("resetRequestButton");

resetBtn.addEventListener("click", function () {
    wrongInpMsg.style.visibility = "hidden";
    yField.value = null;

    for (let i = 0; i < xButtons.length; i++) {
        xButtons[i].checked = false;
    }

    for (let i= 0; i < rButtons.length; i++){
        rButtons[i].checked = false;
    }

    resetRValues();
});

let mR = document.getElementsByClassName("mR");
let mR2 = document.getElementsByClassName("mR2");
let R2 = document.getElementsByClassName("R2");
let R = document.getElementsByClassName("R");

function getRChecked() {
    for (let i= 0; i < rButtons.length; i++){
        if (rButtons[i].checked === true) {
            return rButtons[i].value;
        }
    }
}

function setRValues() {

    if (checkRAmount() === 0) {
        resetRValues();
        return;
    }

    let rVal = getRChecked();

    mR[0].textContent = -rVal;
    mR[1].textContent = -rVal;
    mR2[0].textContent = (-rVal/2).toFixed(2);
    mR2[1].textContent = (-rVal/2).toFixed(2);
    R[0].textContent = rVal;
    R[1].textContent = rVal;
    R2[0].textContent = (rVal/2).toFixed(2);
    R2[1].textContent = (rVal/2).toFixed(2);
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
    rButtons[i].addEventListener("change", setRValues);
}

let coordinatePlane = document.getElementById("coordinatePlane");
let clickArea = document.getElementById("clickArea");

clickArea.onclick = function (e) {
    wrongInpMsg.style.visibility = "hidden"
    let domPoint = new DOMPoint(e.clientX, e.clientY);

    // Coordinates translation for ViewBox sizing support
    let cursorPoint = domPoint.matrixTransform(coordinatePlane.getScreenCTM().inverse());

    let rSelectionRes = checkRAmount();
    if (rSelectionRes > 1) {
        wrongInpMsg.textContent = "You should select only one R value!"
        wrongInpMsg.style.visibility = "visible";
        return;
    }
    else if (rSelectionRes !== 1){
        wrongInpMsg.textContent = "You should select R value!";
        wrongInpMsg.style.visibility = "visible";
        return;
    }

    let rVal = + getRChecked();
    let scaleCoefficient = 220 / rVal;  // 220 because of 30px padding from the frame

    let areaClickedX = cursorPoint.x;  // Coords in svg area
    let areaClickedY = cursorPoint.y;

    let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2);   // Coords in coordinate system
    let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);

    sendRequest(xCoord, yCoord, rVal, 1);
}

checkBtn.onclick = function (e) {
    if (!checkX() || !checkY() || !checkR()) return;
    sendFormRequest();
};

function sendFormRequest(){
    let form = document.getElementById("mainForm");
    let data = new FormData(form);
    sendRequest(data.get("xChoosing"), data.get("yChoosing"), data.get("rChoosing"), 0);
}

async function sendRequest(x, y, r, clicked) {
    let serverControllerUrl = new URL(document.URL + "/controller");
    serverControllerUrl.searchParams.set("x", x);
    serverControllerUrl.searchParams.set("y", y);
    serverControllerUrl.searchParams.set("r", r);
    serverControllerUrl.searchParams.set("clicked", clicked);

    let response = await fetch(serverControllerUrl, {
        method: 'GET'
    });

    if (response.redirected) {
        window.location.href = response.url;
    }
}