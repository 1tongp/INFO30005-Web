const Vendor = require('../models/vendor');

// Post request for vendor register
exports.vendorRegisterPost = function(req,res){
    const {name, password} = req.body;

    // check whether the current vendor name is registered before
    Vendor.findOne({name: name}).then((vendor) =>{
        if (vendor) {
            res.status(409).send("Name already registered!");
        }
        else{
            const newVendor = new Vendor({
                name,
                password
            });

            // save the new vendor's informtion in database
            newVendor.save(function(err, result){
                if(err){
                    res.status(400).json({err});
                } 
                else{
                    res.status(200).json({message:"vendor registered successfully", result});
                }
            })  
        }
    })
}


// Get request for vendor detail 
// check whether the given vendor exist based on its id
exports.vendorDetailGet = function (req, res){
    Vendor.findById(req.params.id, function(err, vendorDetail){
        if(vendorDetail){
            res.status(200).json({vendor: vendorDetail})
        }
        else{
            res.status(400).send("vendor is not found")
        }
    })
}


// Post request to set the vendor's park status
exports.vendorParkPost = function(req,res){
    
    Vendor.findById(req.params.id).then((vendor) =>{
        const{currentAddress, parked, readyForOrder} = req.body;

        // if vendor id not exist in database, return the error message
        if (!vendor) {
            res.status(409).send("vendor not exist!");
        }

        // if id for perticular vendor exist, based on the vendor's id to update the parking status and 
        // whether ready for order. the Geolocation and address of vendor can also be updated. 
        else{
            Vendor.findByIdAndUpdate(
                req.params.id,{
                    currentAddress,
                    parked,
                    readyForOrder,
                    location: {type: "Point", coordinates: req.body.location }
                },
                {new: true},
                function(err,updateVendor) {
                    if (err) {
                        res.status(404).json({err: err})
                    }
                    else {
                        res.status(200).json({updateVendor: updateVendor})
                    }
                })  
        }
    })
}