/*
 * MongoDB Demonstration Script
 *
 * Use this DB, defined at mlab.com, to run the code interactively.
 *
 *     mongo ds145667.mlab.com:45667/cs336 -u cs336 -p <dbpassword>
 *
 * This demo focuses on MongoDB representations and CRUD operations.
 *
 */

// db
// use cs336
// show collections

// Crud
db.soldiers.insertOne({name: "joe", rank: "captain", serial_number: 123456789});
db.soldiers.insertMany([{name: "jane", rank: "sargent", serial_number: 234567891},
                        {name: "ryan", rank: "private", serial_number: 345678912}]);

// cRud
db.soldiers.find({}).pretty();
db.soldiers.find({rank: "sargent"}).pretty();
db.soldiers.find({serial_number: { $gt: 200000000}}).pretty();

// crUd
db.soldiers.updateOne({name: "jane"}, { $set: {rank: "general"}});
db.soldiers.find({}).pretty();

// cruD
db.soldiers.deleteOne({name: "ryan"});
db.soldiers.find({}).pretty();

// 1-M relationships using embedding
db.soldiers.remove({});
db.soldiers.insertOne({
    name: "joe",
    rank: "captain",
    serial_number: 123456789,
    addresses: [
        {street: "1 Main Street", city: "Fort Meade"},
        {street: "1 High Street", city: "Tehran"}
        ]
});
db.soldiers.find({name: "joe"}, {addresses: 1})[0].addresses;

// 1-M relationships using document references
db.soldiers.remove({});
db.soldiers.insertMany([{_id: 1, name: "joe", rank: "captain", serial_number: 123456789, commands: [2, 3]},
                        {_id: 2, name: "jane", rank: "sargent", serial_number: 234567891},
                        {_id: 3, name: "ryan", rank: "private", serial_number: 345678912}]);
db.soldiers.find({name: "joe"}, {commands: 1})[0].commands.map(function(id) {return db.soldiers.findOne({_id: id});});

// M-M relationships (must be done) using document references
db.soldiers.remove({});
db.soldiers.insertMany([
    {_id: 1, name: "joe", rank: "captain", serial_number: 123456789},
    {_id: 2, name: "jane", rank: "sargent", serial_number: 234567891},
    {_id: 3, name: "ryan", rank: "private", serial_number: 345678912}
    ]);
db.commands.insertMany([{commander: 1, commandee: 2}, {commander: 1, commandee: 3}]);
db.commands.find({commander: 1}, {_id: 0, commandee: 1}).pretty();
// This commands finds the full records for the soldiers commanded by solder 1.
db.commands.find({commander: 1}, {_id: 0, commandee: 1}).commandee;


// Clean up
db.soldiers.remove({});
db.commands.remove({});
