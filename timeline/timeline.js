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

/* LOAD EVENTS */

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

return;

}

events = data || [];

renderEvents();

}

/* SAVE EVENT */

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
note

})
.eq(
"id",
editingId
);

if(error){

console.error(error);

alert(
"Update failed"
);

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
note

}]);

if(error){

console.error(error);

alert(
"Save failed"
);

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

await loadEvents();

}

/* DELETE */

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

/* EDIT */

function editEvent(id){

const ev =
events.find(
e => e.id === id
);

if(!ev)return;

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

editingId = id;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* EXPAND CARD */

function toggleCard(card){

card.classList.toggle(
"active"
);

}

/* RENDER */

function renderEvents(){

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

card.onclick =
function(){

toggleCard(card);

};

container.appendChild(
card
);

});

}

/* START */

loadEvents();
