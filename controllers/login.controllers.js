const db = require('../models');

const { login } = db;

// Here you can define your logic of api-endpoints

// get all the user login details through get api
const getAllUsersLogin = async (req, res) => {
  try {
    const loginuser = await login.findAll({});

    return res.status(200).json({ product: loginuser });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);

    // Fixed the response data
    return res.status(500).json({ err: 'error in getting data' });
  }
};

// post all the user login details through post api
const postuserlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userdata = await login.findOne({ where: { email, password } });

    if (userdata) {
      res.status(200).json({ message: 'Login successful', user: userdata });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {

  getAllUsersLogin,

  postuserlogin,

};
