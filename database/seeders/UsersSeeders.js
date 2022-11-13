const { faker } = require('@faker-js/faker');
const bcryptjs = require("bcryptjs");
const { User } = require("../../models");
const DOCUMENTS = 10;

const getData = () => {

  let data = [];
  let salt = bcryptjs.genSaltSync();
  let hash = bcryptjs.hashSync('41529284', salt);

  // Admin User
  data.push({
    email: "rodrigo@acosta.com",
    name: "Rodrigo Acosta",
    password: hash,
  });

  // Random Users
  for (let i = 0; i < DOCUMENTS; i++) {
    let userSalt = bcryptjs.genSaltSync();
    let userHash = bcryptjs.hashSync('41529284', userSalt);
    data.push({
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: userHash,
    });
  }

  return data;
}

const userSeed = (callback) => {
  let data = getData();
  User.create(data, (err, result) => {
    if (err) throw err;
    console.log("Seeding " + User.modelName + " collection");
    callback();
  });
};

module.exports = userSeed;
