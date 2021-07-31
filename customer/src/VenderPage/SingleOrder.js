import React from 'react';
import './component.css'
import CheckButton from './CheckButton.js'
import CountUp from '../components/CountUp.js';
class SingleOrder extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)

        this.state = {
            diff: "",
        }
    }

    render() {
        return (
            <div className="container--orderlist">
                <div className="container--basicinfo">
                    <p>Order ID: {this.props.children._id}</p>
                    <p>Customer ID: {this.props.children.customer}</p>
                    <p>Customer Given Name: {this.props.children.customerName}</p>
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
                    <p className="time"><CountUp updatedAt={this.props.children.updateTime} /></p>
                    <CheckButton>{this.props}</CheckButton>
                </div>

            </div>
        )

    }
}

export default SingleOrder;