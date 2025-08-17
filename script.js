/// Functions

function Ready() {
    DropDownMenuSwitch();
    LoadYML();
    UpdateEvent();
    UpdateBeers();
}

let dropDownMenuIsOpen = false;
function DropDownMenuSwitch() {
    const L_ELEMENT = document.getElementById("header-drop-down-menu");
    L_ELEMENT.style.display = dropDownMenuIsOpen = !dropDownMenuIsOpen ? "None" : "";
}

let config;
function LoadYML() {
    let lYamlText = document.getElementById("config").textContent;
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
function UpdateBeers() {
    const L_EVENT_BEER_NAME = document.getElementById("event-beer-name");
    const L_EVENT_BEER_IMAGE = document.getElementById("event-beer-img");

    L_EVENT_BEER_NAME.innerHTML = config.event_beers[0].name;
    L_EVENT_BEER_IMAGE.src = `Images/${config.event_beers[0].img}`;
}



Ready();