let kissCount =
parseInt(localStorage.getItem("kissCount")) || 1;

let hugCount =
parseInt(localStorage.getItem("hugCount")) || 1;

function updateKiss(){

document.getElementById(
"kissCount"
).innerText = kissCount;

document.getElementById(
"kissEmojis"
).innerText =
kissCount <= 20
? "😘".repeat(kissCount)
: `😘 × ${kissCount}`;

document.getElementById(
"kissUpdated"
).innerText =
"Last Updated: " +
(
localStorage.getItem(
"kissUpdated"
) || "Never"
);

}

function updateHug(){

document.getElementById(
"hugCount"
).innerText = hugCount;

document.getElementById(
"hugEmojis"
).innerText =
hugCount <= 20
? "🫂".repeat(hugCount)
: `🫂 × ${hugCount}`;

document.getElementById(
"hugUpdated"
).innerText =
"Last Updated: " +
(
localStorage.getItem(
"hugUpdated"
) || "Never"
);

}

function changeKiss(value){

kissCount += value;

if(kissCount < 0)
kissCount = 0;

localStorage.setItem(
"kissCount",
kissCount
);

localStorage.setItem(
"kissUpdated",
new Date().toLocaleString()
);

updateKiss();

}

function changeHug(value){

hugCount += value;

if(hugCount < 0)
hugCount = 0;

localStorage.setItem(
"hugCount",
hugCount
);

localStorage.setItem(
"hugUpdated",
new Date().toLocaleString()
);

updateHug();

}

function daysSince(date){

const start =
new Date(date);

const today =
new Date();

return Math.floor(
(today-start)/
(1000*60*60*24)
);

}

document.getElementById(
"proposalDays"
).innerText =
daysSince("2022-08-02")
+ " Days";

document.getElementById(
"yesDays"
).innerText =
daysSince("2026-03-21")
+ " Days";

document.getElementById(
"hugDays"
).innerText =
daysSince("2026-03-09")
+ " Days";

document.getElementById(
"kissDays"
).innerText =
daysSince("2026-04-02")
+ " Days";

updateKiss();
updateHug();
