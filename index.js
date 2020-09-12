const express = require("express");
const path = require('path');
const app = express();
const port =  process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/contact-form", (req, res)=>{
  res.sendFile(path.join(__dirname, 'contact-form.html'));
});


app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});
