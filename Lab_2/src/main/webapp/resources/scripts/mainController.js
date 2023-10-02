'use strict';

console.log(localStorage);
// Expand header animation

let expandButton = document.getElementById("expandButton");
expandButton.addEventListener("click", function () {

        let block = document.getElementById("expanded");
        let arrow = document.getElementById("arrow");

        if (block.style.maxHeight){
            block.style.maxHeight = null;
            arrow.src = "resources/images/arrow-down.svg";
        } else {
            arrow.src = "resources/images/arrow-up.svg";
            block.style.maxHeight = block.scrollHeight + "px";
        }
    }
);

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
    else if (val < -5 || val > 3) {
        wrongInpMsg.textContent = "Available range for Y field is {-5; 3}";
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

function getChecked() {
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

    let rVal = getChecked();

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

checkBtn.addEventListener("click", () => {
    if (!checkX() || !checkY() || !checkR()) return;
    checkValues();
});

let tableBody = document.getElementById("mainTableBody");
let tableContent = [];

function insertInTable(json) {
    tableBody.insertAdjacentHTML("afterbegin",
        "<tr>" +
        "<td>" + json.x + "</td>" +
        "<td>" + json.y + "</td>" +
        "<td>" + json.r + "</td>" +
        "<td>" + json.result + "</td>" +
        "<td>" + json.requestTime + "</td>" +
        "<td>" + json.executing + " ms</td>" +
        "</tr>");
}

async function checkValues(){
    let form = document.getElementById("mainForm");
    let data = new FormData(form);

    let requestTime = new Date().toLocaleString();
    let response = await fetch("checker.php", {
        method: 'POST',
        body: data
    });
    let res = await response.json();
    res["requestTime"] = requestTime;

    // Clearing input fields
    resetBtn.click();

    // Saving last requests in array for caching for 15 min
    res["expiry"] = new Date().getTime() + 900000;
    tableContent.push(res);

    if (res.result === "YES") {
        alert("Point in area!");
    }
    else {
        alert("Point out of area");
    }

    insertInTable(res);
}

function loadTableCache() {
    let cache = JSON.parse(localStorage.getItem("requests"));
    if (cache == null || cache.length === 0) return;
    let now = new Date().getTime();

    for (let elem of cache) {
        if (now < elem["expiry"]) {
            insertInTable(elem);
            tableContent.push(elem);
        }
    }
}

loadTableCache();

function cacheTable(){
    localStorage.setItem("requests", JSON.stringify(tableContent));
}

window.onbeforeunload = function () {
    cacheTable();
}