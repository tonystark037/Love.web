const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"sb_publishable_bgGrGBdrGUAfsQiujIqNmg_-cF56igy";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let allMemories = [];
let storyIndex = 0;
let storyInterval = null;

const folderQuotes = {

General:
"Every memory has a heartbeat ❤️",

Traveling:
"Every road became beautiful because you were there ❤️",

Eyes:
"I found my home inside your eyes ❤️",

"Saree Special":
"Every saree made my heartbeat forget its rhythm ❤️",

Dates:
"Hours passed, but I never wanted them to end ❤️",

Selfies:
"A thousand selfies, one beautiful soul ❤️",

"Favorite Smiles":
"Your smile is my favorite destination ❤️",

"Krishna Moments":
"Blessed by Krishna, guided by love ❤️",

"Future Dreams":
"Our future is my favorite dream ❤️"

};

async function uploadPhoto(){

const file =
document.getElementById(
"imageFile"
).files[0];

if(!file){

alert("Select a photo ❤️");
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
} =
await db.storage
.from("gallery")
.upload(
fileName,
file
);

if(uploadError){

alert(
uploadError.message
);

return;

}

const {
data:urlData
} =
db.storage
.from("gallery")
.getPublicUrl(
fileName
);

const image_url =
urlData.publicUrl;

const {
error
} =
await db
.from("gallery")
.insert([{

title:
title || "❤️ Memory",

image_url,

memory_note:
memory_note || null,

event_date,

folder,

favorite

}]);

if(error){

alert(
JSON.stringify(error)
);

return;

}

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
} =
await db
.from("gallery")
.select("*")
.order(
"created_at",
{
ascending:false
}
);

if(error){

console.error(
error
);

return;

}

allMemories =
data || [];

renderStats();

renderFeaturedMemory();

renderTodayMemory();

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

if(!stats)return;

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
   FEATURED MEMORY
========================== */

function renderFeaturedMemory(){

const section =
document.getElementById(
"featuredMemory"
);

if(!section)return;

const favorites =
allMemories.filter(
m => m.favorite
);

if(
!favorites.length
){

section.innerHTML = "";

return;

}

const memory =
favorites[
Math.floor(
Math.random()
*
favorites.length
)
];

section.innerHTML = `

<div class="featured-card">

<img
src="${memory.image_url}">

<div class="featured-info">

<div class="featured-label">

⭐ Featured Memory

</div>

<h2 class="featured-title">

${memory.title || "❤️ Memory"}

</h2>

<p class="featured-note">

${memory.memory_note || ""}

</p>

</div>

</div>

`;

}

/* ==========================
   ON THIS DAY
========================== */

function renderTodayMemory(){

const section =
document.getElementById(
"todayMemory"
);

if(!section)return;

const today =
new Date();

const day =
today.getDate();

const month =
today.getMonth()+1;

const matches =
allMemories.filter(
memory => {

if(
!memory.event_date
)
return false;

const d =
new Date(
memory.event_date
);

return (
d.getDate() === day &&
d.getMonth()+1 === month
);

}
);

if(
!matches.length
){

section.innerHTML = "";

return;

}

const memory =
matches[0];

section.innerHTML = `

<div class="today-card">

<h2>

🌹 On This Day

</h2>

<h3>

${memory.title || "❤️ Memory"}

</h3>

<p>

${memory.memory_note || ""}

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

if(!section)return;

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
'${escapeText(memory.title || "")}',
'${escapeText(memory.event_date || "")}',
'${escapeText(memory.memory_note || "")}'
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
   ESCAPE TEXT
========================== */

function escapeText(text){

return String(text)
.replaceAll(
"'",
"&#39;"
)
.replaceAll(
'"',
"&quot;"
);

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

const viewer =
document.getElementById(
"viewer"
);

if(!viewer)return;

document.getElementById(
"viewerImage"
).src =
img;

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

viewer.classList.add(
"active"
);

}

function closeViewer(){

const viewer =
document.getElementById(
"viewer"
);

if(viewer){

viewer.classList.remove(
"active"
);

}

}

/* ==========================
   SURPRISE MEMORY
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
   STORY MODE
========================== */

function startStory(){

if(
!allMemories.length
){

alert(
"No memories yet ❤️"
);

return;

}

storyIndex = 0;

showStorySlide();

clearInterval(
storyInterval
);

storyInterval =
setInterval(
nextStory,
5000
);

}

function showStorySlide(){

if(
!allMemories.length
)return;

const memory =
allMemories[
storyIndex
];

openViewer(

memory.image_url,

memory.title,

memory.event_date,

memory.memory_note

);

}

function nextStory(){

storyIndex++;

if(
storyIndex >=
allMemories.length
){

storyIndex = 0;

}

showStorySlide();

}

function closeStory(){

clearInterval(
storyInterval
);

closeViewer();

}

/* ==========================
   MUSIC PLAYER
========================== */

function initMusic(){

const upload =
document.getElementById(
"musicUpload"
);

const player =
document.getElementById(
"loveMusic"
);

if(
!upload ||
!player
)return;

const savedMusic =
localStorage.getItem(
"loveMusic"
);

if(savedMusic){

player.src =
savedMusic;

}

upload.addEventListener(
"change",
function(){

const file =
this.files[0];

if(!file)return;

const url =
URL.createObjectURL(
file
);

player.src =
url;

player.play();

localStorage.setItem(
"loveMusic",
url
);

}
);

}

/* ==========================
   FOLDER IMPORT
========================== */

async function uploadFolder(){

const files =
document.getElementById(
"folderUpload"
)?.files;

if(
!files ||
!files.length
){

alert(
"Select a folder ❤️"
);

return;

}

let uploaded = 0;

for(
const file of files
){

if(
!file.type.startsWith(
"image/"
)
)
continue;

const folderName =

file.webkitRelativePath
.split("/")[0] ||
"General";

const fileName =

Date.now()
+
"-"
+
Math.random()
.toString(36)
.substring(2)
+
"-"
+
file.name.replaceAll(
" ",
"_"
);

const upload =
await db.storage
.from("gallery")
.upload(
fileName,
file
);

if(upload.error){

console.error(
upload.error
);

continue;

}

const {
data:urlData
} =
db.storage
.from("gallery")
.getPublicUrl(
fileName
);

await db
.from("gallery")
.insert([{

title:
file.name,

image_url:
urlData.publicUrl,

folder:
folderName,

favorite:false,

memory_note:null,

event_date:null

}]);

uploaded++;

}

alert(

uploaded +
" memories imported ❤️"

);

loadGallery();

}

/* ==========================
   KEYBOARD SUPPORT
========================== */

document.addEventListener(
"keydown",
function(e){

if(
e.key === "Escape"
){

closeViewer();

}

}
);

/* ==========================
   SAFE STARTUP
========================== */

window.addEventListener(
"load",
function(){

loadGallery();

initMusic();

}
);
