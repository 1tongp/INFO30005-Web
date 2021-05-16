const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');

// POST request for customer register 
exports.customerRegisterPost = function(req,res){
    const{givenName, familyName,loginEmail,password} = req.body;
    Customer.findOne({loginEmail: loginEmail}).then((emailExist) =>{

        // for the case when email is already registered
        if(emailExist) {
            res.status(409).json({success: false, message : "This email has been registered!"});
        }

        // otherwise, create a new account for customer
        else{
            const newCustomer = new Customer({
                givenName,
                familyName,
                loginEmail,
                password
            });
            // bcrypt.getSalt(10, (err, salt) => {
            //     bcrypt.hash(newCustomer.password, salt, (err, hash) => {
            //         if (err) throw err;
            //         newCustomer.password = hash;
            //         newCustomer.save().then((customer) => {
            //             res.json({
            //                 customer:{
            //                     id: customer.id,
            //                     givenName: customer.givenName,
            //                     familyName: customer.familyName,
            //                     loginEmail: customer.loginEmail,
            //                     password: customer.password,
            //                 },
            //             })
            //         })
            //     })
            // })

            // save the new customer's informtion in database
            newCustomer.save(function(err, result){
                if(err){
                    res.status(400).json({err});
                } 
                else{
                    res.status(200).json({
                        success: true,
                        message:"customer registered successfully",
                        customer:{
                            id: newCustomer.id,
                            givenName: newCustomer.givenName,
                            familyName: newCustomer.familyName,
                            loginEmail: newCustomer.loginEmail,
                            password : newCustomer.password,
                        },
                    });
                }
            })
        }
    });
};

// Get request for customer detail 
exports.customerDetailGet = function (req, res){
    Customer.findById(req.params.id, function(err, customerDetail){

        //if detail for perticular customer exist, print the detail to customer
        if(customerDetail){
            res.status(200).json({customer: customerDetail})
        }
        else{
            res.status(400).send("customer is not found")
        }
    })
}

// Post request for customer to change their details
exports.customerChangeDetailsPost = function(req, res){
    Customer.findById(req.params.id, function(err, customerId){
        const{givenName, familyName, password} = req.body;

        // if customer id not exist in database, return the error message
        if(!customerId){
            res.status(404).send("customer is not found")
        }

        // if id for perticular customer exist, based on the customer's id to update the personal detail for customer
        // special case: email address cannot be updated.
        else{
            Customer.findByIdAndUpdate(
                req.params.id,
                {givenName, familyName, password},
                {new: true},
                function(err, changeDetails){
                    if(err){
                        res.status(404).json({err})
                    }
                    else{
                        res.status(200).json({changeDetails: changeDetails})
                    }
            })    
        }
    })
}

exports.customerLoginPost = function(req, res){
    const{loginEmail, password} = req.body;

    // Match customer
    Customer.findOne({
        loginEmail: loginEmail,
    }).then((customer) => {
        if(!customer){
            res.status(200).json({success: false, error: "Email not registered"});
        }
        else{
            if(password === customer.password){
                res.status(200).json({
                    success:true,
                    customer:{
                        id: customer.id,
                        givenName: customer.givenName,
                        familyName: customer.familyName,
                        loginEmail: customer.loginEmail,
                        password : customer.password,
                    },
                });
            }
            else{
                res.status(200).json({success: false, error:'password incorrect'});
            }      
        }
    })
}