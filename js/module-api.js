import {IM_RAZZIE_URL, OM_BASE_URL} from "./config.js"

import myJSON from './titles.json' assert {type: 'json'};
import blockbuster from './blockbuster-titles.json' assert {type: 'json'};



/* cliccando viewmore sopra il footer */
export const explorelist = (isTrue) => {
  console.log(isTrue);
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
                                                                                                                                          console.log(IM_RAZZIE_URL)
                                                                                                                                          console.log(url);
                                                                                                                                          fetch(url)
                                                                                                                                          .then((response) => response.json())
                                                                                                                                          .then((results) => {
                                                                                                                                              const items = results.Search;
                                                                                                                                              console.log(items);
                                                                                                                                             
/* ----------------------------------------------------------------------------------------------------------------------------------  */        printItems(items,isTrue); //stampa i risultati della ricerca razzie awards
                                                                                                                                              
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
    fetch(url)
    .then((response) => response.json())
    .then((results) => {
        const items = results.Search;

       if(isTrue === 'plot'){
            printplot(items,isTrue);
        }
        else{
              if( typeof isTrue === 'number'){
                printIndex(items,isTrue);
              }
              else{
                printItems(items,isTrue);
        }
      }
       
    });
};

                                                                                                                                                 /**
                                                                                                                                                 * ciclo l'array
                                                                                                                                                 * @param {array di movie} items esploro le proprietà che ci sono in ogni item
                                                                                                                                                 */

let bigContainer = "error";

 const printIndex = (items,isTrue) => { // items è un array di oggetti, ciascuno con le proprietà che vogliamo inserire nell'html
  

  
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
  
    items && items.slice(0, 1).map((item) => {
        container.appendChild(createHTMLmovie(item,isTrue));
    }) // stampa tutti i risultati

};



const printplot = (items,isTrue) => {

  const container = document.getElementById("modal");
  
  items && items.slice(0, 1).map((item) => {
      container.appendChild(IMcreateHTMLmovie(item,isTrue));


});
}


/* create card item */

const createHTMLmovie = (item,isTrue) => {
  
  const {Title, Year, imdbID, Type, Poster} = item;
  
  const card = document.createElement('div');  /* <div class="card text-white m-5 item" style="width: 18rem; background-color: #353535; border: 5px #353535;"> */
  
   card.className = 'grid-item card text-white m-5 item';
  


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
  year.innerHTML = Type; //boh qualcosa
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
  a.href = 'index.html?id=' + Title; //passo id per la chiamata ajax
  a.innerHTML = 'Plot'; //will open a single page with the plot of the movie (( one central card))
//  </div>
//  </div>
 
  card_body.appendChild(title);
  // card_body.appendChild(year);

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




const IMcreateHTMLmovie = (item,isTrue) => {
  
 
    const {Title, description, Type, id, image, Plot} = item;

    const Year = description;
    const imdbID = id;
    const Poster = image;

    const modal = document.createElement('div');  
    card.className = 'modal-fullscreen-md-down modal-dialog modal-dialog-centered modal-dialog-scrollable';
  
    const modal_dialog = document.createElement('div');  
    poster.className = 'modal-dialog';

    const modal_content = document.createElement('div');  
    poster.className = 'modal-content';

    const modal_header = document.createElement('div'); 
    poster.className = 'modal-header';

    const poster = document.createElement('img'); 
    poster.className = 'card-img-top p-3 rounded-3';
    poster.src = Poster;
  
    const title = document.createElement('h5');     
    title.className = 'card-title';
    title.innerHTML = Title;
    
    const modal_body = document.createElement('div');  
    card_body.className = 'modal-body';


    const plot = document.createElement('p'); 
    year.innerHTML = Plot; 
//  </div>
  const modal_footer = document.createElement('div');    /* <div class="card-body"> */
  ul.className = 'modal-footer';

  
/*   const button = document.createElement('button');
  button.type = 'button';
  button.data-bs-dismiss = 'modal';
  button.className = 'btn btn-secondary';
  button.innerHTML = 'Close'; */

 
 
  modal_body.appendChild(plot);
  modal_header.appendChild(poster);
  modal_header.appendChild(title);
  modal_content.appendChild(modal_header);
  modal_content.appendChild(modal_body);
  //modal_content.appendChild(modal_footer);
  modal_dialog.appendChild(modal_content);
  modal.appendChild(modal_dialog);
  

return modal;
};

/* <div id="focus-modal" class="modal-fullscreen-md-down modal-dialog modal-dialog-centered modal-dialog-scrollable">
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <img id="movie-img" src="${Poster}" class="card-img-top p-3 rounded-3" alt="movie image from IMDB">
        <h5 class="modal-title" id="exampleModalLabel">${Title}</h5>
      </div>
      <div class="modal-body">
        <p>${Plot}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div> */