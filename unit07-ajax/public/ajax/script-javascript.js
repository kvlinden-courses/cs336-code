"use strict";

window.onload = function() {
    for (let headingNode of document.getElementById("faqs").getElementsByTagName("h2")) {
        headingNode.onclick = toggleHeading;
    }
    function toggleHeading() {
        if (this.getAttribute("class") == "minus") {
            this.removeAttribute("class", "minus");
        } else {
            this.setAttribute("class", "minus");
        }
        if (this.nextElementSibling.getAttribute("class") == "open") {
            this.nextElementSibling.removeAttribute("class", "open");
        } else {
            this.nextElementSibling.setAttribute("class", "open");
        }
    }

    let httpRequest;
    document.getElementById("fetch").onclick = function() {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', "/fetch?name=jQuery-AJAX");
        httpRequest.send();
        console.log("XMLHttpRequest request sent...");
    }
    function alertContents() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    console.log("XMLHttpRequest request succeeded...");
                    let response = JSON.parse(httpRequest.responseText);
                    document.getElementById("fetch").nextElementSibling.innerHTML = "<p>" + response.content + "</p>";
                    if (document.getElementById("fetch").getAttribute("class") != "minus") {
                        document.getElementById("fetch").setAttribute("class", "minus");
                        document.getElementById("fetch").nextElementSibling.setAttribute("class", "open");
                    } else {
                        document.getElementById("fetch").removeAttribute("class", "minus");
                        document.getElementById("fetch").nextElementSibling.removeAttribute("class", "open");
                    }
                } else {
                    console.log("XMLHttpRequest request failed...");
                }
            }
        }
        catch (e) {
            console.log("XMLHttpRequest result failed..." + e);
        }
    }
}
