import React from 'react';
import './component.css'
import FulfilledCheckButton from './FulFilledCheck.js'
import FulfilledNone from './FulfilledNone.js'


// This is the gray orderlist in fulfilled page

class FulfilledOrderlist extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <div>
                {
                    (this.props.children.location.state.orders.length > 0) ?
                
                    this.props.children.location.state.orders.map((order) => (
                        <div className=" container--orderlist fulfilled">
                            <div className="container--basicinfo">
                                <p>Order ID: {order._id}</p>
                                <p>Customer ID: {order.customer}</p>
                                <p>Order Create Time: <br /> {order.createTime.slice(0,10)} || {order.createTime.slice(11,19)}</p>
                                <p>Order Fulfilled Time: {order.updateTime.slice(0,10)}  ||  {order.updateTime.slice(11,19)}</p>
                                <p>Discount Applied: {order.discount ? 'Yes': 'No'}</p>
                            </div>
                            <div className="orderdetail">
                                {
                                    order.snacksList.map((singleSnack) => (
                                        <li>{singleSnack.snackName} x {singleSnack.qty}</li>
                                    ))
                                }
            
                            </div>
                            <div className='container--button'>
                                <FulfilledCheckButton className="fulfilledCheck">{order}</FulfilledCheckButton>
                            </div>
                        </div>
            
                    ))
                
                : <FulfilledNone></FulfilledNone>
                }
            </div>
  
        );
    }
}

export default FulfilledOrderlist;