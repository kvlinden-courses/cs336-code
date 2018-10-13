/**
This script uses jQuery DOM access functions to set up the menu toggling
for the jQuery class example (cf. script-javascript.js).
 */
"use strict";

// Setup function to be run when the document is ready.
$(document).ready(function () {

    // Toggle h2's plus/minus bullet.
    $("#faqs h2").click(
        function () {
            $(this).next("div").toggleClass("open");
            $(this).toggleClass("minus");
        }
    );

    // Request web content (asynchronously) and handle result using promises.
    $("h2#fetch").click(
        function () {
            if ($(this).hasClass("minus")) {
                console.log('AJAX request issued...');
                // jQuery/AJAX deferred is similar to JavaScript promises, but we
                // cast it to a standard promise/A+ in this example.
                let jsPromise = Promise.resolve($.ajax({
                    url: "/fetch",
                    type: "GET",
                    data: {
                        name: "jQuery-AJAX"
                    }
                }));
                jsPromise.then(function (result) {
                    console.log('AJAX request succeeded...');
                    $("#fetch").next("div").html("<p>" + result.content + "</p>");
                }, function (xhr) {
                    console.log('AJAX request failed...');
                    $("#fetch").next("div").html("<p>" + xhr.statusText + "</p>");
                })
            }
        }
    );
});
