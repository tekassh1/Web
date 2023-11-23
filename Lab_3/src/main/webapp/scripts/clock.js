'use strict';

function updateClock() {
    let now = new Date();
    let sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth(),
        dy = now.getDate(),
        yr = now.getFullYear();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    let tags = ["mon", "d", "y", "h", "m", "s"],
        corr = [
            months[mo],
            dy,
            yr,
            hou.toString().padStart(2,0),
            min.toString().padStart(2,0),
            sec.toString().padStart(2,0)];

    for (let i = 0; i < tags.length; i++)
        document.getElementById(tags[i]).innerText = corr[i];

    setTimeout(updateClock, 12000);
}

updateClock();