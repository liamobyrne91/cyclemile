// JavaScript Document

window.onload = function () {
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;

    // Map

    var myOptions = {
        center: new google.maps.LatLng(35, -10),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    google.maps.visualRefresh = true;

    // Bicycle Layer

    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

};

start.addEventListener("click", function (event) {
    startTime = new Date();
});

function getLocation() {
    if (navigator.geolocation) {
        document.getElementById('start').disabled = true;
        document.getElementById('stop').disabled = false;
        navigator.geolocation.watchPosition(showPosition, showError, clearWatch, {
            enableHighAccuracy: true,
            maximumAge: 60000,
            timeout: 30000
        });
    } else {
        x.innerHTML = "Your browser does not support the geolocation API.";
    }
}

var flightPathCoordinates = [];
var lat1, lng1, first_check;
var image = '../images/logo_marker.png';
var marker = null;
var x = document.getElementById("info");

function showPosition(position) {

    // Distance Calculator

    distance = 0;
    if (!first_check) {
        lat1 = position.coords.latitude;
        lng1 = position.coords.longitude;
        first_check = true;
    } else {
        var distanceFrom = function (points) {
            var lat1 = points.lat1;
            var radianLat1 = lat1 * (Math.PI / 180);
            var lng1 = points.lng1;
            var radianLng1 = lng1 * (Math.PI / 180);
            var lat2 = points.lat2;
            var radianLat2 = lat2 * (Math.PI / 180);
            var lng2 = points.lng2;
            var radianLng2 = lng2 * (Math.PI / 180);
            var earth_radius = 3959;
            var diffLat = (radianLat1 - radianLat2);
            var diffLng = (radianLng1 - radianLng2);
            var sinLat = Math.sin(diffLat / 2);
            var sinLng = Math.sin(diffLng / 2);
            var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
            var distanc = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
            return distanc.toFixed(0);
        };
        distance = distanceFrom({
            "lat1": lat1,
                "lng1": lng1,
                "lat2": position.coords.latitude,
                "lng2": position.coords.longitude
        });
    }
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude +
        "<br>Accuracy: " + position.coords.accuracy +
        "<br>Altitude: " + position.coords.altitude +
        "<br>Altitude Accuracy: " + position.coords.altitudeAccuracy +
        "<br>Heading: " + position.coords.heading +
        "<br>Speed: " + position.coords.speed * 2.2369 + " (mph)" +
        "<br>Timestamp: " + new Date(position.timestamp).toLocaleString() +
        "<br>Distance Travelled: " + distance + " (miles)";

    latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    timestamp = new Date(position.timestamp).toLocaleString();

    // Custom Marker

    if (marker !== null) {
        marker.setPosition(latlon);
    } else {
        marker = new google.maps.Marker({
            position: latlon,
            map: map,
            icon: image,
            title: "You are here!"
        });
        infowindow = new google.maps.InfoWindow({
            content: "You are here!"
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        marker.setPosition(latlon);
        map.panTo(latlon);
        map.setZoom(16);
    }

    // Polyline Layer

    flightPathCoordinates.push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    var flightPath = new google.maps.Polyline({
        path: flightPathCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

// History Information Array

var historyInfo = localStorage.getItem("history");
if (!historyInfo) {
    historyInfo = [];
} else {
    historyInfo = JSON.parse(historyInfo);
}

function clearWatch(position) {
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    navigator.geolocation.clearWatch(position);
    endTime = new Date();

    // Duration Calculator

    var difference = endTime - startTime;
    var diffSeconds = difference / 1000;
    var HH = Math.floor(diffSeconds / 3600);
    var MM = (Math.floor(diffSeconds % 3600) / 60).toFixed();
    var duration = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);

    historyInfo.push("<li>You travelled " + distance + " mile(s) in " + duration + " on " + timestamp + "." + "</li>");

    localStorage.setItem("history", JSON.stringify(historyInfo));
}

// localStorage

if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("history") === null) {
        document.getElementById("history").innerHTML = "There are currently no records to display.";
    } else {
        document.getElementById('clear').disabled = false;
        for (var i = 0; i < historyInfo.length; i++) {
            document.getElementById("history").innerHTML += historyInfo[i];
        }
    }
} else {
    document.getElementById("history").innerHTML = "Your browser does not support the localStorage API.";
}
