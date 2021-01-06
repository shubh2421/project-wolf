const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const {username,password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword,10)
  try{
    const response = await User.create({
      username,
      password
    })
      console.log('User created successfully ' , response)
  }catch(error){
    console.log(error)
    return res.json({ status: 'error'})
  }
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
