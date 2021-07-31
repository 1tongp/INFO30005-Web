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
            <div className="Vendorcluster">
                <li>Order Id:</li>
                <li> {this.props.children._id}</li>
            </div>

            <div className="Vendorcluster">
                <li>Customer Id:</li>
                <li> {this.props.children.customer}</li>
            </div>

            <div className="Vendorcluster">
                <li>Customer Given Name:</li>
                <li> {this.props.children.customerName}</li>
            </div>

            <div className="Vendorcluster">
                <li>Order Create Time:</li>
                <li>{this.props.children.createTime.slice(0, 10)} {this.props.children.createTime.slice(11, 19)}</li>
            </div>

            <div className="Vendorcluster">
                <li>Order Fulfilled Time:</li>
                <li>{this.props.children.updateTime.slice(0, 10)} {this.props.children.updateTime.slice(11, 19)}</li>
               
            </div>

            <div className="Vendorcluster">
                <li><p className="font--discount">{(this.props.children.discount) ? "Discount Applied" : "No Discount Applied"}</p></li>
                <li></li>
               
            </div>         
                      
            <div className="cluster ">           
                <p>
                {
                    this.props.children.snacksList.map((singleSnack) => (
                        <li>{singleSnack.snackName} x {singleSnack.qty} ${singleSnack.snackPrice}</li>
                    ))
                }
                </p>
                <p className="font--totalprice">Total Price: ${this.props.children.totalPrice}</p>
            </div>
            <div className='feedback'>
                <p>
                   Service Rating: {(this.props.children.ratings) ? this.props.children.ratings : "No Ratings"} 
                   <br />
                   Comments: {(this.props.children.comments) ? this.props.children.comments : "No Comments"}
                </p>
               </div>
            
        </div>
    }
}

export default FinishedOrderDetail;