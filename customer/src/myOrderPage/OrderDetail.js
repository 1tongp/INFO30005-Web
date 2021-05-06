import React, {useState} from 'react';
import './MyOrder.css';
import { Layout } from 'antd';
import {StarFilled, StarOutlined} from '@ant-design/icons';

const {Content } = Layout;

export default function OrderDetail(props){
    console.log(props);
    const snacks = props.order.snacksList.map(
        (singleSnack) => 
        <tr key={singleSnack.snackName}>
            <td>{singleSnack.snackName}</td> 
            <td>{singleSnack.qty}</td>
            <td>{singleSnack.qty * singleSnack.snackPrice}</td>
        </tr>);
    
    return (
        <Content className="content">
        <tr >                    
            <th >{props.order.createTime.slice(0,10)}</th>
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