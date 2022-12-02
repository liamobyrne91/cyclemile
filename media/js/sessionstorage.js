// JavaScript Document

if (typeof (Storage) !== "undefined") {
    if (window.sessionStorage) {
        var fname = document.getElementById("fname");
        if (sessionStorage.fname) {
            fname.value = sessionStorage.fname;
        }
        fname.onkeyup = function () {
            sessionStorage.fname = this.value;
        };
        var sname = document.getElementById("sname");
        if (sessionStorage.sname) {
            sname.value = sessionStorage.sname;
        }
        sname.onkeyup = function () {
            sessionStorage.sname = this.value;
        };
        var email = document.getElementById("email");
        if (sessionStorage.email) {
            email.value = sessionStorage.email;
        }
        email.onkeyup = function () {
            sessionStorage.email = this.value;
        };
        var message = document.getElementById("message");
        if (sessionStorage.message) {
            message.value = sessionStorage.message;
        }
        message.onkeyup = function () {
            sessionStorage.message = this.value;
        };

        var clearStorage = function clearStorage() {
            sessionStorage.clear();
        };
    } else {
        alert("Your browser does not support the sessionStorage API.");
    }
}
