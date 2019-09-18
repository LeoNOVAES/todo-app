const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://db:27017/events', {
  useNewUrlParser: true
});
//mongoose.connect('mongodb://localhost:27017/events', {
    //useNewUrlParser: true
//});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000,()=>{
    console.log("rodando na 3000")
});