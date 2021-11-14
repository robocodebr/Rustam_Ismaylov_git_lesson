let array = ["cat", "dog", "frog", "wolf"]

let emoji = ['😺','🐶', '🐸', '🐺' ]

array.forEach(function(element, index) {
    console.log(element+" "+emoji[index])
});

let newArray = array.map(function(element, index) {
    return emoji[index]+element+emoji[index]
});
console.log(newArray);
let filteredArray = array.filter(function(element) {
    return element.length >=4
});
console.log(filteredArray);


let numArray = [4,6,8,9,9,2,0,1]
numArray.sort(function(element, element2) {
    return element-element2
});

console.log(numArray);


function fun() {

    console.log(arguments);
}
fun(5,6,88,8,3);
