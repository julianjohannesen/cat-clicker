Cat Constructor
function Cat(catObject){
    const figure = document.createElement("figure");
    figure.id = `cat-${catObject.title}`;
    const image = document.createElement("img");
    image.src = catObject.src;
    image.alt = catObject.alt;
    const caption = document.createElement("figcaption");
    caption.textContent = catObject.caption;
}

//append the cat node to the cat section
function appendNode(){
    // Clear the contents of the "cat" section and append a new node
    clearCatSection().appendChild(buildCatNode());

    //Variable and function definitions
    const catSection = document.getElementById("catSection");

    //Overwrite the catSection with an empty string
    function clearCatSection(){
        catSection.innerHTML = '';
        return catSection
    }

    // Build the cat section node - should this be a Cat method?
    function buildCatNode(){
        // Create a fragment to hold cat nodes
        const domFrag = document.createDocumentFragment();
        // buildCatArray returns an array of cat instances each of which is a node. Those nodes are appended one by one to the fragment.
        buildCatArray().forEach( cat => domFrag.appendChild(cat) );

        //Build the cat array
        function buildCatArray(){
            // Build an array of new cat instances
            // The Cat constructor will take an individual cat object as its argument and use it to build a new cat instance
            return data.map( cat => new Cat(cat) );
        }

        return domFrag;
    }
}

const cl = console.log;

let data;
// Request data from the cat API
function sendRequest(){
    cl("Does sendRequest fire?");
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    cl("Is request created?", request);
    // Build request URL
    const limit = document.getElementById("catNum").value;
    const apiURL = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=${limit}`;
    cl("What's the url?", apiURL);
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', apiURL, true);

    // Set the request headers
    const apiKey = "be8e2b27-8de8-42e7-b1c0-49a0a0e6cf06";
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("x-api-key", apiKey)
    cl("Are the request headers set?", request.getAllResponseHeaders())
    // Define the load event handler
    request.onload = function () {
        cl("Is this onload function even called?");
        cl(this);
        // Parse response
        data = JSON.parse(request.response);
        cl(data);
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
document.getElementById("catButton").addEventListener('click', sendRequest, false);
