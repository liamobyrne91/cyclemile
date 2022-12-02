// JavaScript Document

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

var video = document.getElementById("video");

function handleVisibilityChange() {
    if (document[hidden]) {
        video.pause();
    } else {
        video.play();
    }
}

if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
    alert("Your browser does not support the Page Visibility API.");
} else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
