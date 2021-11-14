/*let promise = new Promise(function(resolve, reject) {

    setTimeout(function() {
        console.log("yee!");
        resolve();
    }, 2000);

    reject();
});

promise
.then(function() {
    console.log("lol");
}).then(function() {
    console.log("*-*")
}).catch(function() {
    console.log("error")
});

*/
let mainElement = document.getElementById("container");
let form=document.getElementsByClassName("orderForm")[0];
let sortPokeParam = "id";
let order = 1;
let pokemons = [];
function changer(e){
    e.preventDefault();
    let inputs = form.elements;
    let pokeParam = inputs.pokeParam.value;
    let pokeOrder = inputs.order.value;
    if(pokeParam) sortPokeParam = pokeParam;
    if(pokeOrder) order = pokeOrder;
    console.log(sortPokeParam)
    console.log(order)

    let filters = {
        name: inputs.pokemonNameFilter.value,
        hpfrom: inputs.hpFromFilter.value,
        hpTo: inputs.hpToFilter.value,
        attackFrom: inputs.attackFromFilter.value,
        attackTo: inputs.attackToFilter.value,
        defenseFrom: inputs.defenseFromFilter.value,
        defenseTo: inputs.defenseToFilter.value
    }

    sortPokemons(pokemons);
    drawAllPokemons(filterPokemons(pokemons, filters));
};

form.addEventListener("change", changer);
form.addEventListener("submit", changer);


fetch("https://pokeapi.co/api/v2/pokemon?limit=127")
.then(data => data.json())
.then(function(data){
    console.log(data.results);
    let requests = data.results.map(function(element) {
        return fetch(element.url);
    })
    console.log(requests);
    Promise.all(requests)
    .then(function(pokemons) {
        return Promise.all(pokemons.map(p=>p.json()))
    })
    .then(function (data){
        pokemons = data;
        sortPokemons(pokemons);
        drawAllPokemons(pokemons);
    });
})

function sortPokemons(pokemons){
    console.log(pokemons)
    switch(sortPokeParam) {
        case "id": 
        pokemons.sort(function(first, second){
            if(first.id > second.id){
                return order;
            } else if(first.id < second.id) {
                return -order;
            }
            return 0;
        });
        break;
        case "name": 
        pokemons.sort(function(first, second){
            if(first.name > second.name){
                return order;
            }else if(first.name < second.name){
                return -order;
            }else{
                return 0;
            }
        });
        break;
        case "attack": 
        pokemons.sort(function(first, second){
            if(first.stats[1].base_stat > second.stats[1].base_stat){
                return order;
            }else if(first.stats[1].base_stat < second.stats[1].base_stat){
                return -order;
            }else{
                return 0;
            }
        });
        break;
        case "defense":
        pokemons.sort(function(first, second){
            if(first.stats[2].base_stat > second.stats[2].base_stat){
                return order;
            }else if(first.stats[2].base_stat < second.stats[2].base_stat){
                return -order;
            }else{
                return 0;
            }
        });        
        break;
    }
}

function drawAllPokemons(pokemons) {
    let stringWithAllPokes = "";
    pokemons.forEach(function(p){
        stringWithAllPokes += drawPokemon(p);
    });
    mainElement.innerHTML = stringWithAllPokes;
}


function drawPokemon(pokemonData) {
    let pokemon = `
    <div class="card">
        <p>${pokemonData.id}</p>
        <hr>
        <p class="name">${pokemonData.name}</p>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <div class="params">
            <p class="hp">&#10084; ${pokemonData.stats[0].base_stat}</p>
            <p class="attack">&#9876; ${pokemonData.stats[1].base_stat}</p>
            <p class="defence">&#9825; ${pokemonData.stats[2].base_stat} </p>
        </div>
    </div>`
    return pokemon;
}

function filterPokemons(pokemons, filters) {

    let filteredPokemons = pokemons.filter(function(pokemon){
        let isSuitableName = filters.name.length == 0 || pokemon.name.startsWith(filters.name);
        let isHp = (pokemon.stats[0].base_stat >= filters.hpfrom) && (pokemon.stats[0].base_stat <= filters.hpTo);
        let isAttack = (pokemon.stats[1].base_stat >= filters.attackFrom) && (pokemon.stats[1].base_stat <= filters.attackTo);
        let isDefense = (pokemon.stats[2].base_stat >= filters.defenseFrom) && (pokemon.stats[2].base_stat <= filters.defenseTo);
        
        return isSuitableName && isAttack && isHp && isDefense;
    });
    return filteredPokemons;
}