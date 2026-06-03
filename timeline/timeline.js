const defaultTimeline = [

{
date:"2022-08-02",
title:"❤️ First Proposal",
description:"Proposed Praniti at 12:45 PM"
},

{
date:"2024-01-29",
title:"📱 First Instagram Message",
description:"Messaged her on Instagram at 10:30 PM"
},

{
date:"2025-01-15",
title:"☕ First Date",
description:"Met for the first time for 30 minutes"
},

{
date:"2025-01-17",
title:"🙏 Tuljapur Blessing",
description:"God's blessing for our future"
},

{
date:"2025-10-14",
title:"❤️ Closeness Feeling",
description:"Praniti expressed her closeness feeling"
},

{
date:"2025-11-03",
title:"🌹 Longest Date",
description:"2.5 hour date together"
},

{
date:"2025-11-27",
title:"🎁 Surprise Date",
description:"A beautiful surprise memory"
},

{
date:"2026-01-28",
title:"🫂 First Virtual Hug",
description:"First virtual hug"
},

{
date:"2026-02-14",
title:"😘 First Virtual Kiss",
description:"First virtual kiss"
},

{
date:"2026-03-09",
title:"🫂 First Hug",
description:"First hug together"
},

{
date:"2026-03-21",
title:"❤️ She Said YES",
description:"Accepted the proposal"
},

{
date:"2026-04-02",
title:"😘 First Kiss",
description:"First kiss"
}

];

let timeline =
JSON.parse(
localStorage.getItem("timeline")
);

if(!timeline){

timeline = defaultTimeline;

localStorage.setItem(
"timeline",
JSON.stringify(timeline)
);

}

function saveTimeline(){

localStorage.setItem(
"timeline",
JSON.stringify(timeline)
);

}

function addMemory(){

const date =
document.getElementById("memoryDate").value;

const title =
document.getElementById("memoryTitle").value;

const description =
document.getElementById("memoryDescription").value;

if(
!date ||
!title ||
!description
){
alert("Fill all fields ❤️");
return;
}

timeline.push({
date,
title,
description
});

timeline.sort(
(a,b)=>
new Date(a.date)
-
new Date(b.date)
);

saveTimeline();

document.getElementById("memoryDate").value="";
document.getElementById("memoryTitle").value="";
document.getElementById("memoryDescription").value="";

renderTimeline();

}

function deleteMemory(index){

timeline.splice(index,1);

saveTimeline();

renderTimeline();

}

function renderTimeline(){

const container =
document.getElementById(
"timelineContainer"
);

container.innerHTML="";

timeline.forEach(
(item,index)=>{

container.innerHTML += `

<div class="event">

<div class="event-date">
${item.date}
</div>

<h2>
${item.title}
</h2>

<p>
${item.description}
</p>

<button
class="delete-btn"
onclick="deleteMemory(${index})">

Delete

</button>

</div>

`;

});

}

renderTimeline();
