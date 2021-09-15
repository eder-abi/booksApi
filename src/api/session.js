/* As a new user, I want to register to the application using username and password. */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Router } = require('express');
const router = Router();
const mongodb = require('./sources/mongodb');

// ** Sign Up
router.post("/signup", async (req, res) => {
  const userFound = await checkUser(req.body.username);
  if (userFound){
    console.log(`The user already exist.`);
    res.status(400).send("This user already exist.");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const pwdHashed = await bcrypt.hash(req.body.password, salt);

  const newUser = await mongodb.createUser(req.body.username, pwdHashed);
  if (newUser){
    res.send("Sign up OK, please login.");
  } else{
    res.status(400).send("Cannot create user.");
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  const userFound = await mongodb.getUser(req.body.username);
  const validPassword = await bcrypt.compare(req.body.password, userFound.hashedPassword);
  console.log("User found", userFound);
  if (!validPassword){
    res.status(400).send("Invalid user or password");
    return;
  }
  console.log(userFound.username);
  const token = jwt.sign({ user: userFound.username }, process.env.JWTKEY);
  
  res.send(token);  
});

async function checkUser(username){
  const userFound = await mongodb.getUser(username);
  return (userFound) ? true : false;
}

module.exports = router;
