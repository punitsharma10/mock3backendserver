const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
 try {
  const { email, password } = req.body;



  const existingUser = await User.findOne({ email });

  if (existingUser) {

   return res.status(409).json({ message: "email already exists" });

  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();

  res.status(201).json({ message: "user created successfully" });

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};



exports.login = async (req, res) => {

 try {

  const { email, password } = req.body;

  const user = await User.findOne({ email });



  if (!user) {

   return res

    .status(401)

    .json({ message: "authentication failed: User not found" });

  }



  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {

   return res

    .status(401)

    .json({ message: "authentication failed: Invalid password" });

  }



  const token = jwt.sign({ userId: user._id }, "punit", { expiresIn: "1h" });

  res.json({ token });

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};

