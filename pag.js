let container = document.getElementById('list');

let next_button = document.getElementById('next');
let prev_button = document.getElementById('prev');

function draw_list(url){
    fetch(url)
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        let list_html = '<ul>';
        for(let i = 0; i < data.results.length; i++){
            list_html += `<li>${data.results[i].name}</li>`;
        }
        list_html += '</ul>';
        container.innerHTML = list_html;
        if(data.next == null){
            next_button.style.display = 'none';
            prev_button.style.display = 'inline';
            console.log('1')
            prev_button.dataset.url = data.previous;
            next_button.dataset.url = data.next; 
        }if(data.previous == null){
            next_button.style.display = 'inline';
            prev_button.style.display = 'none';
            console.log('2')
            prev_button.dataset.url = data.previous;
            next_button.dataset.url = data.next; 
        }if(data.previous != null && data.next != null){
            next_button.style.display = 'inline';
            prev_button.style.display = 'inline';
            console.log('3')
            prev_button.dataset.url = data.previous;
            next_button.dataset.url = data.next; 
        }
    });
}


next_button.addEventListener('click', function(e){
    e.preventDefault();
    draw_list(next_button.getAttribute('data-url'))
});

prev_button.addEventListener('click', function(e){
    e.preventDefault();
    draw_list(prev_button.getAttribute('data-url'))
});
draw_list('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');