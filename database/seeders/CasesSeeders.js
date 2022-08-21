const { faker } = require("@faker-js/faker");
const { Cases } = require("../../models");
const DOCUMENTS = 20;

const getData = () => {
  let data = [];

  // Random Users
  for (let i = 0; i < DOCUMENTS; i++) {
    data.push({
      name: faker.name.findName(),
      nationality: faker.address.country(),
      province: faker.address.county(),
      estate: faker.address.state(),
      location: faker.address.ordinalDirection(),
      street: faker.address.streetName(),
      apartament: faker.datatype.number({ min: 10, max: 999 }),
      postal_code: faker.address.zipCode("####"),
      age: faker.datatype.number({ min: 15, max: 90 }),
      birthday_date: faker.date.between(
        "1990-01-01T00:00:00.000Z",
        "2010-01-01T00:00:00.000Z"
      ),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber("+54 9 15# ### ###"),
      current_state: faker.random.arrayElement([
        "with covid 19",
        "without covid 19",
        "quarantine",
        "dead",
        "discarded"
      ]),
      current_state_type: faker.random.arrayElement(["Fast test", "PCR"]),
      triage: faker.random.arrayElement(["MODERATE", "CRITICAL", "LOW"]),
    });
  }

  return data;
};

const caseSeed = (callback) => {
  let data = getData();
  Cases.create(data, (err, result) => {
    if (err) throw err;
    console.log("Seeding " + Cases.modelName + " collection");
    callback();
  });
};

module.exports = caseSeed;
