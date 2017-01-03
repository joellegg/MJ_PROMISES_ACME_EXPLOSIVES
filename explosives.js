/////////////////////////////////////////
////////  Global Variables  /////////////
/////////////////////////////////////////

let categories;
let category_types;
let products;

//////////////////////////////////
////////  Functions  /////////////
//////////////////////////////////

function checkCategory(e) {
    if (e.target.value === 'Category') {
        alert("Choose a category")
    } else {
        writeToHTML(e);
    }
}

function writeToHTML(e) {
    console.log(e.target.value);
    for (let i = 0; i < categories.categories.length; i++) {
        if (e.target.value === categories.categories[i].name) {
            console.log('yep')
        }
    }
}

/////////////////////////////////
////////  Promises  /////////////
/////////////////////////////////

function loadData(e) {
    var promise1 = new Promise(function(resolve, reject){
      var request1 = new XMLHttpRequest()
      request1.addEventListener("load", function() {
        var list = JSON.parse(request1.responseText)
        resolve(list)// pass the info we're waiting for to the resolve
      })
      request1.open("GET", "JSON/categories.json")
      request1.send()
    });

    var promise2 = new Promise(function(resolve, reject){
        var request2 = new XMLHttpRequest()
        request2.addEventListener("load", function() {
            var list = JSON.parse(request2.responseText)
            resolve(list)
        })
        request2.open("GET", "JSON/types.json")
        request2.send()
    });

    var promise3 = new Promise(function(resolve, reject){
      var request3 = new XMLHttpRequest()
      request3.addEventListener("load", function() {
        var list = JSON.parse(request3.responseText)
        resolve(list)
      })
      request3.open("GET", "JSON/products.json")
      request3.send()
    })

    promise1
        .then(function(val){
            categories = val
            console.log("promise one resolved, ", categories);
            return promise2
        }).then(function(val) {
            category_types = val
            console.log("promise two resolved, ", category_types);
            return promise3
        }).then(function(val) {
            products = val
            console.log("promise three resolved, ", products);
            return;
        }).then(function() {
            checkCategory(e)
        });
}



///////////////////////////////////////
////////  Event Listener  /////////////
///////////////////////////////////////

$('#category_select').change(function(e){
    loadData(e);
});
