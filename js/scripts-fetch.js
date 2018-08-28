////////////////////////////////
//////////BUILD CAT ////////////
////////////////////////////////

// Cat Constructor
class Cat {
    constructor(imageObject) {
        this.id = imageObject.id.$t;
        this.animal = imageObject.animal.$t;
        this.name = imageObject.name.$t;
        this.src = imageObject.media.photos.photo[0].$t;
        this.description = imageObject.description.$t;
        this.age = imageObject.age.$t;
        this.sex = imageObject.sex.$t === "F" ? "Female" : "Male";
        this.breed = imageObject.breeds.breed.$t;
        this.mix = imageObject.mix.$t;
    }

    buildImg(){ 
        let img = document.createElement("img");
        img.id = `${this.name}-${this.id}` 
        img.src = this.src;
        img.alt = `${this.name} is a ${this.age}, ${this.sex} ${this.breed}.`
        img.title = this.name;
        return img
    }

    buildCap(){
        let cap = document.createElement("figcaption");
        cap.textContent = this.description;
        return cap;
    }
    
    buildFig(image, caption){
        let fig = document.createElement("figure");
        fig.appendChild(image);
        fig.appendChild(caption);
        return fig;
    }
}

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

////////////////////////////////
///////////// DATA  ////////////
////////////////////////////////

let myData;

// Request data from the cat API
function sendRequest(){

    const params = {
        method: "pet.find",
        key: "add4fdca944ac818ef1bee3a08e0602b",
        format: "json",
        output: "full",
        animal: "Cat",
        count: document.getElementById("catNum").value,
        myLocation: document.getElementById("myLocation").value.replace(/ +/g, "")
    };
    
    class BuildURL{
        constructor(params){
            this.method = params.method;
            this.key = params.key;
            this.format = params.format;
            this.output = params.output;
            this.animal = params.animal;
            this.count = params.count; 
            this.myLocation = params.myLocation;
        }
        // The PetFinder API uses JSONP to allow cross domain requests and does not support CORS, hence the callback argument
        build(){
            return encodeURI(`https://api.petfinder.com/${this.method}?key=${this.key}&format=${this.format}&location=${this.myLocation}&count=${this.count}`);
        }
    }

    console.log(new BuildURL(params).build(), params.myLocation, params.count)
    
    // The Fetch API does not provide support for JSONP. fetchJsonp is part of the fetch-jsonp library which provides support for JSONP
    fetchJsonp(new BuildURL(params).build(), {
        jsonpCallback: 'callback',
        timeout: 10000
      })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        myData = myJson.petfinder.pets.pet
        console.log(myData);
    })
    .catch(function(response) {
        console.log('Something went wrong: ', response)
    });

}

////////////////////////////////
//////////// CURSOR  ///////////
////////////////////////////////

const inputs = document.querySelectorAll("input");
for (let i = 0; i < inputs.length; i++) {
    //inputs[i].addEventListener ("change",    removeBlinkingCursor, false);
    //inputs[i].addEventListener ("keyup",     removeBlinkingCursor, false);
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
    console.log(cursor)
    cursor.classList.remove("blink");
}

// Listen for number of cats
document.getElementById("catButton").addEventListener('click', sendRequest, false);
