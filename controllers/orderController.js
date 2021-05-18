const Order = require('../models/order');

// POST request for customer order create
exports.customerOrderCreatePost = function(req, res){
    const{customer, vendor, snacksList, totalPrice} = req.body;

    // create a new order
    const newOrder = new Order({
        customer,
        vendor,
        snacksList,
        totalPrice
    });

    // save new order's data
    newOrder.save(function(err, result){
        if(err){
            res.status(400).json({err});
        }
        else {
            res.status(200).json({message:"created a new order", result: result});

        }
    })   
}

// Get request for vendor to get the particular status' order list
exports.vendorOrderListGet = function(req, res){
    Order.find({vendor:req.params.vendorId, status:req.query.status}, function(err, orders){

        //if for perticular vendor, the order list for required status is an empty list, return error message
        if(orders.length == 0 ){
            res.status(404).send("Order is not found")
        }
        else{
           res.status(200).json({orders: orders})
        }
    })       
};

// POST request for vendor to update the status for a particular order
exports.orderChangePost = function(req, res){

    // check validation of the order id
    Order.findById(req.params.id, function(err, orderDetail){
        const{snacksList, status} = req.body;
        if(!orderDetail){
            res.status(404).send("order is not found!")
        }
        else{

            // update the snack list and order status for the given order id
            Order.findByIdAndUpdate(
                req.params.id,
                {snacksList, status},
                {new: true},
                function(err, changeOrderDetails){
                    if(err){
                        res.status(404).json({success: false, err})
                    }
                    else{
                        res.status(200).json({success: true, changeOrderDetails: changeOrderDetails})
                    }
                })    
        }
    })
}


/* url: http://localhost:5000/order?customer=:customerID&status=outstanding to get all outstanding orders */
// Get request for customer to get their order details
// exports.customerOrderListGet = function(req, res){
//     Order.find(req.query).populate("vendor").populate("customer").then((orders)=>{
//         //if for perticular vendor, the order list for required status is an empty list, return error message
//         if(orders.length == 0){
//             res.status(200).json({success : "Order is not found. You don't have any orders."})
//         }
//         else{
//            res.status(200).json({success: true, customerOrders: orders})
//         }
//     })       
// };

exports.customerOrderListGet = function(req, res){
    Order.find(req.query).populate("vendor").populate("customer").then((orders)=>{
        //if for perticular vendor, the order list for required status is an empty list, return error message
        res.status(200).json({customerOrders: orders})
    })       
};