'use strict';

let xButtons = document.getElementsByClassName("xButton");
let xField = document.getElementById("mainForm:xField");

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
}


//
// let checkBtn = document.getElementById("checkRequestButton");
// let wrongInpMsg = document.getElementById("incorrectInputText");
//
// let resetBtn = document.getElementById("resetRequestButton");
//
// let mR = document.getElementsByClassName("mR");
// let mR2 = document.getElementsByClassName("mR2");
// let R2 = document.getElementsByClassName("R2");
// let R = document.getElementsByClassName("R");
//
// function getRChecked() {
//     for (let i= 0; i < rButtons.length; i++){
//         if (rButtons[i].checked === true) {
//             return rButtons[i].value;
//         }
//     }
// }
//
// function setRValues() {
//
//     if (checkRAmount() === 0) {
//         resetRValues();
//         return;
//     }
//
//     let rVal = getRChecked();
//
//     mR[0].textContent = -rVal;
//     mR[1].textContent = -rVal;
//     mR2[0].textContent = (-rVal/2).toFixed(2);
//     mR2[1].textContent = (-rVal/2).toFixed(2);
//     R[0].textContent = rVal;
//     R[1].textContent = rVal;
//     R2[0].textContent = (rVal/2).toFixed(2);
//     R2[1].textContent = (rVal/2).toFixed(2);
// }
//
// function resetRValues() {
//     mR[0].textContent = "-R";
//     mR[1].textContent = "-R";
//     mR2[0].textContent = "-R/2";
//     mR2[1].textContent = "-R/2";
//     R[0].textContent = "R";
//     R[1].textContent = "R";
//     R2[0].textContent = "R/2";
//     R2[1].textContent = "R/2";
// }
//
// for (let i = 0; i < rButtons.length; i++) {
//     rButtons[i].addEventListener("change", setRValues);
// }
//
// let coordinatePlane = document.getElementById("coordinatePlane");
// let clickArea = document.getElementById("clickArea");
//
// clickArea.onclick = function (e) {
//     wrongInpMsg.style.visibility = "hidden"
//     let domPoint = new DOMPoint(e.clientX, e.clientY);
//
//     // Coordinates translation for ViewBox sizing support
//     let cursorPoint = domPoint.matrixTransform(coordinatePlane.getScreenCTM().inverse());
//
//     let rSelectionRes = checkRAmount();
//     if (rSelectionRes > 1) {
//         wrongInpMsg.textContent = "You should select only one R value!"
//         wrongInpMsg.style.visibility = "visible";
//         return;
//     }
//     else if (rSelectionRes !== 1){
//         wrongInpMsg.textContent = "You should select R value!";
//         wrongInpMsg.style.visibility = "visible";
//         return;
//     }
//
//     let rVal = + getRChecked();
//     let scaleCoefficient = 220 / rVal;  // 220 because of 30px padding from the frame
//
//     let areaClickedX = cursorPoint.x;  // Coords in svg area
//     let areaClickedY = cursorPoint.y;
//
//     let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2);   // Coords in coordinate system
//     let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);
//
//     sendRequest(xCoord, yCoord, rVal, 1);
// }
//
// async function sendRequest(x, y, r, clicked) {
//     let serverControllerUrl = new URL(document.URL + "/controller");
//     serverControllerUrl.searchParams.set("x", x);
//     serverControllerUrl.searchParams.set("y", y);
//     serverControllerUrl.searchParams.set("r", r);
//     serverControllerUrl.searchParams.set("clicked", clicked);
//
//     let response = await fetch(serverControllerUrl, {
//         method: 'GET'
//     });
//
//     if (response.redirected) {
//         window.location.href = response.url;
//     }
// }