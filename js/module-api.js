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
    const url = BASE_URL + title    ;
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
        const {Title, Year, Type, Poster} = item;
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${Poster}" alt="${Title}">
            <div class="item-info">
                <h3>${Title}</h3>
                <p>${Year}</p>
                <p>${Type}</p>
            </div>
        `;
        document.querySelector(".items").appendChild(itemElement);
    })
};