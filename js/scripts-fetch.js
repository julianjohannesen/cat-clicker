// DOM objects
const section = document.getElementById("catSection");
const figure = document.createElement("figure");
const image = document.createElement("img");
const caption = document.createElement("figcaption");


// Cat Constructor
function Cat(imageObject){
    this.id = `cat-${imageObject.id}`;
    this.src = imageObject.src;
    this.alt = imageObject.alt;
    this.caption = imageObject.caption;
}

Cat.prototype.buildNode = function(){

}

//append the node to the section
function appendNode(){
    // Clear the contents of the "cat" section and append a new node
    clearHTML().appendChild(buildNode());

    //Overwrite the section with an empty string
    function clearHTML(target){
        target.innerHTML = '';
        return target
    }

    // Build the cat section node - should this be a Cat method?
    function buildNode(responseData){
        // Create a fragment to hold cat nodes
        const domFrag = document.createDocumentFragment();
        // buildCatArray returns an array of cat instances, e.g. [{...}, {...}], each of which is a node. Those nodes are appended one by one to the fragment.
        // What exactly am I appending here? I have a new cat object instance from my constructor. How do I append that? This isn't going to work. I need to pass a node object to appendChild
        buildArray().forEach( element => domFrag.appendChild(element) );

        //Build the array
        function buildArray(){
            // Build an array of new instances
            // The Cat constructor will take an individual cat object from the api response data as its argument and use it to build a new cat instance
            return responseData.map( element => new Cat(element) );
        }

        return domFrag;
    }
}

const cl = console.log;

let data;
// Request data from the cat API
function sendRequest(){
    
    const limit = document.getElementById("catNum").value;
    const apiURL = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=${limit}`;
    const init = {
        credentials: "include",
        headers: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
            "Content-Type": "application/json; charset=utf-8",
            "x-api-key": "be8e2b27-8de8-42e7-b1c0-49a0a0e6cf06"
        }
    };
    
    fetch(apiURL, init)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });

}

// Listen for number of cats
document.getElementById("catButton").addEventListener('click', sendRequest, false);
