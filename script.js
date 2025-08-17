/// Functions

function Ready() {
    DropDownMenuSwitch();
    LoadYML();
    UpdateEvent();
    UpdateEventBeers();
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
let eventIndex = -1;
function UpdateEvent() {
    const L_EVENTS_COUNT = config.events.length;
    if (L_EVENTS_COUNT <= 0) return;

    const L_EVENT_TITLE = document.getElementById("event-title");
    const L_EVENT_DATE = document.getElementById("event-date");
    const L_EVENT_IMAGE = document.getElementById("event-img");

    eventIndex = ++eventIndex % L_EVENTS_COUNT;
    let lEvent = config.events[eventIndex];

    L_EVENT_TITLE.innerHTML = lEvent.name;
    L_EVENT_DATE.innerHTML = lEvent.date;
    L_EVENT_IMAGE.src = `Images/${lEvent.img}`;

    console.log(`event ${eventIndex}`);

    setTimeout(UpdateEvent, 2_500);
}

// Beers
let beerIndex = -1;
function UpdateEventBeers() {
    const L_BEERS_COUNT = config.event_beers.length;
    if (L_BEERS_COUNT <= 0) return;

    const L_EVENT_BEER_NAME = document.getElementById("event-beer-name");
    const L_EVENT_BEER_IMAGE = document.getElementById("event-beer-img");

    beerIndex = ++beerIndex % L_BEERS_COUNT;
    let lBeer = config.event_beers[beerIndex];

    L_EVENT_BEER_NAME.innerHTML = lBeer.name;
    L_EVENT_BEER_IMAGE.src = `Images/${lBeer.img}`;
    console.log(`beer ${beerIndex}`);

    setTimeout(UpdateEventBeers, 2_500);
}



Ready();