const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const { Cases, Laboratory } = require("../../models");
const DOCUMENTS = 20;
const PROTOCOL_TYPE = {
  keyA: "Covid 19",
  keyB: "Fluenza",
  keyC: "Dengue",
  keyD: "No Sé",
};

const getData = async (uid) => {
  let data = [];
  
  // Random Users
  for (let i = 0; i < DOCUMENTS; i++) {
    let uid2 = faker.random.arrayElement(uid);
    data.push({
      protocol: faker.datatype.number({ min: 1000000, max: 9999999 }),
      protocol_type: faker.random.objectElement(PROTOCOL_TYPE, "value"),
      person: uid2,
      taken: faker.date.between(
        "2022-01-01T00:00:00.000Z",
        "2022-04-30T00:00:00.000Z"
      ),
      received: faker.date.between(
        "2022-01-01T00:00:00.000Z",
        "2022-04-30T00:00:00.000Z"
      ),
      processed: faker.date.between(
        "2022-01-01T00:00:00.000Z",
        "2022-04-30T00:00:00.000Z"
      ),
      validated: faker.date.between(
        "2022-01-01T00:00:00.000Z",
        "2022-04-30T00:00:00.000Z"
      ),
      resulted: faker.random.arrayElement(["No Detectable", "Detectable"]),
      resulted_type: faker.random.arrayElement([
        "1era Muestra",
        "2da Muestra",
        "3era Muestra",
      ]),
    });
  }

  return data;
};

const laboratorySeed = async (callback) => {
  let uid = [];
  const UID_CASES = await Cases.find();
  for (const value in UID_CASES) {
    uid.push(UID_CASES[value]._id.toString());
  }
  let data = await getData(uid);
  Laboratory.create(data, (err, result) => {
    if (err) throw err;
    console.log("Seeding " + Laboratory.modelName + " collection");
    callback();
  });
};

module.exports = laboratorySeed;
