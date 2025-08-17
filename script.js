/// Functions

function Ready() {
    DropDownMenuSwitch();
    LoadYML();
    UpdateEvent();
}

let dropDownMenuIsOpen = false;
function DropDownMenuSwitch() {
    const L_ELEMENT = document.getElementById("header-drop-down-menu");
    const L_NONE = "None", L_EMPTY = "";
    L_ELEMENT.style.display = dropDownMenuIsOpen = !dropDownMenuIsOpen ? L_NONE : L_EMPTY;
}

let config;
function LoadYML() {
    let lYamlPath = "config";
    let lYamlText = document.getElementById(lYamlPath).textContent;
    config = jsyaml.load(lYamlText); 
}

// Events
let AEvents = [];
function UpdateEvent() {
    const L_EVENT_TITLE = document.getElementById("event-title");
    const L_EVENT_DATE = document.getElementById("event-date");
    const L_EVENT_IMAGE = document.getElementById("event-img");

    L_EVENT_TITLE.innerHTML = config.events[0].name;
    L_EVENT_DATE.innerHTML = config.events[0].date;
    L_EVENT_IMAGE.src = `Images/${config.events[0].img}`;
}

// Beers
function LoadBeers() {
    let 
}



Ready();