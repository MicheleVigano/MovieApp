import {IM_BASE_URL, OM_BASE_URL} from "./config.js"


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
* chiamata api per una ricerca di un film con titolo su IMDB
* @param {indice array}  title_index indice dell'array movies in titles.json
*/

export const iMapplist = (title) => {
  // const title = json file array[title_index]  -->  "title" of the json file
  const url = IM_BASE_URL + title ;
  console.log(url);
  fetch(url)
  .then((response) => response.json())
  .then((results) => {
      const items = results.Search;
     printItems(items); //stampa i risultati della ricerca nelle card
  });
};

/**
* chiamata api per una ricerca di un film con titolo su OMDB
* @param {string} url La url da chiamar con la fetch
*/

export const oMapplist = (title) => {
    const url = OM_BASE_URL + "s=" + title +"&type=movie"; // s=titolo, type=movie per parody-------------------usa sta funz per testare
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
  
  const container = document.getElementById("cards-box");

  console.log(items);

  items.map((item) => {


       
        container.appendChild(createHTMLmovie(item));

    })
};


const createHTMLmovie = (item) => {
  const {Title, Year, imdbID, Type, Poster} = item;

  const card = document.createElement('div');  /* <div class="card text-white m-5" style="width: 18rem; background-color: #353535; border: 5px #353535;"> */
  card.className = 'card text-white m-5 item';
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

  if(poster != 'N/A'){ card.appendChild(poster);}
  
  card.appendChild(card_body);
  card.appendChild(ul);
  card.appendChild(button_body);

return card;
};


  

/* getElementbyID.innerHTML = `


 <div class="card text-white m-5 item" style="width: 18rem; background-color: #353535; border: 5px #353535;">
    <img id="movie-img" src="http://via.placeholder.com/300x442" class="card-img-top p-3 rounded-3" alt="movie image from IMDB">
    <div class="card-body">
      <h5 id="movie-title"  class="card-title placeholder-wave"><span class="placeholder col-7 placeholder-lg bg-light rounded-2">title</span></h5>
      <p  id="movie-summary" class="card-text placeholder-wave">
        <span class="placeholder col-12 placeholder-xs bg-light rounded-2">...</span>
        <span class="placeholder col-9 placeholder-xs bg-light rounded-2">...</span>
        <span class="placeholder col-4 placeholder-xs bg-light rounded-2">...</span>
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li id="movie-description" class="list-group-m-5 item border-dark text-white placeholder-wave" style="background-color: #353535;">
        <span class="placeholder col-6 bg-light rounded-2">year</span>
      </li>
    </ul>
    <div class="card-body">
      <a href="#" class="btn btn-dark">Summary</a>
    </div>
  </div>

`;
// document.querySelector(".items").appendChild(itemElement); */