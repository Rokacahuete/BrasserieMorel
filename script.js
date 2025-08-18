/// Functions

function Ready() {
    DropDownMenuSwitch();
    LoadYML();
    UpdateEvent(0);
    UpdateEventBeers(0);
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
let eventIndex = 0;
let eventTimeout;
function UpdateEvent(pIndex) {
    if (!config.events) return document.getElementById("events").remove();

    const L_EVENTS_COUNT = config.events.length;
    const L_EVENT_TITLE = document.getElementById("event-title");
    const L_EVENT_DATE = document.getElementById("event-date");
    const L_EVENT_IMAGE = document.getElementById("event-img");

    eventIndex += pIndex;
    if (eventIndex < 0) eventIndex = L_EVENTS_COUNT - 1;
    else if (eventIndex >= L_EVENTS_COUNT) eventIndex = 0;
    let lEvent = config.events[eventIndex];

    L_EVENT_TITLE.innerHTML = lEvent.name;
    L_EVENT_DATE.innerHTML = lEvent.date;
    L_EVENT_IMAGE.src = `Images/${lEvent.img}`;

    if (eventTimeout) clearTimeout(eventTimeout);
    eventTimeout = setTimeout(() => UpdateEvent(1), 3_500);
}

// Beers
let beerIndex = 0;
let beerTimeout;
function UpdateEventBeers(pIndex) {
    if (!config.event_beers) return document.getElementById("beer-event").remove();

    const L_BEERS_COUNT = config.event_beers.length;
    const L_EVENT_BEER_NAME = document.getElementById("event-beer-name");
    const L_EVENT_BEER_IMAGE = document.getElementById("event-beer-img");

    beerIndex += pIndex;
    if (beerIndex < 0) beerIndex = L_BEERS_COUNT - 1;
    else if (beerIndex >= L_BEERS_COUNT) beerIndex = 0;
    let lBeer = config.event_beers[beerIndex];

    L_EVENT_BEER_NAME.innerHTML = lBeer.name;
    L_EVENT_BEER_IMAGE.src = `Images/${lBeer.img}`;

    if (beerTimeout) clearTimeout(beerTimeout);
    beerTimeout = setTimeout(() => UpdateEventBeers(1), 3_500);
}



Ready();