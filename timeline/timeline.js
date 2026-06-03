// ===========================
// TIMELINE V5 ROYAL EDITION
// ===========================

let editingIndex = -1;

let events =
JSON.parse(
localStorage.getItem("royalTimelineEvents")
) || [

{
icon:"❤️",
title:"First Proposal",
date:"2022-08-02",
time:"12:45",
note:"The day everything started.",
favorite:true
},

{
icon:"💬",
title:"First Instagram Message",
date:"2024-01-29",
time:"22:30",
note:"A simple message became a beautiful journey.",
favorite:false
},

{
icon:"☕",
title:"First Date",
date:"2025-01-15",
time:"",
note:"Met for the first time for 30 minutes.",
favorite:true
},

{
icon:"🙏",
title:"Tuljapur Blessing",
date:"2025-01-17",
time:"",
note:"God's blessing for our future.",
favorite:false
},

{
icon:"❤️",
title:"Closeness Feeling",
date:"2025-10-14",
time:"",
note:"She expressed her closeness feeling.",
favorite:false
},

{
icon:"☕",
title:"Longest Date",
date:"2025-11-03",
time:"",
note:"Our longest date together.",
favorite:false
},

{
icon:"🎁",
title:"Surprise Date",
date:"2025-11-27",
time:"",
note:"An unexpected beautiful day.",
favorite:false
},

{
icon:"🫂",
title:"First Virtual Hug",
date:"2026-01-28",
time:"",
note:"A virtual hug filled with emotions.",
favorite:false
},

{
icon:"😘",
title:"First Virtual Kiss",
date:"2026-02-14",
time:"",
note:"Valentine's Day memory.",
favorite:false
},

{
icon:"🫂",
title:"First Hug",
date:"2026-03-09",
time:"",
note:"One of the happiest moments.",
favorite:true
},

{
icon:"💍",
title:"She Said Yes",
date:"2026-03-21",
time:"",
note:"A dream became reality.",
favorite:true
},

{
icon:"😘",
title:"First Kiss",
date:"2026-04-02",
time:"",
note:"A memory forever.",
favorite:true
}

];

// ===========================

function saveStorage(){

localStorage.setItem(
"royalTimelineEvents",
JSON.stringify(events)
);

}

// ===========================

function daysAgo(date){

const eventDate =
new Date(date);

const today =
new Date();

const diff =
today - eventDate;

return Math.floor(
diff /
(1000 * 60 * 60 * 24)
);

}

// ===========================

function updateStats(){

document.getElementById(
"totalEvents"
).innerText =
events.length;

const proposalDate =
new Date("2022-08-02");

const today =
new Date();

const diff =
Math.floor(
(today - proposalDate)
/
(1000*60*60*24)
);

document.getElementById(
"daysTogether"
).innerText =
diff;

const favCount =
events.filter(
e => e.favorite
).length;

document.getElementById(
"favoriteCount"
).innerText =
favCount;

}

// ===========================

function renderHall(){

const hall =
document.getElementById(
"hallContainer"
);

hall.innerHTML = "";

events
.filter(
e => e.favorite
)
.forEach(event => {

hall.innerHTML += `

<div class="hall-card">

${event.icon}
${event.title}

</div>

`;

});

}

// ===========================

function toggleDetails(index){

const details =
document.getElementById(
`details-${index}`
);

if(details.style.display === "block"){

details.style.display = "none";

}else{

details.style.display = "block";

}

}

// ===========================

function renderTimeline(){

const container =
document.getElementById(
"timelineContainer"
);

const search =
document.getElementById(
"searchInput"
).value.toLowerCase();

container.innerHTML = "";

events.sort(
(a,b)=>
new Date(a.date)
-
new Date(b.date)
);

const filtered =
events.filter(event =>

event.title
.toLowerCase()
.includes(search)

||

event.note
.toLowerCase()
.includes(search)

);

filtered.forEach(
(event,index)=>{

container.innerHTML += `

<div class="timeline-event">

<div class="connector"></div>

<div class="node"></div>

<div
class="event-card"
onclick="toggleDetails(${index})">

<h3>

${event.icon}
${event.title}

</h3>

<small>

📅 ${event.date}

</small>

<div
class="event-details"
id="details-${index}">

<br>

${event.time
?
`<p>⏰ ${event.time}</p>`
:
""
}

<br>

<p>

${event.note}

</p>

<br>

<strong>

⏳ ${daysAgo(event.date)}
 days ago

</strong>

<div class="actions">

<button
class="edit-btn"
onclick="event.stopPropagation();editEvent(${events.indexOf(event)})">

Edit

</button>

<button
class="delete-btn"
onclick="event.stopPropagation();deleteEvent(${events.indexOf(event)})">

Delete

</button>

</div>

</div>

</div>

</div>

`;

});

updateStats();
renderHall();

}

// ===========================

function saveEvent(){

const icon =
document.getElementById(
"eventIcon"
).value.trim();

const title =
document.getElementById(
"eventTitle"
).value.trim();

const date =
document.getElementById(
"eventDate"
).value;

const time =
document.getElementById(
"eventTime"
).value;

const note =
document.getElementById(
"eventNote"
).value.trim();

const favorite =
document.getElementById(
"eventFavorite"
).checked;

if(
!icon ||
!title ||
!date
){

alert(
"Please fill all required fields ❤️"
);

return;

}

const newEvent = {

icon,
title,
date,
time,
note,
favorite

};

if(editingIndex === -1){

events.push(
newEvent
);

}else{

events[editingIndex] =
newEvent;

editingIndex = -1;

}

saveStorage();

clearForm();

renderTimeline();

}

// ===========================

function editEvent(index){

const event =
events[index];

document.getElementById(
"eventIcon"
).value =
event.icon;

document.getElementById(
"eventTitle"
).value =
event.title;

document.getElementById(
"eventDate"
).value =
event.date;

document.getElementById(
"eventTime"
).value =
event.time;

document.getElementById(
"eventNote"
).value =
event.note;

document.getElementById(
"eventFavorite"
).checked =
event.favorite;

editingIndex =
index;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

// ===========================

function deleteEvent(index){

if(
!confirm(
"Delete this memory?"
)
){

return;

}

events.splice(
index,
1
);

saveStorage();

renderTimeline();

}

// ===========================

function clearForm(){

document.getElementById(
"eventIcon"
).value = "";

document.getElementById(
"eventTitle"
).value = "";

document.getElementById(
"eventDate"
).value = "";

document.getElementById(
"eventTime"
).value = "";

document.getElementById(
"eventNote"
).value = "";

document.getElementById(
"eventFavorite"
).checked = false;

}

// ===========================

renderTimeline();
