import React from 'react';
import './component.css'
import CheckButton from './CheckButton.js'

class SingleOrder extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            // {
            //     this.props.children.children.location.state.orders.map((order) => (
            //         <div className="container--orderlist">


            //             <div className="container--basicinfo">
            //                 <p>ordernumber: 293y7458923y2</p>
            //                 <p>Name</p>
            //                 <p>00-00-0000</p>
            //                 <p>00:00</p>
            //             </div>
            //             <div className="orderdetail">
            //                 <li>num x Drink Name</li>
            //                 <li>num x Snack Name</li>
            //             </div>
            //             <div>
            //                 <p className="time">00:00:00</p>
            //                 <CheckButton />
            //             </div>

            //         </div>
            //     ))
            // }

            <div className="container--orderlist">


                <div className="container--basicinfo">
                    <p>Order ID: {this.props.children._id}</p>
                    <p>Customer ID: {this.props.children.customer}</p>
                    <p>{this.props.children.createTime.slice(0,10)}</p>
                    <p>{this.props.children.createTime.slice(11,19)}</p>
                </div>
                <div className="orderdetail">
                    {
                        this.props.children.snacksList.map((singleSnack) =>(
                            <li>{singleSnack.snackName} x {singleSnack.qty}</li>
                        ))
                    }
                </div>
                <div>
                    <p className="time">00:00:00</p>
                   <CheckButton />
                </div>

            </div>
        )

    }
}

export default SingleOrder;