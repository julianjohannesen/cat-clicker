//append the new node to the section
function appendCatNode(catData) {
    ////////////////////////////////
    ///////// BUILD CAT ////////////
    ////////////////////////////////

    // Cat Constructor
    class Cat {
        constructor(catObject) {
            this.id = catObject.id.$t;
            this.animal = catObject.animal.$t;
            this.name = catObject.name.$t;
            this.src = catObject.media.photos.photo[2].$t;
            this.description = catObject.description.$t;
            this.age = catObject.age.$t;
            this.sex = catObject.sex.$t === "F" ? "Female" : "Male";
            this.breed = catObject.breeds.breed.$t;
            this.mix = catObject.mix.$t;
        }

        // Build the cat figure using the image and figcaption
        buildFig() {
            let img = document.createElement("img");
            img.id = `${this.name}-${this.id}`;
            img.src = this.src;
            img.alt = `${this.name} is a ${this.age}, ${this.sex} ${this.breed}.`;
            img.title = this.name;
            let cap = document.createElement("figcaption");
            cap.textContent = `${this.name} is a ${this.age}, ${this.sex} ${this.breed}.`;
            let fig = document.createElement("figure");
            fig.appendChild(img);
            fig.appendChild(cap);
            return fig;
        }
    } // End Cat Constructor

    // Clear the contents of the cat section and append the DOM fragment that contains the new cat gallery
    const catSection = document.querySelector(".cards");
    catSection.innerHTML = "";
    catSection.appendChild(buildCatGallery());

    // Build the cat gallery using a DOM fragment to which we append new Cat instances as we iterate over the cat data using forEach
    function buildCatGallery() {
        const domFrag = document.createDocumentFragment();
        catData.forEach(aCatObj => domFrag.appendChild(new Cat(aCatObj).buildFig()));
        return domFrag;
    }
}

////////////////////////////////
///////////// DATA  ////////////
////////////////////////////////

// Request data from the cat API
function sendRequest() {
    // User's parameters for URL
  const params = {
    method: "pet.find",
    key: "add4fdca944ac818ef1bee3a08e0602b",
    format: "json",
    output: "full",
    animal: "cat",
    count: document.getElementById("catNum").value,
    myLocation: document.getElementById("myLocation").value.replace(/ +/g, "")
  };

  // Eventually I might want to allow users to build more complex queries, so I'm creating a URL class that will take an array of user supplied parameters
  class BuildURL {

    constructor(params) {
      this.method = params.method;
      this.key = params.key;
      this.format = params.format;
      this.output = params.output;
      this.animal = params.animal;
      this.count = params.count;
      this.myLocation = params.myLocation;
    }
    
    build() {
      return encodeURI(
        `https://api.petfinder.com/${this.method}?key=${this.key}&format=${
          this.format}&location=${this.myLocation}&count=${this.count}&animal=${this.animal}`
      );
    }
  }

  // The Fetch API does not provide support for JSONP. fetchJsonp is part of the fetch-jsonp library which provides support for JSONP.
  fetchJsonp(new BuildURL(params).build(), {
    jsonpCallback: "callback",
    timeout: 10000
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      myData = myJson.petfinder.pets.pet;
      console.log(myData);
      return appendCatNode(myJson.petfinder.pets.pet);
    })
    .catch(function(response) {
      console.log("Something went wrong: ", response);
    });
}

////////////////////////////////
//////////// CURSOR  ///////////
////////////////////////////////

const inputs = document.querySelectorAll("input");
for (let i = 0; i < inputs.length; i++) {
  //inputs[i].addEventListener ("change",    removeBlinkingCursor, false);
  //inputs[i].addEventListener ("keyup",     removeBlinkingCursor, false);
  inputs[i].addEventListener("focus", removeBlinkingCursor, false);
  inputs[i].addEventListener("blur", removeBlinkingCursor, false);
  inputs[i].addEventListener("mousedown", removeBlinkingCursor, false);

  // // Initial update.
  // const evt = document.createEvent("HTMLEvents");
  // evt.initEvent ("change", false, true);
  // inputs[i].dispatchEvent (evt);
}

function removeBlinkingCursor(e) {
  const cursor = e.target.previousElementSibling.children[0];
  console.log(cursor);
  cursor.classList.remove("blink");
}

// Listen for number of cats
document
  .getElementById("catButton")
  .addEventListener("click", sendRequest, false);
