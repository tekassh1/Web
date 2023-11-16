'use strict';

window.addEventListener( "pageshow", function ( event ) {
    let historyTraversal = event.persisted ||
        ( typeof window.performance != "undefined" &&
            performance.getEntriesByType("navigation")[0].type === "back_forward");
    if (historyTraversal) {
        window.location.reload();
    }
});

let xButtons = document.getElementsByClassName("xButton");
let xField = document.getElementById("mainForm:xField");
let yField = document.getElementById("mainForm:yField");
let rButtons = document.getElementsByName("mainForm:rButtons");

function getRCheckedValue(){
    for (let i = 0; i < rButtons.length; i++)
        if (rButtons[i].getAttribute("checked") === "checked") return rButtons[i];
}

for (let i = 0; i < xButtons.length; i++) {
    xButtons[i].addEventListener("click", () => selectXValue(xButtons[i]));
}

function selectXValue(selectedButton) {
    clearSelectedX();
    selectedButton.style.backgroundColor = "#aeaeae";
    xField.value = selectedButton.value;
}

function clearSelectedX() {
    for (let i = 0; i < xButtons.length; i++) {
        xButtons[i].style.backgroundColor = "";
    }
    xField.value = "";
}

let mR = document.getElementsByClassName("mR");
let mR2 = document.getElementsByClassName("mR2");
let R2 = document.getElementsByClassName("R2");
let R = document.getElementsByClassName("R");

function setRValues() {
    let rVal = this.value

    mR[0].textContent = -rVal;
    mR[1].textContent = -rVal;
    mR2[0].textContent = (-rVal/2).toFixed(2);
    mR2[1].textContent = (-rVal/2).toFixed(2);
    R[0].textContent = rVal;
    R[1].textContent = rVal;
    R2[0].textContent = (rVal/2).toFixed(2);
    R2[1].textContent = (rVal/2).toFixed(2);
}

function clearSelectedR() {
    mR[0].textContent = "-R";
    mR[1].textContent = "-R";
    mR2[0].textContent = "-R/2";
    mR2[1].textContent = "-R/2";
    R[0].textContent = "R";
    R[1].textContent = "R";
    R2[0].textContent = "R/2";
    R2[1].textContent = "R/2";

    for (let i = 0; i < rButtons.length; i++) {
        rButtons[i].checked = false;
    }
}

for (let i = 0; i < rButtons.length; i++) {
    rButtons[i].addEventListener("click", setRValues);
}

window.onload = function () {
    let rVal = getRCheckedValue();
    if (rVal != null) rVal.click();
}

let resetBtn = document.getElementById("mainForm:resetRequestButton");

function resetValues() {
    yField.value = "";
    clearSelectedR();
}

resetBtn.addEventListener("click", resetValues);

let coordinatePlane = document.getElementById("coordinatePlane");
let clickArea = document.getElementById("clickArea");
let sendRequestButton = document.getElementById("mainForm:checkRequestButton");

function getRChecked() {
    for (let i = 0; i < rButtons.length; i++) {
        console.log(rButtons[i]);
        if (rButtons[i].checked === true) {
            return [true, rButtons[i].value];
        }
    }
    return [false, 0];
}

clickArea.onclick = function (e) {
    let domPoint = new DOMPoint(e.clientX, e.clientY);

    // Coordinates translation for ViewBox sizing support
    let cursorPoint = domPoint.matrixTransform(coordinatePlane.getScreenCTM().inverse());

    let rCheck = getRChecked();
    let rVal;

    if (rCheck[0]) {
        rVal = rCheck[1];
    }
    else {
        xField.value = 0
        yField.value = 0;
        sendRequestButton.click();
        return;
    }

    let scaleCoefficient = 220 / rVal;  // 220 because of 30px padding from the frame

    let areaClickedX = cursorPoint.x;  // Coords in svg area
    let areaClickedY = cursorPoint.y;

    let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2);   // Coords in coordinate system
    let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);

    xField.value = xCoord;
    yField.value = yCoord;
    sendRequestButton.click();
}