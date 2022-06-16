import {OM_BASE_URL} from "./js/config.js"

import myJSON from './js/titles.json' assert {type: 'json'};

console.log(myJSON.movies[0].Title);


  

/**
* chiamata api per una ricerca di un film
* @param {indice array}  title_index indice dell'array movies in titles.json
*/

export const indexlist = () => {
    
    for(let i = 0; i < 101; i++) {
      oMapplist(myJSON.movies[i].Title,false);
    }
};



                                                                                                                                                 /**
       



                                                                                                                                                 /**
                                                                                                                                                 * chiamata api per una ricerca di un film con titolo su OMDB
                                                                                                                                                 * @param {string} url La url da chiamar con la fetch
                                                                                                                                                 */

export const oMapplist = (title,isTrue) => {
    const url = OM_BASE_URL + "s=" + title +"&type=movie"; // s=titolo, type=movie per parody-------------------usa sta funz per testare
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;
     
            printIndex(items,isTrue);
    });
};

                                                                                                                                                 /**
                                                                                                                                                 * ciclo l'array
                                                                                                                                                 * @param {array di movie} items esploro le proprietà che ci sono in ogni item
                                                                                                                                                 */

 const printIndex = (items,isTrue) => { // items è un array di oggetti, ciascuno con le proprietà che vogliamo inserire nell'html


       const container = document.getElementById('x');
       console.log(items);
       
      items && items.slice(0, 1).map((item) => {  
         container.appendChild(createHTMLmovie(item,isTrue));
       })  // stampa i primi 5 risultati
       
     }
   
   




const createHTMLmovie = (item,isTrue) => {
  

  

  const card = document.createElement('div');  /* <div class="card text-white m-5 item" style="width: 18rem; background-color: #353535; border: 5px #353535;"> */

    const {Title, Year, imdbID, Type, Poster} = item;
   card.className = 'grid-item card text-white m-5 item';
    card.className = 'card text-white m-5 item';
  

  console.log(Title);

  card.style.cssText = 'max-width: 18rem; background-color: #353535; border: 5px #353535;';
  
  const poster = document.createElement('img');  /*  <img id="movie-img" src="${Poster}" class="card-img-top p-3 rounded-3" alt="movie image from IMDB"></img> */
  poster.className = 'card-img-top p-3 rounded-3';
  poster.src = Poster;

  const card_body = document.createElement('div');   /* <div class="card-body"> */
  card_body.className = 'card-body';

  const title = document.createElement('h5');      /* <h5 id="movie-title"  class="card-title">${Title}</h5> */
  title.className = 'card-title';
  title.innerHTML = Title;

  const year = document.createElement('p');        /* <p  id="movie-summary" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */
  year.className = 'card-text';
  year.innerHTML = 'Plot non ce ma qualcosa ci va messo qui ...'; //boh qualcosa
//  </div>
  const ul = document.createElement('ul');      /* <ul class="list-group list-group-flush"> */
  ul.className = 'list-group list-group-flush';
  
  const plot = document.createElement('li');     /*  <li id="movie-description" class="list-group-item border-dark text-white" style="background-color: #353535;">${Year}</li> */
  plot.className = 'list-group-item border-dark text-white';
  plot.style.cssText = 'background-color: #353535;';
  plot.innerHTML = Year;

  const movieID = document.createElement('li');      /* <li id="movie-description" class="list-group-item border-dark text-white" style="background-color: #353535;">${imdbID}</li> */
  movieID.className = 'list-group-item border-dark text-white';
  movieID.style.cssText = 'background-color: #353535;';
  movieID.innerHTML = imdbID;
//  </ul>
  const button_body = document.createElement('div');  /* <div class="card-body"> */
  button_body.className = 'card-body';

  const a = document.createElement('a');    /* <a id="movie-link" href="plot.html?id=${imdbID}" class="btn btn-primary">Plot</a> */
  a.className = 'btn btn-dark';
  a.href = 'plot.html?id=' + imdbID; //passo id per la chiamata ajax
  a.innerHTML = 'Plot'; //will open a single page with the plot of the movie (( one central card))
//  </div>
//  </div>
 
  card_body.appendChild(title);
  card_body.appendChild(year);

  ul.appendChild(plot);
  ul.appendChild(movieID);

  button_body.appendChild(a);

  if(poster != 'N/A'){
     card.appendChild(poster);
  }else{
    const sub_img = document.createElement('p');
    sub_img.className = 'card-img-top p-3 rounded-3';
    sub_img.innerHTML = 'no poster';
  }
  
  card.appendChild(card_body);
  card.appendChild(ul);
  card.appendChild(button_body);

return card;
};


