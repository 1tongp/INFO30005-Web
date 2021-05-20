import React from 'react';
import './MyOrder.css';
import { Layout,Button } from 'antd';
import {StarFilled, StarOutlined} from '@ant-design/icons';
import CountUp from '../components/CountUp.js';
import axios from '../API/axios.js';
import {useHistory} from "react-router-dom";
const {Content } = Layout;

// line 25 createTime -> updateTime

export default function OrderDetail(props){
    let history = useHistory();
    console.log(props);
    const snacks = props.order.snacksList.map(
        (singleSnack) => 
        <tr key={singleSnack.snackName}>
            <td>{singleSnack.snackName}</td> 
            <td>{singleSnack.qty}</td>
            <td>{singleSnack.qty * singleSnack.snackPrice}</td>
        </tr>);
    const changeOrder = () =>{
        history.goBack();
        axios.post('/change/:id' + props.order.id, {snacksList : props.order.snacksList, status: "outstanding"}).then(response => {
            if(response.data.success){
                // using socket to implement, have not finish yet
            }

        })  
    }

    return (
        <Content className="content">
        <tr >                    
            <th >{props.order.createTime.slice(0,10)}</th>
            <CountUp updatedAt={props.order.createTime}/>
            <Button key='1'>Change Order</Button>

        </tr>
        <div className="flex">  
            <div className="flex--child">
            <table>
                <tr>
                    <td>Time:</td>
                    <td>{props.order.createTime.slice(11,19)}</td>
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

                {/* a function to fetch data? */}

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
    </Content>
    )
}