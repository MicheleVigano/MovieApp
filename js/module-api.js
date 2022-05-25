const URL_LIST_TERMINATOR = "http://www.omdbapi.com/?apikey=ca90f062&t=terminator";

export const listTerminator = () => {
    fetch(URL_LIST_TERMINATOR)
    .then((response) => response.json())
    .then((results) => {
        const films = result.Search;
        console.log("films");
    });
};