// import React, {useState}from 'react';
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import '../myOrderPage/MyOrder.css';
import { Layout, Button, notification, InputNumber, Card, Rate, Divider, Input } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import CountUp from './CountUp.js';
import { Model } from 'mongoose';
import axios from '../API/axios.js';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { TextArea } = Input;

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
        //console.log(this.props);
        this.state = {
            menu: [],
            order: [],
            editModalVisible: false,
            modalBody: <></>,
            diff: "",
            ratings: 0,
            comments: ""
        }
    }


    handleEditClose = () => this.setState([{ editModalVisible: false }]);
    handleEditShow = () => this.setState([{ editModalVisible: true }]);

    onChange = (index, event) => {
        let newArray = [...this.state.order];
        newArray[index] = event;
        this.setState({ order: newArray });
    }

    ratingsChange = (value) => {
        console.log(value)
        this.setState({ ratings: value })
    };

    commentChange = (value) => {
        this.setState({ comments: value })
    }

    // 1. close用不了 2. total price没更新

    onOrderSubmit = () => {
        var submitOrder = []
        var sumPrice = 0;
        console.log(sumPrice);
        for (var i = 0; i < this.state.order.length; i++) {
            if (Number.isFinite(this.state.order[i])) {
                submitOrder.push({
                    "snackName": this.state.menu[i].snackName,
                    "qty": this.state.order[i],
                    "snackPrice": this.state.menu[i].snackPrice
                })
                //sumPrice += this.state.menu[i].snackPrice * this.state.menu[i]
            }
        }

        if (submitOrder.length === 0) {
            this.setState({ editModalVisible: false });
            alert("Please do not submit empty order")
        } else {
            axios.post('/order/change/' + this.props.order._id, {
                // customer: this.props.order.customer._id,
                // vendor: this.props.order.vendor._id, // will be changed in the future
                snacksList: submitOrder,
                status: "outstanding",
                // totalPrice: sumPrice
            }).then(response => {
                console.log(response);
                if (response.data.success) {
                    // change the message print to a pop up page
                    alert("Order has been updated")
                    this.setState({ editModalVisible: false });
                }
                else {
                    // change the message print to a pop up page
                    alert("Order placing errored!")
                }
            })
        }
    }

    onCommentSubmit = () => {
        axios.post('/order/change/' + this.props.order._id, {
            // customer: this.props.order.customer._id,
            // vendor: this.props.order.vendor._id, // will be changed in the future
            comments: this.state.comments,
            ratings: this.state.ratings
            // totalPrice: sumPrice
        }).then(response => {
            console.log(response);
            if (response.data.success) {
                // change the message print to a pop up page
                alert("Order has been commetned")
                this.setState({ editModalVisible: false });
            }
            else {
                // change the message print to a pop up page
                alert("Order commenting errored!")
            }
        })
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
            if (this.props.order.ratings === null ) {
                this.setState({ editModalVisible: true })
            } else {
                notification.open({
                    message: 'Please do not comment again',
                    description: 'Enjoy your food, see you next time!',
                    duration: 3
                });
            }
            
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
                                // <Card cover={<img alt="example" src={snack.snackPhotoPath} />} style={{ marginBottom: "1vh" }} size={"small"} key={snack._id}>
                                <Card className='pop-menu' style={{ marginBottom: "1vh" }} size={"small"} key={snack._id}>
                                    <Meta
                                        title={snack.snackName + "      $" + snack.snackPrice}
                                    />
                                    <InputNumber key={snack._id} min={0} defaultValue={0} onChange={e => this.onChange(index, e)} />
                                </Card>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='primary-btn' variant="primary" onClick={() => this.onOrderSubmit()}>
                                Update
                            </button>
                            <button className='secondary-btn' variant="primary" onClick={() => this.handleEditClose()}>
                                Close
                            </button>
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
                            <Divider>Rate on Our Services</Divider>
                            <p>Ratings:</p><Rate onChange={(e) => this.ratingsChange(e)} />
                            <Divider></Divider>
                            <p>Comment</p><TextArea rows={4} onChange={(e) => this.commentChange(e.target.value)} />
                            {/* {this.state.ratings ? <span className="ant-rate-text">{desc[this.state.ratings -1]}</span> : ''} */}
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='primary-btn' variant="primary" onClick={() => this.onCommentSubmit()}>
                                Submit
                            </button>
                            <button className='secondary-btn' variant="primary" onClick={() => this.handleEditClose()}>
                                Close
                            </button>
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
                <div className="content">
                    <tr >
                        <th >{this.props.order.createTime.slice(0, 10)}</th>
                        {( this.props.order.status ==="outstanding") ?  <CountUp updatedAt={this.props.order.updateTime} />: "order has been " + this.props.order.status}
                        <Button key='1' onClick={() => this.handleEditOrder()}>Change Order/Comment</Button>

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



                            
                                    {this.props.order.snacksList.map(
                                        (singleSnack) =>
                                            <tr key={singleSnack.snackName}>
                                                <td>{singleSnack.snackName}</td>
                                                <td>{singleSnack.qty}</td>
                                                <td>{singleSnack.qty * singleSnack.snackPrice}</td>
                                            </tr>)}


                                <tr>
                                    <td></td>
                                    <td></td>
                                    
                                    <th>${this.props.order.totalPrice}</th>
                                    <th>(Total)</th>
                                </tr>

                            </table>
                        </div>

                        <div className="flex--child flex--column">
                            <div className="flex--column--child">
                                <tr>
                                    <th>Service: (1 is terrible, 5 is great!)</th>
                                    {/* <th>Food</th> */}
                                </tr>
                                <tr>
                                    <th>{this.props.order.ratings}</th>
                                </tr>

                                {/* <tr>
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
                                </tr> */}
                            </div>

                            <div>
                                <tr>
                                    <th>Comment:</th>
                                </tr>
                                <tr>
                                    <td>{this.props.order.comments}</td>
                                </tr>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <center>
                        <hr></hr>
                    </center>
                </div>

            </div>
        )
    }
}
