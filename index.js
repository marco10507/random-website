const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port =  process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/cases';

const mongoose = require('mongoose');
mongoose.connect(mongoUrl,  {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoose database.");
});

const caseSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  description: {type: String, required: true},
});

const Case = mongoose.model('Case', caseSchema);


app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/contact-form", (req, res)=>{
  res.sendFile(path.join(__dirname, 'contact-form.html'));
});

app.post("/new-case", (req, res)=>{
  let caseData = Object.freeze({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    description : req.body.description,
  });

  const newCase = new Case(caseData);

  newCase.save((error, newCase)=>{
    if(error){
      console.log("new case could not saved!!");
    }

    res.redirect("/");
  });
});

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});
