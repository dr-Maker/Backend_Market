"use strict"

var Customer = require("../models/Customer");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../helpers/jwt");


async function getEmailCustomer(email){
    const customer = await Customer.find({email:email});
    return customer;
}

const get_customers = async (req, res) =>{
    res.status(200).send({message:"all customers"});
}

const create_customer = async (req, res)=>{
    var data = req.body;
    var emailRegister = [];
    data.email =  req.body.email.toLowerCase();
    // emailRegister = await Customer.find({email:data.email});
    emailRegister = await getEmailCustomer(data.email);
    console.log(emailRegister);

    if(emailRegister.length == 0){
        // no existe un cliente con ese correo 
       
        data.password ?  bcrypt.hash(data.password, null, null, async (err, hash)=>{
            if(hash){
                data.password = hash;
                var register = await Customer.create(data)
                res.status(200).send({message:"create Customers sussefull"})  
            }              
        })
        :  
        res.status(400).send({Error:"contraseña invalida"}) 
      
       

    }else{
        res.status(400).send({Error:"cliente ya existe"});
    }

    
}

const login_customer = async (req,res)=>{
    var emailRegister = [];
    var data = req.body;
    data.email = data.email.toLowerCase()
    emailRegister = await getEmailCustomer(data.email);
    if(emailRegister.length == 0){
        //correo usuario no esta registrado
        res.status(400).send({message:"correo y/o usuario invalidos"})

    }else{
        //registo correcto
        var customer = emailRegister[0];
        bcrypt.compare(data.password, customer.password, async (err, check)=>{
                if(check){

                    
                    customer.password = "***********";

                    res.status(200).send({data: customer, token:jwt.createToken(customer)})

                }else{
                    res.status(400).send({message:"correo y/o usuario invalidos"})
                }
        });
    }


}

module.exports = {
    create_customer,
    get_customers,
    login_customer
}