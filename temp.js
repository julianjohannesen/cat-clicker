const inputs = document.querySelectorAll ("input");
for (let i = inpsToMonitor.length - 1;  i >= 0;  i--) {
    inputs[i].addEventListener ("change",    removeBlinkingCursor, false);
    inputs[i].addEventListener ("keyup",     removeBlinkingCursor, false);
    inputs[i].addEventListener ("focus",     removeBlinkingCursor, false);
    inputs[i].addEventListener ("blur",      removeBlinkingCursor, false);
    inputs[i].addEventListener ("mousedown", removeBlinkingCursor, false);

    // // Initial update.
    // const evt = document.createEvent("HTMLEvents");
    // evt.initEvent ("change", false, true);
    // inputs[i].dispatchEvent (evt);
}

function removeBlinkingCursor(e) {
    const cursor = e.target.previousElementSibling.children[0];
    cursor.classList.remove("blink");
}