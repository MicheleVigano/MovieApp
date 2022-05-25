import {BASE_URL} from "./config.js"

/**
* chiamata api per elenchi film, serie, ecc
* @param {string} url La url da chiamar con la fetch
*/

export const applist = (s,type) => {
    const url = BASE_URL + "s="+s+"&type="+type     ;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;
        viewItems(items);
    });
};

/**
* ciclo l'array
* @param {array di movie/series/game} items esploro le proprietà che ci sono in ogni item
*/

const viewItems = (items) => {
    items.map((item) => {
        console.group(item.Title);
        console.log(item.Type);
        console.log(item.Year);
        console.log(item.Poster);
        console.groupEnd();
    })
};