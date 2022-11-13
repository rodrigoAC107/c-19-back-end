const { User } = require("../models")

const emailUnique = async ( email ) => {
    const emailDB = await User.findOne({email});

    if (emailDB) {
        throw Error(`This email ${email} is in use`);
    }
}

module.exports = {
    emailUnique,
}