'use strict';

const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname + "/client")));
app.use("/scripts", express.static(__dirname + "/node_modules"));
// app.use(bodyParser.urlencoded({extended: true}));

const routes = require("./server/config/routes.js")(app);

app.listen(8000, function(){
	console.log("Running on Port 8000");
})