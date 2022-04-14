const { Cases } = require("../models")

const emailUnique = async ( email ) => {
    const emailDB = await Cases.findOne({email});

    if (emailDB) {
        throw Error(`This email ${email} is in use`);
    }
}

module.exports = {
    emailUnique,
}