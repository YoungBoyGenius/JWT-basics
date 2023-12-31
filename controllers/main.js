// check the username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose validation
  // joi
  // check in controller

  if (!username || !password) {
    throw new CustomAPIError(`please provide email & password`, 400);
  }

  // just for demo, usually provided by db
  const id = new Date().getDate();

  // try to keep payload small, for better user experience
  // just for demo, in production use long complex and unguessable string
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: `user created`, token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
