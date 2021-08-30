const { User } = require('../models');

 

async function resolveGetSingleUser(username) {

    console.log("\nResolver saved, parameter username: ", username);

    const foundUser = await User.findOne({ username: username });

    console.log("\n\nReturn from User.findOne()\n", foundUser);

    return foundUser;

};

 

const Query = {

    getSingleUser: (parent, { username = "bozo" }) => resolveGetSingleUser(username),

};

 

module.exports = { Query };

 