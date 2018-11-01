/*
 * MongoDB Demonstration Script
 *
 * Run this interactively on a cloud DB at mlab.com using:
 *
 *     mongo <db-url> -u <db-username> -p <db-password>
 *
 * This demo focuses on basic MongoDB representations and CRUD operations.
 *
 */

// Crud
db.soldiers.insertOne({name: "joe", rank: "captain", serial_number: 123456789});
db.soldiers.insertMany([
    {name: "clink", rank: "colonel", serial_number: 123456789},
    {name: "jane", rank: "sargent", serial_number: 234567891},
    {name: "ryan", rank: "private", serial_number: 345678912}
]);

// cRud
db.soldiers.find({}).pretty();
db.soldiers.find({rank: "sargent"}).pretty();
db.soldiers.find({serial_number: {$gt: 200000000}}).pretty();

// crUd
db.soldiers.updateOne({name: "jane"}, {$set: {rank: "general"}});
db.soldiers.find({}).pretty();

// cruD
db.soldiers.deleteOne({name: "ryan"});
db.soldiers.find({}).pretty();


// 1-M relationships using embedding (denormalized)
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

// 1-M relationships using document references (normalized)
db.soldiers.remove({});
db.soldiers.insertMany([
    {_id: 1, name: "joe", rank: "captain", serial_number: 123456789, commands: [3, 4]},
    {_id: 2, name: "clink", rank: "colonel", serial_number: 123456789},
    {_id: 3, name: "jane", rank: "sargent", serial_number: 234567891},
    {_id: 4, name: "ryan", rank: "private", serial_number: 345678912}
]);
db.soldiers.find({name: "joe"})[0].commands.map(function (id) {
    return db.soldiers.findOne({_id: id});
});

// M-M relationships using bi-directional document references (denormalized)
db.soldiers.remove({});
db.soldiers.insertMany([
    {_id: 1, name: "joe", rank: "captain", serial_number: 123456789, units: [1, 2]},
    {_id: 2, name: "clink", rank: "colonel", serial_number: 123456789, units: [2]},
    {_id: 3, name: "jane", rank: "sargent", serial_number: 234567891, units: [1]},
    {_id: 4, name: "ryan", rank: "private", serial_number: 345678912, units: [1]}
]);
db.units.insertMany([
    {_id: 1, name: "A team", soldiers: [1, 3, 4]},
    {_id: 2, name: "B team", soldiers: [1, 2]}
]);
db.soldiers.find({units: 1});
db.units.find({soldiers: 1});

// M-M relationships using a separate "join table" with document references (normalized)
db.soldiers.remove({});
db.units.remove({});
db.soldiers.insertMany([
    {_id: 1, name: "joe", rank: "captain", serial_number: 123456789},
    {_id: 2, name: "clink", rank: "colonel", serial_number: 123456789},
    {_id: 3, name: "jane", rank: "sargent", serial_number: 234567891},
    {_id: 4, name: "ryan", rank: "private", serial_number: 345678912}
]);
db.units.insertMany([
    {_id: 1, name: "A team"},
    {_id: 2, name: "B team"}
]);
db.memberships.insertMany([
    {unitID: 1, memberID: 1, role: "commander"},
    {unitID: 1, memberID: 3, role: "member"},
    {unitID: 1, memberID: 4, role: "member"},
    {unitID: 2, memberID: 1, role: "member"},
    {unitID: 2, memberID: 2, role: "commander"}
]);
db.memberships.find({memberID: 1}).map(function(x) {
    return db.soldiers.findOne({_id: x.unitID});
});

// Clean up
db.soldiers.drop();
db.units.drop();
db.memberships.drop();
