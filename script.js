const search = document.getElementById("search");
const category = document.getElementById("category");
const cards = [...document.querySelectorAll(".topic-card")];
const searchable = [...document.querySelectorAll(".lesson,.topic-card,.qa-item")];

function go(id){
  const el=document.getElementById(id);
  if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
  document.getElementById("sidebar").classList.remove("active");
}

function filter(){
  const q=search.value.toLowerCase().trim();
  const cat=category.value;
  cards.forEach(card=>{
    const text=(card.innerText+" "+(card.dataset.text||"")).toLowerCase();
    const okText=!q||text.includes(q);
    const okCat=cat==="all"||card.dataset.category===cat||(cat==="qa"&&card.dataset.category==="qa");
    card.style.display=okText&&okCat?"":"none";
  });
  document.querySelectorAll(".lesson").forEach(el=>{
    if(!q) { el.style.display=""; return; }
    const text=(el.innerText+" "+(el.dataset.text||"")).toLowerCase();
    el.style.display=text.includes(q)?"":"none";
  });
  document.querySelectorAll(".qa-item").forEach(el=>{
    if(!q) { el.style.display=""; return; }
    el.style.display=el.innerText.toLowerCase().includes(q)?"":"none";
  });
}
search.addEventListener("input",filter);
category.addEventListener("change",filter);
document.getElementById("searchBtn").addEventListener("click",filter);

document.getElementById("darkBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("studyDark",document.body.classList.contains("dark")?"1":"0");
});
if(localStorage.getItem("studyDark")==="1") document.body.classList.add("dark");

document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.add("active"));
document.getElementById("closeSide").addEventListener("click",()=>document.getElementById("sidebar").classList.remove("active"));

function copyCode(btn){
  const code=btn.parentElement.parentElement.querySelector("code").innerText;
  navigator.clipboard.writeText(code).then(()=>{
    const old=btn.innerText; btn.innerText="Copied!";
    setTimeout(()=>btn.innerText=old,1200);
  });
}

const qa=[
["What is CSS positioning?","CSS positioning controls how an element is positioned on a webpage. The main position values covered here are static, relative, fixed, absolute and sticky."],
["What is static positioning?","Static is the default positioning. The element stays in the normal flow of the document."],
["What is relative positioning?","Relative positioning moves an element relative to its normal position using top, right, bottom or left. Its original space remains."],
["What is fixed positioning?","A fixed element is positioned relative to the viewport and stays in the same place while the page is scrolled."],
["What is absolute positioning?","An absolute element is removed from normal flow and is positioned relative to the nearest positioned ancestor; if there is none, the body is used."],
["What is Flexbox?","Flexbox stands for Flexible Box Layout. A parent with display:flex or display:inline-flex becomes a flex container, and its direct children become flex items."],
["What is the float property?","Float positions an element to the left or right of its container and allows surrounding content to wrap around it."],
["What is a fluid layout?","A fluid or liquid layout uses relative units such as %, vw, vh, em and rem so the layout can adapt to different screen sizes."],
["What is Responsive Web Design?","Responsive Web Design adjusts layout, images and text according to device, screen size, orientation and resolution. Its goals include readability, usability, avoiding unnecessary horizontal scrolling and providing a consistent user experience."],
["What is the viewport meta tag?","It helps control the page width and initial scale on devices. width=device-width makes page width equal to device width, while initial-scale=1.0 sets the initial zoom to 1."],
["What are media queries?","Media queries apply CSS rules based on conditions such as screen width, height or orientation. They help create layouts for different screen sizes."],
["What CSS properties are used for lists?","The covered list properties are list-style-type, list-style-position and list-style-image."],
["What are important CSS table properties?","The covered properties are border-collapse, border-spacing, text-align, padding and nth-child()."],
["What are the four common link states?","a:link, a:visited, a:hover and a:active. The order can be remembered as LVHA."],
["What are CSS text effects?","The covered text properties include text-transform, text-decoration, letter-spacing, word-spacing and text-shadow."],
["What is a CSS transition?","A transition creates a smooth change between different states of an element. Its syntax includes property, duration, timing-function and delay."],
["What are CSS transforms?","Transforms modify an element using operations such as translate, rotate, scale and skew."]
];

const qaList=document.getElementById("qaList");
qa.forEach((item,i)=>{
  const box=document.createElement("div");
  box.className="qa-item";
  box.dataset.category="qa";
  box.innerHTML=`<button class="qa-question"><span>${i+1}. ${item[0]}</span><span>＋</span></button><div class="qa-answer"><b>Answer:</b> ${item[1]}</div>`;
  box.querySelector(".qa-question").addEventListener("click",()=>{
    box.classList.toggle("open");
    box.querySelector(".qa-question span:last-child").textContent=box.classList.contains("open")?"−":"＋";
  });
  qaList.appendChild(box);
});