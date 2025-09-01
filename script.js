/// TEMPO
function RERERE(e) {
    const el = document.querySelector(".tempo-text");
    el.classList.remove("temp-anim");
    void el.offsetWidth;
    el.classList.add("jump");

}
document.querySelector(".tempo-text").addEventListener("animationend", (e) => e.target.remove());

/// Consts
const SWITCH_TIME_ELEMENT_DEFAULT = 5_500, SWITCH_TIME_ELEMENT_WITH_BUTTON = 20_000;

/// Variables

/// Functions

function Ready() {
    DropDownMenuSwitch();
    LoadYML();
    LoadEvents();
    LoadEventBeers();
    LoadSellPoints();
    LoadInterviews();
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
function LoadEvents() {
    if (!config.events) return document.getElementById("events").remove();
    if (config.events.length <= 1) document.getElementById("events-arrows").remove();
    UpdateEvent(0);
}
function UpdateEvent(pIndex, pIsButton) {
    const L_EVENTS_COUNT = config.events.length;
    const L_CONTAINER = document.getElementById("event-container");
    const L_EVENT_TITLE = document.getElementById("event-title");
    const L_EVENT_DATE = document.getElementById("event-date");
    const L_EVENT_IMAGE = document.getElementById("event-img");

    eventIndex += pIndex;
    if (eventIndex < 0) eventIndex = L_EVENTS_COUNT - 1;
    else if (eventIndex >= L_EVENTS_COUNT) eventIndex = 0;
    let lEvent = config.events[eventIndex];

    L_EVENT_TITLE.innerHTML = lEvent.name;
    L_EVENT_DATE.innerHTML = lEvent.date;

    if (pIndex == 0) {
        L_EVENT_IMAGE.src = `Images/${lEvent.img}`;
    }
    else {
        let lDirection = pIndex > 0 ? "right" : "left";
        let lNext = document.createElement("img");
        lNext.src = `Images/${lEvent.img}`;
        lNext.id = "event-img";
        lNext.className = `start-${lDirection}`;
        L_CONTAINER.insertBefore(lNext, L_EVENT_IMAGE);
        
        void lNext.offsetWidth;
        lNext.classList.add(`enter`);
        void L_EVENT_IMAGE.offsetWidth;
        L_EVENT_IMAGE.classList.add(`exit-${lDirection}`);
        L_EVENT_IMAGE.addEventListener("transitionend", () => L_EVENT_IMAGE.remove());
    }
    

    if (eventTimeout) clearTimeout(eventTimeout);
    eventTimeout = setTimeout(() => UpdateEvent(1), pIsButton ? SWITCH_TIME_ELEMENT_WITH_BUTTON : SWITCH_TIME_ELEMENT_DEFAULT);
}

// Beers
let beerIndex = 0;
let beerTimeout;
function LoadEventBeers() {
    if (!config.event_beers) return document.getElementById("beer-event").remove();
    if (config.event_beers.length <= 1) document.getElementById("event-beers-arrows").remove();
    UpdateEventBeers(0);
}
function UpdateEventBeers(pIndex, pIsButton = false) {
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
    beerTimeout = setTimeout(() => UpdateEventBeers(1), pIsButton ? SWITCH_TIME_ELEMENT_WITH_BUTTON : SWITCH_TIME_ELEMENT_DEFAULT);
}

// Sell points
function LoadSellPoints() {
    if (!config.sell_points) return;

    const N_SELL_POINTS = config.sell_points.length;
    if (N_SELL_POINTS <= 3) {
        document.getElementById("all-sell-points-button").remove();
        if (N_SELL_POINTS <= 1) document.getElementById("sell-points-arrows").remove();
    }
    
    let lSellPoints = document.getElementById("sell-point-list");
    let lName, lAddress, lEmbedUrl;
    config.sell_points.forEach(lPoint => {
        lName = lPoint.name;
        lEmbedUrl = lPoint.address;

        lSellPoints.innerHTML += `
        <div class = "sell-point">
            <h2>${lName}</h2>
            <div class = "img-container">
                <iframe
                    src = "${lEmbedUrl}"
                    allowfullscreen = ""
                    loading = "lazy"
                    referrerpolicy = "no-referrer">
                </iframe>
            </div>
        </div>
        `;
    });
}

// Interviews
function LoadInterviews() {
    if (!config.interviews) return;

    const N_INTERVIEWS = config.interviews.length, N_MAX = 3;
    if (N_INTERVIEWS <= N_MAX) document.getElementById("all-interviews-button").remove();

    let lInterviews = document.getElementById("interview-list");
    let lLength = Math.min(N_INTERVIEWS, N_MAX);
    let lName, lUrl, lImgLink, lInterview;
    for (let i = 0; i < lLength; i++) {
        lInterview = config.interviews[i];
        lName = lInterview.name;
        lUrl = new URL(lInterview.link);
        if (lUrl.hostname == "youtu.be") lImgLink = lUrl.pathname.slice(1);
        else lImgLink = lUrl.searchParams.get("v");
        lInterviews.innerHTML += `
        <div class = "centered interview">
            <h2>${lName}</h2>
            <div class = "img-container">
                <img src = "https://img.youtube.com/vi/${lImgLink}/mqdefault.jpg" onclick = "window.open('${lInterview.link}', '_blank')">
            </div>
        </div>
        `
    };
}



Ready();