// New XHR object to get data from xkcd
var oReq = new XMLHttpRequest();
// Variables to store comic numbers to keep track of which is displayed.
var displayedComic = null;
var latestComic = null;
var comicSearch = null;
var currentUrl = "http://xkcd.com/";

// Eventlisteners for buttons
var first = document.getElementById("first");
var prev = document.getElementById("prev");
var rand = document.getElementById("random");
var next = document.getElementById("next");
var last = document.getElementById("last");
var image = document.getElementById("comic");
var search = document.getElementById("search");
first.onload = first.addEventListener("click", getFirst, false);
prev.onload = prev.addEventListener("click", getPrevious, false);
rand.onload = rand.addEventListener("click", getRandom, false);
next.onload = next.addEventListener("click", getNext, false);
last.onload = last.addEventListener("click", getLast, false);
image.onload = image.addEventListener("click", openComic, false);
search.onload = search.addEventListener("keyup", searchComic, false);

// Initialize to most recent comic
// Specify json response type since xkcd stores comic info in json
oReq.responseType = "json";
oReq.onload = setup;
oReq.open("GET", "http://xkcd.com/info.0.json", true);
oReq.send();

// Populates title and image, sets the current comic from the json response
function reqListener() {
  displayedComic = this.response.num;
  currentUrl = "http://xkcd.com/" + displayedComic;

  document.getElementById("comicTitle").innerHTML = this.response.title;
  document.getElementById("comicNumber").innerHTML = "#"+displayedComic;
  document.getElementById("comic").src = this.response.img;
  document.getElementById("comic").alt = this.response.title;
  document.getElementById("comic").title = this.response.alt;
}

//Set most recent comic and run reqListener()
function setup() {
  latestComic = this.response.num;
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

// Navigation functions
// Get first comic
function getFirst() {
  setComic("http://xkcd.com/1/info.0.json");
}

// Get previous comic
function getPrevious() {
  if ( displayedComic - 1 >= 1 )
    setComic("http://xkcd.com/"+ (displayedComic - 1) + "/info.0.json");
}

// Get random comic
function getRandom() {
  var randComic = Math.floor((Math.random() * latestComic) + 1);
  setComic("http://xkcd.com/"+ randComic + "/info.0.json");
}

// Get next comic
function getNext() {
  if(displayedComic + 1 <= latestComic)
    setComic("http://xkcd.com/"+ (displayedComic + 1) + "/info.0.json");
}

// Get most recent comic
function getLast() {
  setComic("http://xkcd.com/info.0.json");
}

// Opens a new tab to the page the comic is located at
function openComic() {
  chrome.tabs.create({ url: currentUrl, active: false });
}

// Makes a search query for the comic number specified
function searchComic() {
  if (window.event.keyCode === 13){
    comicSearch = document.getElementById("input").committedValue;
    if(comicSearch > 0 && comicSearch <= latestComic)
      setComic("http://xkcd.com/" + comicSearch + "/info.0.json");
    document.getElementById("input").value = "";
  }
}