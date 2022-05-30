'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = Schema({

    names: {type: String, required: true},
    surname: {type: String, required: true},
    country: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile: {type: String, default: "default.png", required: true},
    fone: {type: String, required: true},
    gender: {type: String, required: true},
    d_birth: {type: String, required: false},
    rut: {type: String, required: true},
})

module.exports = mongoose.model("Customer",CustomerSchema);