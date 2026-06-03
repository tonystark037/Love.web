let capsules =
JSON.parse(
localStorage.getItem("timeCapsules")
) || [];

function saveStorage(){

localStorage.setItem(
"timeCapsules",
JSON.stringify(capsules)
);

}

function saveCapsule(){

const title =
document.getElementById(
"capsuleTitle"
).value.trim();

const date =
document.getElementById(
"capsuleDate"
).value;

const message =
document.getElementById(
"capsuleMessage"
).value.trim();

if(
!title ||
!date ||
!message
){

alert(
"Please complete all fields ❤️"
);

return;
}

capsules.push({

title,
date,
message

});

saveStorage();

document.getElementById(
"capsuleTitle"
).value="";

document.getElementById(
"capsuleDate"
).value="";

document.getElementById(
"capsuleMessage"
).value="";

renderCapsules();

}

function deleteCapsule(index){

if(
!confirm(
"Delete this capsule?"
)
) return;

capsules.splice(index,1);

saveStorage();

renderCapsules();

}

function getCountdown(targetDate){

const now =
new Date();

const target =
new Date(targetDate);

const diff =
target - now;

if(diff <= 0){

return null;
}

const days =
Math.floor(
diff /
(1000*60*60*24)
);

const hours =
Math.floor(
(diff/(1000*60*60))
%24
);

const minutes =
Math.floor(
(diff/(1000*60))
%60
);

const seconds =
Math.floor(
(diff/1000)
%60
);

return `
${days} Days<br>
${hours} Hours<br>
${minutes} Minutes<br>
${seconds} Seconds
`;

}

function renderCapsules(){

const container =
document.getElementById(
"capsuleContainer"
);

container.innerHTML="";

capsules.forEach(
(capsule,index)=>{

const countdown =
getCountdown(
capsule.date
);

const unlocked =
countdown===null;

container.innerHTML += `

<div class="capsule-card">

<h2>
🌙 ${capsule.title}
</h2>

<br>

<div class="${
unlocked
? "unlocked"
: "locked"
}">

${
unlocked
? "🔓 Unlocked"
: "🔒 Locked"
}

</div>

<div class="timer">

${
unlocked
? "Time Reached ❤️"
: countdown
}

</div>

${
unlocked
? `
<div class="message">

${capsule.message}

</div>
`
: ""
}

<button
class="delete-btn"
onclick="deleteCapsule(${index})">

Delete

</button>

</div>

`;

});

}

renderCapsules();

setInterval(
renderCapsules,
1000
);
