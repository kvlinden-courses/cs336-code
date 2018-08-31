"use strict";

$(document).ready(function () {
    $("#faqs h2").click(
        function () {
            $(this).next("div").toggleClass("open");
            $(this).toggleClass("minus");
        }
    );
    $("h2#fetch").click(
        function () {
            if ($(this).hasClass("minus")) {
                console.log('AJAX request issued...');
                // jQuery/AJAX deferred is similar to JavaScript promises, but we
                // cast it to a standard promise/A+ in this example.
                let jsPromise = Promise.resolve($.ajax({
                    url: "/fetchh",
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
