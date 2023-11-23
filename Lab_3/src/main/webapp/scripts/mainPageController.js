'use strict';

window.addEventListener( "pageshow", function ( event ) {
    let historyTraversal = event.persisted ||
        ( typeof window.performance != "undefined" &&
            performance.getEntriesByType("navigation")[0].type === "back_forward");
    if (historyTraversal) {
        window.location.reload();
    }
});

window.onload = function () {
    let rVal = getRCheckedValue();
    if (rVal != null) rVal.click();
    showR();
}

let rMarkups = document.getElementsByClassName("markup");

function showR() {
    for (let markup of rMarkups)
        markup.style.visibility = "visible";
}

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

    scaleCoords(this.value);
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

let resetBtn = document.getElementById("mainForm:resetRequestButton");

function resetValues() {
    clearSelectedX();
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

    let areaClickedX = cursorPoint.x;   // Coords in svg area
    let areaClickedY = cursorPoint.y;

    let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2); // Coords in coordinate system
    let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);

    xField.value = xCoord;
    yField.value = yCoord;

    sendRequestButton.click();
}

let planeDots = document.getElementById("planeDots");

function scaleCoords(rChecked){
    let points = document.getElementsByTagName("circle");

    for (let point of points) {
        let xCoord = + point.getAttribute("data-original-x");
        let yCoord = + point.getAttribute("data-original-y");
        let r = + point.getAttribute("data-radius");

        let scale = r / rChecked;
        let newXCoord = xCoord;
        let newYCoord = yCoord;

        if (xCoord > 250)
            newXCoord = (xCoord - 250) * scale + 250;
        else if (xCoord < 250)
            newXCoord = 250 - (250 - xCoord) * scale;

        if (yCoord > 250)
            newYCoord = (yCoord - 250) * scale + 250;
        else if (yCoord < 250)
            newYCoord = 250 - (250 - yCoord) * scale;

        point.setAttribute("cx", newXCoord.toString());
        point.setAttribute("cy", newYCoord.toString());
        checkHits();
        planeDots.style.visibility = "visible";
    }
}

function checkHits() {
    let points = document.getElementsByTagName("circle");
    for (let point of points) {
        if (checkHit(point))
            point.setAttribute("fill", "#0077ed")
        else
            point.setAttribute("fill", "red")
    }
}

function checkHit(point) {
    let x = + point.getAttribute("cx");
    let y = + point.getAttribute("cy");
    return checkRectangle(x, y) || checkTriangle(x, y) || checkCircle(x, y);
}

function checkRectangle(x, y) {
    return y >= 30 && y <= 250 && x >= 140 && x<= 250;
}

function checkTriangle(x, y) {
    return y <= 250 && y >= (2*x - 470) && x>= 250;
}

function checkCircle(x, y) {
    let svgRadius = 110;
    return y>= 0 && x <= 250 &&
        (Math.pow(Math.abs(250 - x), 2) + Math.pow(y - 250, 2) <= Math.pow(svgRadius, 2));
}