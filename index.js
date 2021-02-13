var path = require('path');
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;
const address = process.env.PORT ? 'https://fast-bayou-41832.herokuapp.com' : `http://localhost:${port}`;

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

/////////in-browser view endpoint//////////
app.use(express.static(path.join(__dirname, "dist")));
app.use('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
