'use strict'

var express  = require("express");
var bodyparser = require("body-parser");
var mongoose  = require("mongoose");

var app = express();
var port = process.env.PORT || 3001;

var customer_route = require("./routes/Customer");

var bbdd = "react_store";

mongoose.connect(`mongodb://127.0.0.1:27017/${bbdd}`,{useNewUrlParser:true},(err, res)=>{
    if(err){
        console.error(err);
    }else{
        app.listen(port, ()=>{
            console.log(`BBDD ${bbdd} Corriendo correcamente  y sevridor corriendo en Puerto ${port}`);
        })        
    }
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb', extends:true}));

app.use("/api", customer_route);

module.exports = app;