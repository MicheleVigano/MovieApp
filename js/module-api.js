import {IM_RAZZIE_URL, OM_BASE_URL} from "./config.js"

import myJSON from './titles.json' assert {type: 'json'};
import blockbuster from './blockbuster-titles.json' assert {type: 'json'};


// funzione che pulisce l'html 
export const clean = () => {

  const container = document.getElementById("cards-box");

  while (container.firstChild) {                      // svuota il div
    container.removeChild(container.firstChild);
  }
  const divider = document.createElement("hr");       // crea una linea
  divider.style.cssText = "box-shadow: 0rem -4px 10px #000000;";
  container.appendChild(divider);

  const span = document.createElement("span");       // call To Action --> scorri più risultati
  span.className = "mouse-wheel";
  const span_external = document.createElement("span");
  span_external.className = "mouse mx-auto m-2";
  span_external.appendChild(span);
  const cont = document.createElement("div");
  cont.className = "container";
  cont.appendChild(span_external);
  container.appendChild(cont);

  
};




export const search = (value,isTrue) => {

  const container = document.getElementById("cards-box");
  const subtitle = document.createElement("p");
  subtitle.className = "fs-2 text-center";
  subtitle.innerHTML = "Risultati per: " + value;
  container.appendChild(subtitle);
 oMapplist(value,isTrue);
};
    /* enter sto search */
    var input = document.getElementById("search");
    if (input) {
    input.addEventListener("keypress", function(event) {
      //let search_btn = document.getElementById("search-btn").href="#view-more";
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("enter").click();
       // search_btn.href = "#!";
      }
    
      
    });
}



/* cliccando viewmore sopra il footer */
export const explorelist = (isTrue) => {
    if(isTrue === 'explore') {
         for(let j = 4; j < 101; j++) {
          oMapplist(myJSON.movies[j].Title,isTrue);
         }
    }else{
      for(let k = 0; k < 15; k++) {
        oMapplist(blockbuster.movies[k].Title,isTrue);
        
      }
    }
};  





                               /**
                               * chiamata api per una ricerca di 5 film
                               * @param {indice array}  title_index indice dell'array movies in titles.json
                               */

export const indexlist = () => {
    
    for (let i = 0; i < 5; i++) {
      oMapplist(myJSON.movies[i].Title,i);
    }
};



                                                                                                                                                 /**
                                                                                                                                                 * chiamata api per una ricerca di un film con titolo su IMDB
                                                                                                                                                 * @param {indice array}  title_index indice dell'array movies in titles.json
                                                                                                                                                 */

export const razzielist = () => {
  // const title = json file array[title_index]  -->  "title" of the json file
  const isTrue = 'razzie';
  const url = IM_RAZZIE_URL ;
  fetch(url)
  .then((response) => response.json())
  .then((results) => {
      const items = results.results;
     
        printItems(items,isTrue); //stampa i risultati della ricerca razzie awards
      
  })
  .catch((error) => {
      console.log(error);
  });
  
};
                                                                                                                                                 /**
                                                                                                                                                 * chiamata api per una ricerca di un film con titolo su OMDB
                                                                                                                                                 * @param {string} url La url da chiamar con la fetch
                                                                                                                                                 */

export const oMapplist = (title,isTrue) => {
  let url;
  if(isTrue === 'plot'){
    url = OM_BASE_URL + "t=" + title +"&type=movie"; // t=titolo, con plot ecc..
    
  }else{
    url = OM_BASE_URL + "s=" + title +"&type=movie"; // s=titolo, type=movie 
  }

  if(isTrue === 'plot'){
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results;

            printplot(items,isTrue);
  });

}else{
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;
        
              if( typeof isTrue === 'number'){
                printIndex(items,isTrue);
              }
              else{
                printItems(items,isTrue);
        }
       
    });
}
};

                                                                                                                                                 /**
                                                                                                                                                 * ciclo l'array
                                                                                                                                                 * @param {array di movie} items esploro le proprietà che ci sono in ogni item
                                                                                                                                                 */



 const printIndex = (items,isTrue) => { // items è un array di oggetti, ciascuno con le proprietà che vogliamo inserire nell'html
  let bigContainer = "error";

  
  switch(isTrue) {
    case 0:
      bigContainer = document.getElementById('0');    break;
    case 1:
      bigContainer = document.getElementById('1');    break;
    case 2:
      bigContainer = document.getElementById('2');    break;
    case 3:
      bigContainer = document.getElementById('3');    break;
    case 4:
      bigContainer = document.getElementById('4');    break;
    default:
      console.log('errore');
  }
       
       
      items && items.slice(0, 1).map((item) => {  
         bigContainer.appendChild(createHTMLmovie(item,isTrue));
       })  // stampa i primi 5 risultati
       
     }
   
   
     

const printItems = (items,isTrue) => { // items è un array di oggetti, ciascuno con le proprietà che vogliamo inserire nell'html
 
    const container = document.getElementById("cards-box");

    if (isTrue === 'razzie') {
      items && items.slice(13,100).map((item) => {
        container.appendChild(createHTMLmovie(item,isTrue));
    }) // stampa tutti i risultati
    }

    if (isTrue === 'search') {
      items && items.map((item) => {
        container.appendChild(createHTMLmovie(item,isTrue));
    }) // stampa tutti i risultati
    }
    else{
    items && items.slice(0, 1).map((item) => {
        container.appendChild(createHTMLmovie(item,isTrue));
    }) // stampa 1 risultato
    }

};



const printplot = (item,isTrue) => {

  
 
      IMcreateHTMLmovie(item,isTrue);


};

const replacePath = (Titolo) =>{
  const newpath = 'plot.html?title='+Titolo;
  location.href = `./${newpath}`;
}
  



/* create card item */

const createHTMLmovie = (item,isTrue) => {
  let Titolo;
  let Anno;
  let ID;
  let Tipo;
  let Immagine;
  let Plot;
  if (isTrue === 'razzie') {
    
    Titolo = item.title;
    Anno = item.description;
    ID = item.id;
    Tipo = item.genres;
    Immagine = item.image;
    Plot = item.plot;
  }else{
    Titolo = item.Title;
    Anno = item.Year;
    ID = item.imdbID;
    Tipo = item.Type;
    Immagine = item.Poster;
  }
  
  const card = document.createElement('div');  /* <div class="card text-white m-5 item" style="width: 18rem; background-color: #353535; border: 5px #353535;"> */
  
  

   card.className = 'grid-item card text-white m-5 item';
  
  card.style.cssText = 'max-width: 18rem; background-color: #353535; border: 5px #353535;';
  
  const poster = document.createElement('img');  /*  <img id="movie-img" src="${Poster}" class="card-img-top p-3 rounded-3" alt="movie image from IMDB"></img> */
  poster.className = 'card-img-top p-3 rounded-3';
  poster.src = Immagine;

  const card_body = document.createElement('div');   /* <div class="card-body"> */
  card_body.className = 'card-body';

  const title = document.createElement('h5');      /* <h5 id="movie-title"  class="card-title">${Title}</h5> */
  title.className = 'card-title';
  title.innerHTML = Titolo;

  const type = document.createElement('p');        /* <p  id="movie-summary" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */
  type.className = 'card-text';
  type.innerHTML = 'Type:    '+Tipo; //boh qualcosa
//  </div>
  const ul = document.createElement('ul');      /* <ul class="list-group list-group-flush"> */
  ul.className = 'list-group list-group-flush';
  
  const year = document.createElement('li');     /*  <li id="movie-description" class="list-group-item border-dark text-white" style="background-color: #353535;">${Year}</li> */
  year.className = 'list-group-item border-dark text-white';
  year.style.cssText = 'background-color: #353535;';
  year.innerHTML = 'Year:    '+Anno;

  const movieID = document.createElement('li');      /* <li id="movie-description" class="list-group-item border-dark text-white" style="background-color: #353535;">${imdbID}</li> */
  movieID.className = 'list-group-item border-dark text-white';
  movieID.style.cssText = 'background-color: #353535;';
  movieID.innerHTML = 'imdbID:    '+ID;
//  </ul>
  const button_body = document.createElement('div');  /* <div class="card-body"> */
  button_body.className = 'card-body';

  const a = document.createElement('button');    /* <a id="movie-link" href="plot.html?id=${imdbID}" class="btn btn-primary">Plot</a> */
  a.className = 'btn btn-dark';
  a.onclick = () => { replacePath(Titolo); };
  a.innerHTML = 'Plot'; //will open a single page with the plot of the movie (( one central card))
//  </div>
//  </div>
 
  card_body.appendChild(title);
  // card_body.appendChild(year);
  if (isTrue === 'razzie') {
    const plot = document.createElement('p');        /* <p  id="movie-summary" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */
    plot.className = 'card-text';
    plot.innerHTML = 'Plot:    '+Plot; //boh qualcosa
    card_body.appendChild(plot);
  }

  ul.appendChild(year);
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


const IMcreateHTMLmovie = (item,isTrue) => {
  
 
    const {Title,Poster, Year, Runtime, Genre, Director, Writer, Actors, imdbRating, Type, image, Plot} = item;
    



    
    document.getElementById('_title').innerHTML = Title;

   

    document.getElementById('_movie_img').src = Poster;

   const p = document.getElementById('_plot');
   p.innerHTML = 'Plot: ';
   const span = document.createElement('span');
   span.className = 'text-white fs-5';
    span.innerHTML = Plot;

 const span1 = document.createElement('span');
 span1.className = 'text-white';
  span1.innerHTML = imdbRating;
 const span2 = document.createElement('span');
  span2.className = 'text-white';
  span2.innerHTML = Runtime;
  const span3 = document.createElement('span');
  span3.className = 'text-white';
  span3.innerHTML = Genre;
  const span4 = document.createElement('span');
  span4.className = 'text-white';
  span4.innerHTML = Director;
  const span5 = document.createElement('span');
  span5.className = 'text-white';
  span5.innerHTML = Writer;
  const span6 = document.createElement('span');
  span6.className = 'text-white';
  span6.innerHTML = Actors;
    /* grid */
  const p1 = document.getElementById('_imdbRating');
  p1.innerHTML = 'imdbRating: ' ;
  const p2 = document.getElementById('_runtime');
  p2.innerHTML = 'Runtime: ' ;
  const p3 = document.getElementById('_genre');
  p3.innerHTML = 'Genre: ' ;
  const p4 = document.getElementById('_director');
  p4.innerHTML = 'Director: ' ;
  const p5 = document.getElementById('_writer');
  p5.innerHTML = 'Writer: ' ;
  const p6 = document.getElementById('_actors');
  p6.innerHTML = 'Actors: ' ;

  p1.appendChild(span1);
  p2.appendChild(span2);
  p3.appendChild(span3);
  p4.appendChild(span4);
  p5.appendChild(span5);
  p6.appendChild(span6);
  p.appendChild(span);

  document.getElementById('se-on-int').href = 'https://www.google.com/search?q='  + Title;
  


};
