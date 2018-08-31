"use strict";

$(document).ready(function() {
    $("#faqs h2").click(
        function() {
            $(this).next("div").toggleClass("open");
            $(this).toggleClass("minus");
        }
    );
});
