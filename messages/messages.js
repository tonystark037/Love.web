const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"sb_publishable_bgGrGBdrGUAfsQiujIqNmg_-cF56igy";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let messages = [];
let editingId = null;

async function loadMessages(){

const { data, error } =
await db
.from("messages")
.select("*")
.order(
"created_at",
{
ascending:false
}
);

if(error){

console.error(error);

return;
}

messages = data || [];

renderMessages();

}

async function saveMessage(){

const side =
document.getElementById(
"messageSide"
).value;

const title =
document.getElementById(
"messageTitle"
).value.trim();

const text =
document.getElementById(
"messageText"
).value.trim();

if(!title || !text){

alert(
"Please fill all fields ❤️"
);

return;
}

if(editingId){

const { error } =
await db
.from("messages")
.update({
side,
title,
text
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
.from("messages")
.insert([{
side,
title,
text
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
"messageTitle"
).value = "";

document.getElementById(
"messageText"
).value = "";

await loadMessages();

}

async function deleteMessage(id){

if(
!confirm(
"Delete this message?"
)
)return;

const { error } =
await db
.from("messages")
.delete()
.eq(
"id",
id
);

if(error){

console.error(error);

return;
}

await loadMessages();

}

function editMessage(id){

const msg =
messages.find(
m=>m.id===id
);

if(!msg)return;

document.getElementById(
"messageSide"
).value = msg.side;

document.getElementById(
"messageTitle"
).value = msg.title;

document.getElementById(
"messageText"
).value = msg.text;

editingId = id;

window.scrollTo({
top:0,
behavior:"smooth"
});

}

function renderMessages(){

const herContainer =
document.getElementById(
"herMessages"
);

const myContainer =
document.getElementById(
"myMessages"
);

const search =
document.getElementById(
"searchBox"
)
.value
.toLowerCase();

herContainer.innerHTML = "";
myContainer.innerHTML = "";

messages.forEach(msg=>{

const content =
(
(msg.title||"") +
" " +
(msg.text||"")
)
.toLowerCase();

if(
!content.includes(search)
)return;

const card = `

<div class="card">

<div class="card-date">
${new Date(
msg.created_at
).toLocaleString()}
</div>

<h3>
${msg.title}
</h3>

<p>
${msg.text}
</p>

<div class="card-actions">

<button
class="edit-btn"
onclick="editMessage('${msg.id}')">
Edit
</button>

<button
class="delete-btn"
onclick="deleteMessage('${msg.id}')">
Delete
</button>

</div>

</div>

`;

if(msg.side==="her"){

herContainer.innerHTML += card;

}else{

myContainer.innerHTML += card;

}

});

}

loadMessages();
