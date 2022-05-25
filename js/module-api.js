const URL_LIST_TERMINATOR = "http://www.omdbapi.com/?apikey=ca90f062&s=terminator";
const URL_TV_TERMINATOR = "http://www.omdbapi.com/?apikey=ca90f062&s=terminator&type=series"

export const listTerminator = () => {
    fetch(URL_LIST_TERMINATOR)
    .then((response) => response.json())
    .then((results) => {
        const films = results.Search;
        console.log(films);
    });
};

export const tvTerminator = () => {
    fetch(URL_TV_TERMINATOR)
    .then((response) => response.json())
    .then((results) => {
        const films = results.Search;
        console.log(films);
    });
};