"use strict";

window.onload = function() {
    for (let headingNode of document.getElementById("faqs").getElementsByTagName("h2")) {
        headingNode.onclick = function () {
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
    }
}

