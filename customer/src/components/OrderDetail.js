// import React, {useState}from 'react';
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import '../myOrderPage/MyOrder.css';
import { Layout, Button, notification } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import CountUp from './CountUp.js';
import { Model } from 'mongoose';
// import axios from '../API/axios.js';
// import {useHistory} from "react-router-dom";
const { Content } = Layout;

// // line 25 createTime -> updateTime

// export default function OrderDetail(props){
//     // let history = useHistory();
//     //console.log(props.order.snacksList);
// const snacks = props.order.snacksList.map(
//     (singleSnack) => 
//     <tr key={singleSnack.snackName}>
//         <td>{singleSnack.snackName}</td> 
//         <td>{singleSnack.qty}</td>
//         <td>{singleSnack.qty * singleSnack.snackPrice}</td>
//     </tr>);
//     // const changeOrder = () =>{
//     //     history.goBack();
//     //     axios.post('/change/:id' + props.order.id, {snacksList : props.order.snacksList, status: "outstanding"}).then(response => {
//     //         if(response.data.success){
//     //             // using socket to implement, have not finish yet
//     //         }

//     //     })  
//     // }

//     return (
{/* <Content className="content">
    <tr >
        <th >{props.order.createTime.slice(0, 10)}</th>
        <CountUp updatedAt={props.order.createTime} />
        <Button key='1'>Change Order</Button>

    </tr>
    <div className="flex">
        <div className="flex--child">
            <table>
                <tr>
                    <td>Time:</td>
                    <td>{props.order.createTime.slice(11, 19)}</td>
                </tr>
                <tr>
                    <td>Order Id:</td>
                    <td>{props.order._id}</td>
                </tr>
                <tr>
                    <td>Van Name:</td>
                    <td>{props.order.vendor.name}</td>
                </tr>
                <tr>
                    <td>Order Status:</td>
                    <td>{props.order.status}</td>
                </tr>

            </table>
        </div>

        <div className="flex--child centertable">
            <table >
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>$Price</th>
                </tr>

    

                {snacks}

                <tr>
                    <td></td>
                    <td></td>
                    <th>$Total Price</th>
                    <th>{props.order.totalPrice}</th>
                </tr>

            </table>
        </div>

        <div className="flex--child flex--column">
            <div className="flex--column--child">
                <tr>
                    <th>Service</th>
                    <th>Food</th>
                </tr>

                <tr>
                    <td>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarOutlined />
                    </td>
                    <td>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarOutlined />
                    </td>
                </tr>
            </div>

            <div>
                <tr>
                    <th>Comment:</th>
                </tr>
                <tr>
                    <td>comments</td>
                </tr>
            </div>
        </div>
    </div>
    <br></br>
    <center>
        <hr></hr>
    </center>
</Content> */}
//     )
// }

export default class OrderDetail extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            editModalVisible: false,
            modalBody: <></>,
            diff: ""
        }
    }


    handleEditClose = () => this.setState([{ editModalVisible: false }]);
    handleEditShow = () => this.setState([{ editModalVisible: true }]);

    tick() {
        let now = new Date().getTime()
        let upd = Date.parse(this.props.order.updateTime)
        this.setState({ diff: ((now - upd) / 60000) })
    }

    // update each second
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleEditOrder = () => {
        console.log(this.state.diff)
        if (this.props.order.status === "outstanding" && this.state.diff <= 10) {
            this.setState({ editModalVisible: true });
        }
        if (this.props.order.status === "fulfilled") {
            notification.open({
                message: 'Order is ready to be collected!',
                description: 'You cannot make any changes to a fulfilled order',
                duration: 3
            });
        } else if (this.props.order.status === "outstanding" && this.state.diff > 10) {
            notification.open({
                message: 'Order is being processed!',
                description: 'You can only updated your order within 10 min after placing order.',
                duration: 3
            });
        } else {
            console.log(this.props.order)
            this.setState({ editModalVisible: true })
        }
    }

    renderEditModelBody = () => {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{"Your order id:" + this.props.order._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>test</p>
                </Modal.Body>

            </>

        )
    }




    render() {
        return (
            <div>
                <Modal show={this.state.editModalVisible} onHide={() => this.handleEditClose()}>
                    {this.renderEditModelBody()}
                </Modal>
                <Content className="content">
                    <tr >
                        <th >{this.props.order.createTime.slice(0, 10)}</th>
                        <CountUp updatedAt={this.props.order.updateTime} />
                        <Button key='1' onClick={() => this.handleEditOrder()}>Change Order</Button>

                    </tr>
                    <div className="flex">
                        <div className="flex--child">
                            <table>
                                <tr>
                                    <td>Time:</td>
                                    <td>{this.props.order.createTime.slice(11, 19)}</td>
                                </tr>
                                <tr>
                                    <td>Order Id:</td>
                                    <td>{this.props.order._id}</td>
                                </tr>
                                <tr>
                                    <td>Van Name:</td>
                                    <td>{this.props.order.vendor.name}</td>
                                </tr>
                                <tr>
                                    <td>Order Status:</td>
                                    <td>{this.props.order.status}</td>
                                </tr>

                            </table>
                        </div>

                        <div className="flex--child centertable">
                            <table >
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>$Price</th>
                                </tr>

                                {/* a function to fetch data? */}

                                {/* {snacks}


                                <tr>
                                    <td></td>
                                    <td></td>
                                    <th>$Total Price</th>
                                    <th>{props.order.totalPrice}</th>
                                </tr> */}

                                {/* {renderOrder()} */}



                                <tr>
                                    {this.props.order.snacksList.map(
                                        (singleSnack) =>
                                            <tr key={singleSnack.snackName}>
                                                <td>{singleSnack.snackName}</td>
                                                <td>{singleSnack.qty}</td>
                                                <td>{singleSnack.qty * singleSnack.snackPrice}</td>
                                            </tr>)}

                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <th>$Total Price</th>
                                    <th>{this.props.order.totalPrice}</th>
                                </tr>

                            </table>
                        </div>

                        <div className="flex--child flex--column">
                            <div className="flex--column--child">
                                <tr>
                                    <th>Service</th>
                                    <th>Food</th>
                                </tr>

                                <tr>
                                    <td>
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarOutlined />
                                    </td>
                                    <td>
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarOutlined />
                                    </td>
                                </tr>
                            </div>

                            <div>
                                <tr>
                                    <th>Comment:</th>
                                </tr>
                                <tr>
                                    <td>comments</td>
                                </tr>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <center>
                        <hr></hr>
                    </center>
                </Content>

            </div>
        )
    }
}
