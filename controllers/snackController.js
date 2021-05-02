const Snack = require('../models/snack');

// POST request for snack create
exports.snackCreatePost = function(req, res){
    Snack.findOne({snackName:req.body.snackName}).then((snackExist) =>{
        const{snackName, snackPrice, snackDescription, snackPhotoPath} = req.body;

        // if the snack is already exist in database
        if(snackExist){
            res.status(409).send("This snack already exist!");
        }

        // otherwise, create a new snack 
        else{
            const snack = new Snack({
                snackName,
                snackPrice,
                snackDescription,
                snackPhotoPath,
            });

            // save the new snack's informtion in database
            snack.save((err, result) => {
                if(err){
                    res.status(400).json({err});
                } 
                else {
                    res.status(200).json({message:"snack create post", result});

                }
            })
        }
    })
}

// GET request of snack details for a particular snack 
exports.snackDetailGet = function (req, res){
    Snack.findById(req.params.id, function(err, snackDetail){
        if(snackDetail){
            res.status(200).json({snack: snackDetail})
        }
        else{
            res.status(400).send("snack description is not found")
        }
    })
}

// GET request of all snacks list 
exports.snackMenuGet = function(req, res){
    Snack.find().exec((err,snacks) => {
        if(err){
            res.status(400).json({err: err})
        }
        else{
            res.status(200).json({snacks: snacks})
        }
    })
};
