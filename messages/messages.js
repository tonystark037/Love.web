let messages =
JSON.parse(
localStorage.getItem("vaultMessages")
) || [];

let editingIndex = null;

function saveStorage(){

localStorage.setItem(
"vaultMessages",
JSON.stringify(messages)
);

}

function saveMessage(){

const side =
document.getElementById("messageSide").value;

const title =
document.getElementById("messageTitle").value.trim();

const text =
document.getElementById("messageText").value.trim();

if(!title || !text){

alert("Please fill all fields ❤️");

return;

}

const message = {

side,

title,

text,

date:
new Date().toLocaleString()

};

if(editingIndex !== null){

messages[editingIndex] =
message;

editingIndex = null;

}else{

messages.push(message);

}

saveStorage();

document.getElementById(
"messageTitle"
).value="";

document.getElementById(
"messageText"
).value="";

renderMessages();

}

function deleteMessage(index){

if(
!confirm(
"Delete this message?"
)
) return;

messages.splice(index,1);

saveStorage();

renderMessages();

}

function editMessage(index){

const msg =
messages[index];

document.getElementById(
"messageSide"
).value = msg.side;

document.getElementById(
"messageTitle"
).value = msg.title;

document.getElementById(
"messageText"
).value = msg.text;

editingIndex = index;

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
).value.toLowerCase();

herContainer.innerHTML="";
myContainer.innerHTML="";

messages.forEach(
(msg,index)=>{

const content =
(msg.title + " " + msg.text)
.toLowerCase();

if(
!content.includes(search)
) return;

const card = `

<div class="card">

<div class="card-date">
${msg.date}
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
onclick="editMessage(${index})">

Edit

</button>

<button
class="delete-btn"
onclick="deleteMessage(${index})">

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

renderMessages();
