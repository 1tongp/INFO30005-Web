// import React, {useState}from 'react';
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import '../myOrderPage/MyOrder.css';
import { Layout, Button, notification, InputNumber, Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import CountUp from './CountUp.js';
import { Model } from 'mongoose';
import axios from '../API/axios.js';
// import {useHistory} from "react-router-dom";
const { Content } = Layout;
const { Meta } = Card;

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
            menu: [],
            order: [],
            editModalVisible: false,
            modalBody: <></>,
            diff: ""
        }
    }


    handleEditClose = () => this.setState([{ editModalVisible: false }]);
    handleEditShow = () => this.setState([{ editModalVisible: true }]);

    onChange = (index, event) => {
        let newArray = [...this.state.order];
        newArray[index] = event;
        this.setState({ order: newArray });
    }

    onOrderSubmit = () => {
        var submitOrder = []
        var sumPrice = 0;
        for (var i = 0; i < this.state.order.length; i++) {
            if (Number.isFinite(this.state.order[i])) {
                submitOrder.push({
                    "snackName": this.state.menu[i].snackName,
                    "qty": this.state.order[i],
                    "snackPrice": this.state.menu[i].snackPrice
                })
                sumPrice += this.state.menu[i].snackPrice * this.state.menu[i]
            }
        }

        if (submitOrder.length === 0) {
            this.setState({editModalVisible: false});
            alert("Please do not submit empty order")
        } else {
            console.log(this.props);
            axios.post('/order/create', {
                customer: this.props.order.customer._id,
                vendor: this.props.order.vendor._id, // will be changed in the future
                snacksList: submitOrder,
                totalPrice: sumPrice
            }).then(response => {
                console.log(response);
                if (response.data.message === "created a new order") {
                    // change the message print to a pop up page
                    alert("Order has been places! You can check your order and view previous orders in My Order page")
                    this.setState({editModalVisible: false});
                }
                else {
                    // change the message print to a pop up page
                    alert("Order placing errored!")
                }
            })
        }
    }

    tick() {
        let now = new Date().getTime()
        let upd = Date.parse(this.props.order.updateTime)
        this.setState({ diff: ((now - upd) / 60000) })
    }

    // update each second
    componentDidMount() {
        axios.get('/snack').then(response => {
            this.setState({ menu: response.data.snacks })
        })
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
        if (this.props.order.status === "outstanding") {
            return (
                <>  <div className='change-container'>
                    <div className='change-popup'>
                        <Modal.Header>
                            <Modal.Title>Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.menu.map((snack, index) => (
                                <Card cover={<img alt="example" src={snack.snackPhotoPath} />} style={{ marginBottom: "1vh" }} size={"small"} key={snack._id}>
                                    <Meta
                                        title={snack.snackName + "      $" + snack.snackPrice}
                                    />
                                    <InputNumber key={snack._id} min={0} defaultValue={0} onChange={e => this.onChange(index, e)} />
                                </Card>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.onOrderSubmit()}>
                                Update
                            </Button>
                            <Button onClick={() => this.handleEditClose()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
                </>

            )

        } else {
            return (
                <>  <div className='change-container'>
                    <div className='change-popup'>
                        <Modal.Header>
                            <Modal.Title>{"Your order id:" + this.props.order._id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>comment and rating</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.handleEditClose()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
                </>

            )

        }
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
