'use strict'

var express = require('express');

var customerController = require("../controllers/CustomerController");

var api = express.Router();

api.get("/get_customers", customerController.get_customers); 
api.post("/create_costumer", customerController.create_customer);
api.post("/login_costumer", customerController.login_customer);

module.exports = api;