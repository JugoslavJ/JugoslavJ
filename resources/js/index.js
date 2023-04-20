const delay = ms => new Promise(res => setTimeout(res, ms));

async function hideAllProjectDescriptions(){
    let paragraphs = document.querySelectorAll("#projects p");
    paragraphs.forEach( async paragraph => {
        if( !(paragraph.style.display === "none")){
            paragraph.style.visibility = "hidden";
            paragraph.style.opacity = "0";
            await delay(100);
            paragraph.style.display = "none";
        }
    });
}

async function showOnlyThisParagraph(paragraph){
    if( paragraph.style.display === "block"){
        hideAllProjectDescriptions();
    } else {
        await hideAllProjectDescriptions();
        await delay(100);
        paragraph.style.display = "block";
        await delay(100);
        paragraph.style.visibility = "visible";
        paragraph.style.opacity = "1";
    }
}

function clearSelectedClass(){
    let navLinks = document.querySelectorAll(".links a");
    navLinks.forEach( link => {
        link.classList.remove("selected");
    });
}

function addSelectedClass(link){
    clearSelectedClass();
    link.classList.add("selected");
}

function setSelectedByUrl(){
    let element = '';
    let targetIds = ['about-me', 'projects', 'skills'];
    for(let i = 0; i < targetIds.length; i++){
        if(window.location.href.includes("#" + targetIds[i])){
            element = document.querySelectorAll("." + targetIds[i]);
        }
    }
    if(element.length > 0){
        addSelectedClass(element[0]);
    }
}

function attachEvents() {
    let buttons = document.querySelectorAll("#projects button");
    let paragraphs = document.querySelectorAll("#projects p");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", () => showOnlyThisParagraph(paragraphs[i]));
    }
    let navLinks = document.querySelectorAll(".links a");
    setSelectedByUrl();
    navLinks.forEach( link => {
        link.addEventListener("click", () => addSelectedClass(link));
    });
}

