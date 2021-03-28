const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// mongoose.connect('mongodb://localhost:27017/todo', {
//   useNewUrlParser: true
// });
mongoose.connect('mongodb://db:27017/todo', {
   useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  res.status(error.httpStatusCode).json(error.responseMessage || "Internal Server Error");  
});

app.listen(3000,()=>{
    console.log("server runing in port:3000")
});