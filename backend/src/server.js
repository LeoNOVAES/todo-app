const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const multiParty = require('connect-multiparty');

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect('mongodb://127.0.0.1:27017/events', {
    useNewUrlParser: true
});

io.on("connect", socket =>{
    console.log(socket.message);
});

app.use(cors());
app.use(multiParty());
app.use(express.json());
app.use(routes);

server.listen(3000,()=>{
    console.log("rodando na 3000")
});