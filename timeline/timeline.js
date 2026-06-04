const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"sb_publishable_bgGrGBdrGUAfsQiujIqNmg_-cF56igy";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let events = [];
let editingId = null;

/* ==========================
   LOVE COUNTERS
========================== */

const PROPOSAL_DATE = "2022-07-02";
const YES_DATE = "2026-03-21";
const HUG_DATE = "2026-03-21";
const KISS_DATE = "2026-04-02";

function updateCounter(id, date){

const start = new Date(date);
const now = new Date();

const diff =
Math.floor(
(now - start) /
(1000 * 60 * 60 * 24)
);

const el =
document.getElementById(id);

if(el){
el.innerText = diff + " Days";
}

}

function updateLoveCounters(){

updateCounter(
"proposalCounter",
PROPOSAL_DATE
);

updateCounter(
"yesCounter",
YES_DATE
);

updateCounter(
"hugCounter",
HUG_DATE
);

updateCounter(
"kissCounter",
KISS_DATE
);

}

setInterval(
updateLoveCounters,
1000
);

/* ==========================
   LOAD EVENTS
========================== */

async function loadEvents(){

const { data, error } =
await db
.from("timeline_events")
.select("*")
.order(
"event_date",
{
ascending:true
}
);

if(error){

console.error(error);
alert("Failed to load events");

return;

}

events = data || [];

renderEvents();

}

/* ==========================
   SAVE EVENT
========================== */

async function saveEvent(){

const event_date =
document.getElementById(
"eventDate"
).value;

const title =
document.getElementById(
"eventTitle"
).value.trim();

const short_text =
document.getElementById(
"eventShort"
).value.trim();

const note =
document.getElementById(
"eventNote"
).value.trim();

const hall_of_memory =
document.getElementById(
"hallMemory"
).checked;

if(
!event_date ||
!title ||
!short_text
){

alert(
"Please fill all required fields ❤️"
);

return;

}

if(editingId){

const { error } =
await db
.from("timeline_events")
.update({

event_date,
title,
short_text,
note,
hall_of_memory

})
.eq(
"id",
editingId
);

if(error){

console.error(error);
alert("Update failed");

return;

}

editingId = null;

}else{

const { error } =
await db
.from("timeline_events")
.insert([{

event_date,
title,
short_text,
note,
hall_of_memory

}]);

if(error){

console.error(error);
alert(JSON.stringify(error));
console.error(error);

return;

}

}

document.getElementById(
"eventDate"
).value = "";

document.getElementById(
"eventTitle"
).value = "";

document.getElementById(
"eventShort"
).value = "";

document.getElementById(
"eventNote"
).value = "";

document.getElementById(
"hallMemory"
).checked = false;

await loadEvents();

}

/* ==========================
   DELETE
========================== */

async function deleteEvent(id){

if(
!confirm(
"Delete this event?"
)
)return;

const { error } =
await db
.from("timeline_events")
.delete()
.eq(
"id",
id
);

if(error){

console.error(error);

return;

}

await loadEvents();

}

/* ==========================
   EDIT
========================== */

function editEvent(id){

const ev =
events.find(
e => e.id === id
);

if(!ev) return;

document.getElementById(
"eventDate"
).value =
ev.event_date;

document.getElementById(
"eventTitle"
).value =
ev.title;

document.getElementById(
"eventShort"
).value =
ev.short_text;

document.getElementById(
"eventNote"
).value =
ev.note || "";

document.getElementById(
"hallMemory"
).checked =
ev.hall_of_memory || false;

editingId = id;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* ==========================
   HALL OF MEMORIES
========================== */

function renderHallOfMemories(){

const container =
document.getElementById(
"hallContainer"
);

if(!container) return;

container.innerHTML = "";

events
.filter(
e => e.hall_of_memory === true
)
.forEach(ev => {

container.innerHTML += `

<div class="memory-card">

<h3>${ev.title}</h3>

<p>
${new Date(
ev.event_date
).toLocaleDateString()}
</p>

</div>

`;

});

}

/* ==========================
   TIMELINE
========================== */

function renderEvents(){

renderHallOfMemories();

const container =
document.getElementById(
"timelineContainer"
);

const search =
document.getElementById(
"searchBox"
)
.value
.toLowerCase();

container.innerHTML = "";

events.forEach(ev => {

const content =
(
(ev.title || "") +
" " +
(ev.short_text || "") +
" " +
(ev.note || "")
)
.toLowerCase();

if(
!content.includes(search)
)return;

const card =
document.createElement(
"div"
);

card.className =
"timeline-card";

card.innerHTML = `

<div class="event-date">

${new Date(
ev.event_date
).toLocaleDateString()}

</div>

<div class="event-title">

${ev.title}

</div>

<div class="event-story">

${ev.short_text}

</div>

<div class="details">

<div class="event-note">

${ev.note || "No note added"}

</div>

<div class="card-actions">

<button
class="edit-btn"
onclick="
event.stopPropagation();
editEvent('${ev.id}')
">

Edit

</button>

<button
class="delete-btn"
onclick="
event.stopPropagation();
deleteEvent('${ev.id}')
">

Delete

</button>

</div>

</div>

`;

container.appendChild(
card
);

});

}

/* ==========================
   START
========================== */

updateLoveCounters();
loadEvents();
window.addEventListener("load", () => {

setTimeout(() => {

const loader =
document.getElementById("loader");

if(loader){

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

},1000);

}

},2500);

});
