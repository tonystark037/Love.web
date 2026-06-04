const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"sb_publishable_bgGrGBdrGUAfsQiujIqNmg_-cF56igy";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function saveMessage() {

const title =
document.getElementById("messageTitle").value;

const text =
document.getElementById("messageText").value;

const side =
document.getElementById("messageSide").value;

const { error } =
await db
.from("messages")
.insert([
{
title,
text,
side
}
]);

if(error){

console.error(error);

alert(
JSON.stringify(error)
);

}else{

alert("Saved successfully ❤️");

}

}

function renderMessages(){}

async function loadMessages(){}

loadMessages();

