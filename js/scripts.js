(function init(){
    
    // Counter
    let catCounter = 0;
    // Image tag
    const elem = document.querySelector('body');
    // Click Display Div
    const clickDisplay = document.querySelector('span');

    // Cat click listener
    elem.addEventListener('click', function(){
        // Increment counter
        catCounter++;
        // Display cat clicks
        clickDisplay.textContent = catCounter > 9 ? catCounter : "0" + catCounter;
    }, false);

    

})()