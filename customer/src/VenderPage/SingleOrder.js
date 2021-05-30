import React from 'react';
import './component.css'
import CheckButton from './CheckButton.js'
import CountUp from '../components/CountUp.js';
import axios from '../API/axios.js';

class SingleOrder extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)

        this.state = {
            diff: "",
        }
    }

    // // socket.io 
    // // update each second
    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(), 1000
    //     );
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }

    // tick() {
    //     let now = new Date().getTime()
    //     let upd = Date.parse(this.props.children.updateTime)
    //     this.setState({ diff: ((now - upd) / 60000)})
    //     // console.log(this.state.diff)
    // }

    // onMarkOrder = () => {
    //     var statusToGo, discount
    //     var totalSum = this.props.children.totalPrice
    //     if (this.props.children.status === "outstanding") {
    //         statusToGo = "fulfilled"
    //         if (this.state.diff >15) {
    //             discount = true
    //             totalSum = totalSum * 0.8
    //         } else {
    //             discount = false
    //         }
    //         axios.post('/order/change/' + this.props.children._id, {
    //             discount: discount,
    //             status: statusToGo,
    //             totalPrice: totalSum
    //         }).then(response => {
    //             console.log(response);
    //             if (response.data.success) {
    //                 alert("Order has been uppdated")
    //                 this.setState({ editModalVisible: false });
    //             }
    //             else {
    //                 alert("Order updating errored!")
    //             }
    //         })
    //     } else if (this.props.children.status === "fulfilled") {
    //         statusToGo = "completed"
    //         axios.post('/order/change/' + this.props.children._id, {
    //             status: statusToGo
    //         }).then(response => {
    //             console.log(response);
    //             if (response.data.success) {
    //                 alert("Order has been uppdated")
    //                 this.setState({ editModalVisible: false });
    //             }
    //             else {
    //                 alert("Order updating errored!")
    //             }
    //         })

    //     }
    // }

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