let dropDownMenuIsOpen = false;
function DropDownMenuSwitch() {
    const L_ELEMENT = document.getElementById("header-drop-down-menu");
    const L_NONE = "None", L_EMPTY = "";
    L_ELEMENT.style.display = dropDownMenuIsOpen = !dropDownMenuIsOpen ? L_NONE : L_EMPTY;
}
DropDownMenuSwitch();