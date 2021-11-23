const bcrypt = require('bcrypt');

const saltIt = async (password) =>
  bcrypt.hash(password, await bcrypt.genSalt());

module.exports = { saltIt };
