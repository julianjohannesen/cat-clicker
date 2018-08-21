(function init(){

    // get an array of image objects with details like src, alt, title, and caption
    // for each image in the image array, build an HTML figure, img and figcaption 
    // the img src and alt must be set
    // the figcaption text must be set
    // the img and figcaption should be appended to the figure
    // the figure should be appended to the main tag

    // allow any number of figures

    // build an event listener that will listen to a form field
    // a callback function will get the number entered in the form field
    // the callback function will display the given number of cat images from an array of cat image objects

    // Build HTML
    function Cat(imageDetail){
        const figure = document.createElement("figure");
        figure.id = `cat-${imageDetail.title}`;
        const image = document.createElement("img");
        image.src = imageDetail.src;
        image.alt = imageDetail.alt;
        const caption = document.createElement("figcaption");
        caption.textContent = imageDetail.caption;
    }

    // The process of appending should be done all at once, after all of the building is done, so I need some sort of holder object for what I'm building, so it can be added later 
    // Append HTML
    // function appendFigures(){
    //     figure.appendChild("image");
    //     figure.appendChild("caption");

    // }
    
    // Counter
    let catCounter = 0;
    // Image tag
    const elem = document.querySelector('figure');
    // Click Display Div
    const clickDisplay = document.querySelector('span');


    //append the cat node to the cat section
    function appendCatNode(){
        //Function calls
        clearCatSection().appendChild(buildCatString());

        //Variable and function definitions
        const catSection = document.getElementById("catSection");

        //Overwrite the catSection with an empty string
        function clearCatSection(){
            catSection.innerHTML = '';
            return catSection
        }

        //Build the cat array
        function buildCatArray(){
            // Build an array of new cat instances
            // The Cat constructor will take an individual cat object as its argument and use it to build a new cat instance
            return data.map( cat => new Cat(cat) );
        }

        function buildCatNode(){
            const domFrag = document.createDocumentFragment();
            buildCatArray().forEach( cat => domFrag.appendChild(cat) );
        }
    }

    let data;
    function sendRequest(){
        
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest();

        // Build request URL
        const limit = document.getElementById("catNum").value;
        const apiURL = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=${limit}`;
        
        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', apiURL, true);

        // Set the request headers
        const apiKey = "be8e2b27-8de8-42e7-b1c0-49a0a0e6cf06";
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("x-api-key", apiKey)

        // Define the load event handler
        request.onload = function () {
            // Parse response
            data = JSON.parse(this.response);
            // If request succeeds, then...
            if (request.status >= 200 && request.status < 400) {
                return data;
            // else log an error
            } else {
                return "Error. Request status less than 200 or greater than 399.";
            }
        }
        
        // Send request
        request.send();

    }

    // Listen for number of cats
    elem.addEventListener('submit', displayCats, false);

    // Listen for cat clicks
    // elem.addEventListener('click', pawsUp, false);

    // Send request to cat API
    sendRequest();
    
})()