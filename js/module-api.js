import {BASE_URL} from "./config.js"


/**
* chiamata api per una ricerca di un film
* @param {indice array}  title_index indice dell'array movies in titles.json
*/

export const movielist = (title_index) => {
    // const title = json file array[title_index]  -->  "title" of the json file
    const url = BASE_URL + title    ;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;
       printItems(items); //stampa i risultati della ricerca nelle card
    });
};


/**
* chiamata api per elenchi film, serie, ecc
* @param {string} url La url da chiamar con la fetch
*/

export const applist = (title) => {
    const url = BASE_URL + "s=" + title +"type=movie";
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;
        printItems(items);
    });
};

/**
* ciclo l'array
* @param {array di movie} items esploro le proprietà che ci sono in ogni item
*/

const printItems = (items) => { // items è un array di oggetti, ciascuno con le proprietà che vogliamo inserire nell'html
    items.map((item) => {
        const {Title, Year, imdbID, Type, Poster} = item;
        itemElement.classList.add("item");
        itemElement.innerHTML = `
        <img id="movie-img" src="${Poster}" class="card-img-top p-3 rounded-3" alt="movie image from IMDB">
        <div class="card-body">
          <h5 id="movie-title"  class="card-title">${Title}</h5>
          <p  id="movie-summary" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li id="movie-description" class="list-group-item border-dark text-white" style="background-color: #353535;">${Year}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="btn btn-dark">Summary</a>
        </div>
      </div>
        `;
       // document.querySelector(".items").appendChild(itemElement);
    })
};



  