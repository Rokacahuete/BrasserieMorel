/// Consts
const SWITCH_TIME_ELEMENT_DEFAULT = 5_500, SWITCH_TIME_ELEMENT_WITH_BUTTON = 20_000;

/// Variables

/// Functions
function Ready() {
    LoadTop();
    LoadYML();
    LoadEvents();
    LoadEventBeers();
    LoadSellPoints();
    LoadInterviews();
}

let config;
function LoadYML() {
    let lYamlText = document.getElementById("config").textContent;
    config = jsyaml.load(lYamlText); 
}

// Top
let dropDownMenuIsOpen = false;
function DropDownMenuSwitch() {
    const L_ELEMENT = document.getElementById("header-drop-down-menu");
    L_ELEMENT.style.display = dropDownMenuIsOpen = !dropDownMenuIsOpen ? "None" : "";
}
function LoadTop() {
    // const L_CONTAINER = document.getElementById("medailles-container");
    // let lImg, lText;
    // [...L_CONTAINER.getElementsByClassName("medaille")].forEach(lChild => {
    //     lImg = lChild.querySelector("img");
        
    //     lImg.addEventListener("mouseover", () => {
    //         lText = lChild.querySelector("p");
    //         void lText.offsetWidth;
    //         lText.style.opacity = 1;
    //         lText.style.transform = "scaleX(1)";
    //     });
    //     lImg.addEventListener("mouseout", () => {
    //         lText = lChild.querySelector("p");
    //         void lText.offsetWidth;
    //         lText.style.opacity = 0;
    //         lText.style.transform = "scaleX(0)";
    //     });
    // });

    DropDownMenuSwitch();
}

function Shuffle(pArray) {
    return pArray.sort((a, b) => Math.random() -.5);
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

    L_EVENT_DATE.innerHTML = lEvent.date;

    if (pIndex == 0) {
        L_EVENT_TITLE.innerHTML = lEvent.name;
        L_EVENT_IMAGE.src = `Images/${lEvent.img}`;
    }
    else {
        let lDirection = pIndex > 0 ? "right" : "left";
        let lNext = document.createElement("img");
        lNext.src = `Images/${lEvent.img}`;
        L_CONTAINER.insertBefore(lNext, L_EVENT_IMAGE);
        AnimEventImage(L_EVENT_IMAGE, lNext, lDirection);
        AnimEventName(L_EVENT_TITLE, lEvent.name);
    }
    
    if (eventTimeout) clearTimeout(eventTimeout);
    eventTimeout = setTimeout(() => UpdateEvent(1), pIsButton ? SWITCH_TIME_ELEMENT_WITH_BUTTON : SWITCH_TIME_ELEMENT_DEFAULT);
}

function AnimEventImage(pImage, pNext, pDirection) {
    pNext.id = "event-img";
    pNext.className = `start-${pDirection}`;
    
    void pNext.offsetWidth;
    pNext.classList.add("enter");
    void pImage.offsetWidth;
    pImage.classList.add(`exit-${pDirection}`);
    pImage.addEventListener("transitionend", () => pImage.remove());
}

function AnimEventName(pTitle, pText) {
    if (pTitle.innerHTML == pText) return;
    
    pTitle.offsetWidth;
    pTitle.classList.add("exit");
    let LExitListener = () => {
        pTitle.classList.remove("exit");
        pTitle.removeEventListener("animationend", LExitListener);
        pTitle.innerHTML = pText;
        pTitle.offsetHeight;
        pTitle.classList.add("enter");
        pTitle.addEventListener("transitionend", () => LEnterLister);
    }
    let LEnterLister = () => {
        pTitle.removeEventListener("transitionend", LEnterLister);
    }
    pTitle.addEventListener("transitionend", LExitListener);
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
var ASellPoints = [];
var sellPointsIndex = 1;
function LoadSellPoints() {
    if (!config.sell_points) return;

    const N_SELL_POINTS = config.sell_points.length;
    if (N_SELL_POINTS <= 3) {
        document.getElementById("all-sell-points-button").remove();
        if (N_SELL_POINTS <= 1) document.getElementById("sell-points-arrows").remove();
    }
    let lFirstElement = config.sell_points.shift();
    Shuffle(config.sell_points);
    config.sell_points.unshift(lFirstElement);
    
    let lName, lImg, lElement;
    config.sell_points.forEach(lPoint => {
        lName = lPoint.name;
        lImg = lPoint.img;

        lElement = document.createElement("div");
        lElement.className = "sell-point";
        lElement.innerHTML = `
        <div class = "img-container">
            <img src = "Images/Logo/${lImg}">
        </div>
        <h2>${lName}</h2>
        `;
        ASellPoints.push(lElement);
    });
    
    SwitchSellPoints(0);
}

function SwitchSellPoints(pIndex) {
    const L_CONTAINER = document.getElementById("sell-point-list");
    L_CONTAINER.innerHTML = "";
    
    sellPointsIndex += pIndex;
    if (sellPointsIndex <= 0) sellPointsIndex += ASellPoints.length;
    for (let i = sellPointsIndex -1; i <= sellPointsIndex + 1; i++) {
        L_CONTAINER.append(ASellPoints[i % ASellPoints.length]);
    }
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