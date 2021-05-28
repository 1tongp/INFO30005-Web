import React from 'react';
import './component.css'

// This is the order detail component for finished orders page
class FinishedOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return <div className="container--orderdetail">
            <center><h3>ORDER DETAILS</h3></center>
            <li>Order Id: {this.props.children._id}</li>
            <li>Customer Id: {this.props.children.customer}</li>
            <li>Order Create Time: {this.props.children.createTime.slice(0, 10)} {this.props.children.createTime.slice(11, 19)}</li>
            <li>Order Fulfilled Time: {this.props.children.updateTime.slice(0, 10)} {this.props.children.updateTime.slice(11, 19)}</li>
            <br />

            <div className="cluster ">
                <p className="font--totalprice">Orders: </p>
                {
                    this.props.children.snacksList.map((singleSnack) => (
                        <li>{singleSnack.snackName} x {singleSnack.qty} ${singleSnack.snackPrice}</li>
                    ))
                }
                <p className="font--discount">{(this.props.children.discount) ? "Discount Applied" : "No Discount Applied"}</p>
                <p className="font--totalprice">Total Price: ${this.props.children.totalPrice}</p>
            </div>
            <div>
                <p className="font--totalprice">FeedBack:</p>
                   Service: {(this.props.children.ratings) ? this.props.children.ratings : "No Ratings"} (1 is terrible, 5 is great!)
               </div>
            <p>
                Comments: {(this.props.children.comments) ? this.props.children.comments : "No Comments"}
            </p>
        </div>
    }
}

export default FinishedOrderDetail;