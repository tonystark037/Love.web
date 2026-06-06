const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"YOUR_SUPABASE_KEY";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let allMemories = [];

/* ==========================
   ROMANTIC QUOTES
========================== */

const folderQuotes = {

Choti Pari:
"Every memory has a heartbeat ❤️",

Outdoor:
"Every road became beautiful because you were there ❤️",

Eyes:
"I found my home inside your eyes ❤️",

"Saree Special":
"Every saree made my heartbeat forget its rhythm ❤️",

Dates:
"Hours passed, but I never wanted them to end ❤️",

Uff, yeh NAJAR:

"AI":
"Your smile is my favorite destination ❤️",

"FAV":
"DIVINE BEAUTY ❤️",

"MY HOTTY":

};

/* ==========================
   UPLOAD
========================== */

async function uploadPhoto(){

const file =
document.getElementById(
"imageFile"
).files[0];

if(!file){

alert(
"Select a photo ❤️"
);

return;

}

const title =
document.getElementById(
"photoTitle"
).value.trim();

const folder =
document.getElementById(
"photoFolder"
).value;

const event_date =
document.getElementById(
"photoDate"
).value || null;

const memory_note =
document.getElementById(
"photoNote"
).value.trim();

const favorite =
document.getElementById(
"favoriteMemory"
).checked;

const fileName =

Date.now() +
"-" +
file.name.replaceAll(
" ",
"_"
);

const {
error: uploadError
} = await db.storage
.from("gallery")
.upload(
fileName,
file
);

if(uploadError){

console.error(
uploadError
);

alert(
uploadError.message
);

return;

}

const {
data:urlData
} = db.storage
.from("gallery")
.getPublicUrl(
fileName
);

const image_url =
urlData.publicUrl;

const { error } =
await db
.from("gallery")
.insert([{

title:
title || null,

image_url,

memory_note:
memory_note || null,

event_date,

folder,

favorite

}]);

if(error){

console.error(error);

alert(
JSON.stringify(error)
);

return;

}

document.getElementById(
"imageFile"
).value = "";

document.getElementById(
"photoTitle"
).value = "";

document.getElementById(
"photoDate"
).value = "";

document.getElementById(
"photoNote"
).value = "";

document.getElementById(
"favoriteMemory"
).checked = false;

alert(
"Memory Saved ❤️"
);

loadGallery();

}

/* ==========================
   LOAD GALLERY
========================== */

async function loadGallery(){

const {
data,
error
} = await db
.from("gallery")
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

allMemories =
data || [];

renderStats();

renderFolders();

}

/* ==========================
   STATS
========================== */

function renderStats(){

const stats =
document.getElementById(
"memoryStats"
);

const total =
allMemories.length;

const folders =
new Set(
allMemories.map(
m => m.folder
)
).size;

const favorites =
allMemories.filter(
m => m.favorite
).length;

stats.innerHTML = `

<div class="stat-card">

<h3>${total}</h3>

<p>
❤️ Total Memories
</p>

</div>

<div class="stat-card">

<h3>${folders}</h3>

<p>
📂 Folders
</p>

</div>

<div class="stat-card">

<h3>${favorites}</h3>

<p>
⭐ Favorites
</p>

</div>

`;

}

/* ==========================
   FOLDERS
========================== */

function renderFolders(){

const section =
document.getElementById(
"folderSection"
);

section.innerHTML = "";

const folders = {};

allMemories.forEach(
memory => {

const folder =
memory.folder ||
"General";

if(
!folders[folder]
){

folders[folder] = [];

}

folders[folder]
.push(memory);

}
);

Object.keys(
folders
).forEach(folder => {

const block =
document.createElement(
"div"
);

block.className =
"folder-block";

let photosHTML =
'<div class="gallery-grid">';

folders[folder]
.forEach(memory => {

photosHTML += `

<div class="photo-card">

<img
src="${memory.image_url}"
onclick="openViewer(
'${memory.image_url}',
'${memory.title || ""}',
'${memory.event_date || ""}',
'${memory.memory_note || ""}'
)">

<div class="photo-info">

<div class="photo-title">

${memory.title || "❤️ Memory"}

</div>

<div class="photo-date">

${memory.event_date || ""}

</div>

<div class="photo-note">

${memory.memory_note || ""}

</div>

${
memory.favorite
?
'<div class="favorite-tag">⭐ Favorite</div>'
:
''
}

</div>

</div>

`;

});

photosHTML += "</div>";

block.innerHTML = `

<div class="folder-header">

<div class="folder-title">

📂 ${folder}

</div>

<div class="folder-quote">

${folderQuotes[folder]
||
folderQuotes.General}

</div>

</div>

${photosHTML}

`;

section.appendChild(
block
);

});

}

/* ==========================
   VIEWER
========================== */

function openViewer(
img,
title,
date,
note
){

document.getElementById(
"viewerImage"
).src = img;

document.getElementById(
"viewerTitle"
).innerText =
title || "❤️ Memory";

document.getElementById(
"viewerDate"
).innerText =
date || "";

document.getElementById(
"viewerNote"
).innerText =
note || "";

document.getElementById(
"viewer"
).classList.add(
"active"
);

}

function closeViewer(){

document.getElementById(
"viewer"
).classList.remove(
"active"
);

}

/* ==========================
   SURPRISE ME
========================== */

function showRandomMemory(){

if(
!allMemories.length
){

alert(
"No memories yet ❤️"
);

return;

}

const random =

allMemories[
Math.floor(
Math.random()
*
allMemories.length
)
];

openViewer(

random.image_url,

random.title,

random.event_date,

random.memory_note

);

}

/* ==========================
   START
========================== */

loadGallery();
