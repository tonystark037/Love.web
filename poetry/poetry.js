let poems =
JSON.parse(
localStorage.getItem("poetryGarden")
) || [];

let editingIndex = null;

function saveStorage(){

localStorage.setItem(
"poetryGarden",
JSON.stringify(poems)
);

}

function savePoem(){

const category =
document.getElementById(
"poemCategory"
).value;

const title =
document.getElementById(
"poemTitle"
).value.trim();

const content =
document.getElementById(
"poemContent"
).value.trim();

if(!title || !content){

alert("Please write something 🌹");
return;

}

const poem = {

category,
title,
content,

favorite:false,

date:
new Date().toLocaleString()

};

if(editingIndex !== null){

poem.favorite =
poems[editingIndex].favorite;

poems[editingIndex] =
poem;

editingIndex = null;

}else{

poems.push(poem);

}

saveStorage();

document.getElementById(
"poemTitle"
).value="";

document.getElementById(
"poemContent"
).value="";

renderPoems();

}

function deletePoem(index){

if(
!confirm(
"Delete this poem?"
)
) return;

poems.splice(index,1);

saveStorage();

renderPoems();

}

function editPoem(index){

const poem =
poems[index];

document.getElementById(
"poemCategory"
).value =
poem.category;

document.getElementById(
"poemTitle"
).value =
poem.title;

document.getElementById(
"poemContent"
).value =
poem.content;

editingIndex=index;

window.scrollTo({
top:0,
behavior:"smooth"
});

}

function toggleFavorite(index){

poems[index].favorite =
!poems[index].favorite;

saveStorage();

renderPoems();

}

function renderPoems(){

const container =
document.getElementById(
"poemContainer"
);

const search =
document.getElementById(
"searchBox"
).value
.toLowerCase();

container.innerHTML="";

const sorted =
[...poems]
.sort((a,b)=>
(b.favorite===true)-
(a.favorite===true)
);

sorted.forEach((poem)=>{

const realIndex =
poems.indexOf(poem);

const text =
(
poem.title +
poem.content +
poem.category
).toLowerCase();

if(
!text.includes(search)
) return;

container.innerHTML += `

<div class="poem-card">

<div class="poem-category">

${poem.favorite ? "⭐ " : ""}
${poem.category}

</div>

<h2>

${poem.title}

</h2>

<div class="poem-date">

${poem.date}

</div>

<div class="poem-content">

${poem.content}

</div>

<div class="actions">

<button
class="favorite-btn"
onclick="toggleFavorite(${realIndex})">

${poem.favorite ? "⭐ Saved" : "⭐ Favorite"}

</button>

<button
class="edit-btn"
onclick="editPoem(${realIndex})">

Edit

</button>

<button
class="delete-btn"
onclick="deletePoem(${realIndex})">

Delete

</button>

</div>

</div>

`;

});

}

renderPoems();
