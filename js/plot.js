
const querystring = window.location.search;
if (querystring) {
  const params = new URLSearchParams(querystring);
  const title = params.get("title");
  const poster = params.get("poster");
}