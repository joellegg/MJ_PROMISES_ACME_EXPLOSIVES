/////////////////////////////////////////
////////  Global Variables  /////////////
/////////////////////////////////////////

let categories;
let category_types;
let products;

//////////////////////////////////
////////  Functions  /////////////
//////////////////////////////////

function writeToHTML() {
    console.log('writeToHTML function invoked')
}

/////////////////////////////////
////////  Promises  /////////////
/////////////////////////////////

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
        console.log('all loaded');
    }).then(writeToHTML)


///////////////////////////////////////
////////  Event Listener  /////////////
///////////////////////////////////////

$('#category_select').change(function(e){
    console.log(e.target.value);
});
