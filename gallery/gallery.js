console.log("GALLERY JS VERSION 2026-06-05");
const SUPABASE_URL =
"https://zzmceyjguctywocofjun.supabase.co";

const SUPABASE_KEY =
"sb_publishable_bgGrGBdrGUAfsQiujIqNmg_-cF56igy";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

/* ==========================
   UPLOAD PHOTO
========================== */

async function uploadPhoto(){

const file =
document.getElementById(
"imageFile"
).files[0];

if(!file){

alert(
"Please select a photo ❤️"
);

return;

}

const title =
document.getElementById(
"photoTitle"
).value.trim();

const event_date =
document.getElementById(
"photoDate"
).value;

const memory_note =
document.getElementById(
"photoNote"
).value.trim();

if(!title){

alert(
"Please enter title ❤️"
);

return;

}

const fileName =

Date.now() +

"-" +

file.name.replaceAll(
" ",
"_"
);

/* Upload To Storage */

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
JSON.stringify(uploadError)
);

return;

}

/* Get Public URL */

const {
data
} = db.storage
.from("gallery")
.getPublicUrl(
fileName
);

const image_url =
data.publicUrl;

/* Save To Database */

const {
error
} = await db
.from("gallery")
.insert([{

title,
image_url,
memory_note,
event_date

}]);

if(error){

console.error(error);

alert(
JSON.stringify(error)
);

return;

}

/* Clear Form */

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

alert(
"Memory saved ❤️"
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

const grid =
document.getElementById(
"galleryGrid"
);

grid.innerHTML = "";

(data || []).forEach(
photo => {

grid.innerHTML += `

<div class="photo-card">

<img
src="${photo.image_url}"
onclick="openViewer('${photo.image_url}')">

<div class="photo-info">

<h3>

${photo.title}

</h3>

<div class="photo-date">

${photo.event_date || ""}

</div>

<div class="photo-note">

${photo.memory_note || ""}

</div>

<button
class="delete-btn"
onclick="deletePhoto('${photo.id}')">

Delete

</button>

</div>

</div>

`;

});

}

/* ==========================
   DELETE
========================== */

async function deletePhoto(id){

if(
!confirm(
"Delete this memory?"
)
)return;

const {
error
} = await db
.from("gallery")
.delete()
.eq(
"id",
id
);

if(error){

console.error(error);

alert(
"Delete failed"
);

return;

}

loadGallery();

}

/* ==========================
   VIEWER
========================== */

function openViewer(url){

document.getElementById(
"viewerImage"
).src = url;

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
   START
========================== */

loadGallery();
