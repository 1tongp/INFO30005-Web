import React from 'react';
import './component.css'
import FulfilledCheckButton from './FulFilledCheck.js'



// This is the gray orderlist in fulfilled page

class FulfilledOrderlist extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div className="cluster container--orderlist fulfilled">
            {
                this.props.children.location.state.orders.map((order) => (
                    <div className="cluster container--orderlist fulfilled">
                        <div className="container--basicinfo">
                            <p>Order ID: {order._id}</p>
                            <p>Customer ID: {order.customer}</p>
                            <p>{order.createTime.slice(0,10)}</p>
                            <p>{order.createTime.slice(11,19)}</p>
                        </div>
                        <div className="orderdetail">
                            {
                                order.snacksList.map((singleSnack) => (
                                    <li>{singleSnack.snackName} x {singleSnack.qty}</li>
                                ))
                            }

                        </div>
                        <div>
                            <p className="time">00:00:00</p>
                            <FulfilledCheckButton className="fulfilledCheck">{order}</FulfilledCheckButton>



                        </div>



                    </div>

                ))
            }
            </div>


        );
    }
}

export default FulfilledOrderlist;