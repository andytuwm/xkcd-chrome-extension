// New XHR object to get data from xkcd
var oreq = new XMLHttpRequest();
// Variables to store comic numbers to keep track of which is displayed.
var displayedComic = null;
var currentComic = null;

// Eventlisteners for buttons

// Initialize to most recent comic
