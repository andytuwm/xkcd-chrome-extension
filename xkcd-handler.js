// New XHR object to get data from xkcd
var oReq = new XMLHttpRequest();
// Variables to store comic numbers to keep track of which is displayed.
var displayedComic = null;
var latestComic = null;
var comicSearch = null;
var comicTitle = null;
var currentUrl = "http://xkcd.com/";
var arraybind = document.querySelector('#array');
var hist = [];

// Retrieve history from chrome.storage.sync on start.
// Set saved history array for data binding.
chrome.storage.sync.get('browsed', function(array){
  hist = array.browsed;
  arraybind.historyList = hist;
  //console.log(arraybind.historyList);
  //console.log(hist);
});

// Initialize to most recent comic
// Specify json response type since xkcd stores comic info in json
oReq.responseType = "json";
oReq.onload = setup;
oReq.open("GET", "http://xkcd.com/info.0.json", true);
oReq.send();

// Eventlisteners for buttons
var first = document.getElementById("first");
var prev = document.getElementById("prev");
var rand = document.getElementById("random");
var next = document.getElementById("next");
var last = document.getElementById("last");
var image = document.getElementById("comic");
var search = document.getElementById("search");
var help = document.getElementById("explain");
var menuItemGetter = document.querySelector('#historyMenu');

first.onload = first.addEventListener("click", getFirst, false);
prev.onload = prev.addEventListener("click", getPrevious, false);
rand.onload = rand.addEventListener("click", getRandom, false);
next.onload = next.addEventListener("click", getNext, false);
last.onload = last.addEventListener("click", getLast, false);
image.onload = image.addEventListener("click", openComic, false);
search.onload = search.addEventListener("keyup", searchComic, false);
explain.onload = explain.addEventListener("click", openHelp, false);
menuItemGetter.onload = menuItemGetter.addEventListener("core-activate", restoreComic, false);

// Populates title and image, sets the current comic from the json response
function reqListener() {
  displayedComic = this.response.num;
  comicTitle = this.response.title;
  currentUrl = "http://xkcd.com/" + displayedComic;

  document.getElementById("comicTitle").innerHTML = this.response.title;
  document.getElementById("comicNumber").innerHTML = "#"+displayedComic;
  document.getElementById("comic").src = this.response.img;
  document.getElementById("comic").alt = comicTitle;
  document.getElementById("comic").title = this.response.alt;

  // Update history here (on load of comic) so that the comic that user closes
  // extension on will be saved too.
  update(hist);
}

//Set most recent comic and run reqListener()
function setup() {
  latestComic = this.response.num;
  var listener = reqListener.bind(this);
  listener();
  document.getElementById("end").dismiss;
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
  if (displayedComic != 1)
    setComic("http://xkcd.com/1/info.0.json");
  else
    document.getElementById("end").show();
}

// Get previous comic
function getPrevious() {
  if ( displayedComic - 1 >= 1 )
    setComic("http://xkcd.com/"+ (displayedComic - 1) + "/info.0.json");
  else
    document.getElementById("end").show();
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
  else
    document.getElementById("end").show();
}

// Get most recent comic
function getLast() {
  if(displayedComic != latestComic)
    setComic("http://xkcd.com/info.0.json");
  else
    document.getElementById("end").show();
}

// Opens a new tab to the page the comic is located at
function openComic() {
  chrome.tabs.create({ url: currentUrl, active: false });
}

// Makes a search query for the comic number specified
function searchComic() {
  if (window.event.keyCode === 13) {
    comicSearch = document.getElementById("input").committedValue;
    if(comicSearch.match(/[a-z]/i) || !comicSearch.match(/[0-9]+/)) {
      document.getElementById("badinput").show();
    }
    else if(comicSearch == displayedComic) {
      document.getElementById("already").show();
    }
    else if(comicSearch > 0 && comicSearch <= latestComic) {
      setComic("http://xkcd.com/" + comicSearch + "/info.0.json");
    }
    else {
      document.getElementById("badnum").show();
    }
    // Clear search text input field
    document.getElementById("input").value = "";
  }
}

// Opens a new tab to the corresponding comic's explainxkcd wiki page
function openHelp() {
  chrome.tabs.create({ url: "http://www.explainxkcd.com/wiki/index.php/"
  + displayedComic, active: false });
}

// Stores history of viewed comics as a queue of ten
function update(history) {
  var title = displayedComic + ": " + comicTitle;
  var stored = {com: displayedComic,disp: title};

  // Store history as a map of (comic number: displayed title).
  if( !historyContains(history, displayedComic)) {

    if(history.length < 10) {
      history.push(stored);
    } else {
      history.shift();
      history.push(stored);
    }
    arraybind.historyList = history;
    //console.log(history);

  } else {
    var index = findIndex(history, displayedComic);
    if (index > -1) {
      var el = history.splice( index, 1);
      history.push(el[0]);
      //console.log(history);
    } else {
      console.error('Error: Index should always be found if comic was found in history.')
    }
  }
  // Save history with chrome.storage.sync
  chrome.storage.sync.set({'browsed': history}, function() {
  //console.log("History saved.");
  });
}

function restoreComic() {
  // Grab index of menu item clicked
  comicIndex = menuItemGetter.selectedIndex;
  //console.log(comicIndex);
  // Grab stored comic number from history queue
  var comicNum = hist[comicIndex].com;
  //console.log(comicNum);
  setComic("http://xkcd.com/"+ comicNum + "/info.0.json");
}

// Check if comic num is already in history.
function historyContains(jsonArray, num) {
  for (var i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i].com == num) {
      return true;
    }
  }
  return false;
}

// Return index of the specified comic in history; if not found, return -1
function findIndex(jsonArray, num) {
  for (var i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i].com == num) {
      return i;
    }
  }
  return -1;
}