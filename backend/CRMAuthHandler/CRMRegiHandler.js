//registerHandler.js

const mongoose = require("mongoose");
require("../Model/CRMReg"); // Import the CrmRegi model

const User = mongoose.model("CRMReg");

// Registration handler
const registerUser = async (req, res) => {
  const { fname, sname, email, password } = req.body;
  try {
    await User.create({ fname, sname, email, password });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error" });
  }
};

module.exports = registerUser;
