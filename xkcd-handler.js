// New XHR object to get data from xkcd
var oReq = new XMLHttpRequest();
// Variables to store comic numbers to keep track of which is displayed.
var displayedComic = null;
var currentComic = null;

// Eventlisteners for buttons TODO

// Initialize to most recent comic
// Specify json response type since xkcd stores comic info in json
oReq.responseType = "json";
oReq.onload = setup;
oReq.open("GET", "http://xkcd.com/info.0.json", true);
oReq.send();

// Populates title and image, sets the current comic from the json response
function reqListener() {
  document.getElementById("comicTitle").innerHTML = this.response.title;
  document.getElementById("comicNumber").innerHTML = "#"+this.response.num;
  document.getElementById("comic").src = this.response.img;
  document.getElementById("comic").alt = this.response.title;
  document.getElementById("comic").title = this.response.alt;

  displayedComic = this.response.num;
}

//Set most recent comic and run reqListener()
function setup() {
  currentComic = this.response.num;
  var listener = reqListener.bind(this);
  listener();
}

// Send HTTP request and retrieve info of the comic from specified url
function setComic(url) {
  var Req = new XMLHttpRequest();
  Req.responseType = "json";
  Req.onload = reqListener;
  Req.open("GET", url, true);
  Req.send();
}