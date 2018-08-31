"use strict";

$(document).ready(function() {
    $("#accordion").accordion({
	event: "mouseover",
        collapsible: true,
        active: false,
	heightStyle: "content"
    });
} );
