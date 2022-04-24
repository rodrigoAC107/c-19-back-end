require("dotenv").config();
require("../models/user");
const db_host = process.env.MONGODB_CNN;
const mongoose = require("mongoose");

const seeds = [require("./seeders/UsersSeeders")];
let seedsDone = 0;

// Make the connection
mongoose.connect(db_host, (err, res) => {
  if (err) throw "ERROR: connecting to Database. " + err;
  console.log("Mongoose connected to " + db_host);
  mongoose.connection.db.dropDatabase();
  seeds.forEach((seed) => {
    seed(next);
  });
});

const next = () => {
  seedsDone++;
  if (seedsDone === seeds.length) {
    mongoose.connection.close(function () {
      console.log(`Seeding Completed! (${seedsDone} seeds)`);
    });
  }
};
