// // DOM objects
// const section = document.getElementById("catSection");
// const figure = document.createElement("figure");
// const image = document.createElement("img");
// const caption = document.createElement("figcaption");


// // Cat Constructor
// function Cat(imageObject){
//     this.id = `cat-${imageObject.id}`;
//     this.src = imageObject.src;
//     this.alt = imageObject.alt;
//     this.caption = imageObject.caption;
// }

// Cat.prototype.buildNode = function(){

// }

// //append the node to the section
// function appendNode(){
//     // Clear the contents of the "cat" section and append a new node
//     clearHTML().appendChild(buildNode());

//     //Overwrite the section with an empty string
//     function clearHTML(target){
//         target.innerHTML = '';
//         return target
//     }

//     // Build the cat section node - should this be a Cat method?
//     function buildNode(responseData){
//         // Create a fragment to hold cat nodes
//         const domFrag = document.createDocumentFragment();
//         // buildCatArray returns an array of cat instances, e.g. [{...}, {...}], each of which is a node. Those nodes are appended one by one to the fragment.
//         // What exactly am I appending here? I have a new cat object instance from my constructor. How do I append that? This isn't going to work. I need to pass a node object to appendChild
//         buildArray().forEach( element => domFrag.appendChild(element) );

//         //Build the array
//         function buildArray(){
//             // Build an array of new instances
//             // The Cat constructor will take an individual cat object from the api response data as its argument and use it to build a new cat instance
//             return responseData.map( element => new Cat(element) );
//         }

//         return domFrag;
//     }
// }


const paramsArray = [
    "pet.find",
    "add4fdca944ac818ef1bee3a08e0602b",
    "json",
    "full",
    "cat",
    document.getElementById("catNum").value,
    document.getElementById("location").value,
];

// Request data from the cat API
function sendRequest(){
    
    class BuildURL{
        constructor(arr){
            this.method = arr[0];
            this.key = arr[1];
            this.format = arr[2];
            this.output = arr[3];
            this.animal = arr[4];
            this.count = arr[5]; 
            this.location = arr[6]
        }
        // The PetFinder API uses JSONP to allow cross domain requests and does not support CORS, hence the callback argument
        build(){
            return `https://api.petfinder.com/${this.method}?key=${this.key}&format=${this.format}&location=${this.location}`;
        }
    }

    // The Fetch API does not provide support for JSONP. fetchJsonp is part of the fetch-jsonp library which provides support for JSONP
    fetchJsonp(new BuildURL(paramsArray).build(), {
        jsonpCallback: '?',
        timeout: 10000
      })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    })
    .catch(function(response) {
        console.log('Something went wrong: ', response)
    });

}

// Listen for number of cats
document.getElementById("catButton").addEventListener('click', sendRequest, false);
