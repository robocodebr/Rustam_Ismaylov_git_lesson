// let xhr = new XMLHttpRequest();
// let url = "https://61366db18700c50017ef5578.mockapi.io/repositories/repos";

// xhr.open('GET', url);
// xhr.send();
// xhr.addEventListener("readystatechange", function(){
//     if(xhr.status == 200){
//         console.log("slava Ucraine")
//     }else{
//         console.log("ti moskal"+ xhr.responseText)
//     }
// })
// xhr.addEventListener("load", function(){
//     console.log(xhr.response);
// });

// fetch("https://61366db18700c50017ef5578.mockapi.io/repositories/blob")

// let obj = {
//     name: "Chad Cummerata"
// }
// fetch(url, {
//     method: "POST",
//     body: JSON.stringify(obj)
// })

// let obj2 = {
//     name: "Chad Cummerata"  
// }
// fetch("https://61366db18700c50017ef5578.mockapi.io/repositories/blob/22", {
//     method: "PUT",
//     body: JSON.stringify(obj2)
// })
// .then(function(response){
//     return response.json()
// })
// .then(function(json ){
//     console.log(json);
// })
// .catch(function(error){
//     console.log(error);
// })

//CRUD - create read update delete 
//create - POST
//read - GET
//update - PUT
//delete - DELETE 

let form = document.getElementsByTagName("form")[0];
let button = document.querySelector(".button");

button.onclick = function(e){
    e.preventDefault()

    //console.log(input_textValue.value);
    let url = "https://pokeapi.co/api/v2/pokemon/"+form.elements.bot_input.value;
    fetch(url)
    .then(data=>data.json())
    .then(data=> {
        drawCard(data);
    })
};

function drawCard(data){
    let element = document.querySelector("#seacret");
    let types = "";
    for(let index = 0; index< data.types.length; index++){
        types += `<li>${data.types[index].type.name}<li>`;
    }

    let items = "";
    for(let i = 0; i< data.held_items.length; i++){
        let item = data.held_items[i].item;
        items += `
            <li id="${item.name}">
            <p><b>${item.name}</b></p>
            </li>
        `
      
        fetch(item.url)
        .then(data=>data.json())
        .then(function(data){
            let li = document.getElementById(item.name);
            li.innerHTML += `<img src="${data.sprites.default}" alt="${item.name}">`;
        })
    }

    console.log(data);

    element.innerHTML=`
        <div class="container">

            <div class="head"><p class="container_number">${data.id}</p></div>

            <h2 class="container_name">${data.name}</h2>
            <img class="container_img" src="${data.sprites.front_default}" alt="${data.name}">

            <ul>
                ${types}
            </ul>

            <ul>
                ${items}
            </ul>
        
        </div>
    `;
}

