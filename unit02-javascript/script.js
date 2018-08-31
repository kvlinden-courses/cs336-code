/**
 * This set of scripts demonstrate some useful JavaScript constructs, including first-class 
 * objects and prototype-based, object-oriented programming. Run it either by loading index.html
 * into a Web browser or by using NodeJS on the commandline.
 */

// 1. ----------------------------------
// Looseness: optional/dynamic typing
var test;
test = 42;
test = "forty-two";
test = true;
console.log(test);

// 2. ----------------------------------
// Sameness
console.log(1 == "1");
console.log(1 === "1");
console.log(1 == true);
console.log(1 === true);

// 3. ----------------------------------
// Functions as first-class objects
function greetMe(names) {
    for (var name of names) {
        console.log("Hello, " + name + "!");
    }
}
var greetMe2 = function(names) {
    for (var name of names) {
        console.log("Hello, " + name + "!");
    }
}
greetMe(["world", "galaxy", "universe"]);
greetMe2(["world", "galaxy", "universe"]);

// 4. ----------------------------------
// Anonymous functions
function runThis(aFunction, args) {
    aFunction.call(null, args);
}
runThis(function(names) { for (var name of names) { console.log("Hello, " + name + "!"); }},
        ["world", "galaxy", "universe"]);

// 5. ----------------------------------
// A common use cases for anonymous functions.
//document.querySelector('html').onclick = function() {
//    alert('Ouch! Stop poking me!');
//}
var myList = [1,2,3].map(function(x) {return x*2;});
console.log(myList);

// 6. ----------------------------------
// Closures
function makeGreeter(salutation) {
    return function(names) {
        for (var name of names) {
            console.log(salutation + name + "!");
        }
    }
}
var friendlyGreeter = makeGreeter("Hello, ");
var unfriendlyGreeter = makeGreeter("Get lost, ");
friendlyGreeter(["world", "galaxy", "universe"]);
unfriendlyGreeter(["world", "galaxy", "universe"]);

// 7. ----------------------------------
// Strange closure example
function buildListOfFunctions(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result.push( function() {console.log("function " + i)} );
    }
    return result;
}
for (var f of buildListOfFunctions([1,2,3])) {
    f();
}

// 8. ----------------------------------
// Encapsulation
function Shape(x, y) {
    this.x = x;
    this.y = y;
}
Shape.prototype.move = function(newX, newY) {
    this.x = newX;
    this.y = newY;
}
var s1 = new Shape(0, 0);
console.log(s1);
var s2 = new Shape(1, 2);
s2.move(2, 3);
console.log(s2);

// 9. ----------------------------------
// Inheritance
function Rectangle(x, y, width, height) {
    Shape.call(this, x, y);
    this.width = width;
    this.height = height;
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.area = function() {
    return this.width * this.height;
}
var r1 = new Rectangle(1, 2, 1, 1);
console.log(r1);
console.log(r1.area());
r1.move(2, 3);
console.log(r1);

// 10. ----------------------------------
// Polymorphism
function Circle(x, y, radius) {
    Shape.call(this, x, y);
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.area = function() {
    return Math.PI * this.radius * this.radius;
}
var c1 = new Circle(1, 2, 1);
console.log(c1.area());

// 11. ----------------------------------
// Promises
let fs = require("fs");
let filename = "test.json";

function readFilePromise(filename){
    return new Promise(function (fulfill, reject){
        fs.readFile(filename, "utf8", function (err, res){
            if (err) reject(err);
            else fulfill(res);
        });
    });
}

readFilePromise(filename).then(
    (res) => console.log("Message: " + JSON.parse(res).message),
    (err) => console.log(err.toString())
);
