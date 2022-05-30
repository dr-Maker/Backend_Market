'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "reactShop";


exports.createToken = (user)=>{

    var payload = {
        sub: user._id,
        names : user.names,
        surname : user.surname,
        email : user.email,
        iat : moment().unix(),
        exp : moment().add(1,"days").unix(),
    }

    return jwt.encode(payload, secret);
}