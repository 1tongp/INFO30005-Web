import React, {useState} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Card, Modal} from 'antd';
import {ArrowsAltOutlined, EditOutlined} from '@ant-design/icons';
import './MyOrder.css';
// import 'antd/dist/antd.css';
import { Layout, Button, Space} from 'antd';
import {
    ShoppingOutlined,
    CaretLeftOutlined,
    CopyrightOutlined
} from '@ant-design/icons';
import { Rate } from 'antd';

const { Header, Footer, Content } = Layout;
const {Meta} = Card;

export default function OrderDetail(props){
    console.log(props);
    const snacks = props.order.snacksList.map(
        (singleSnack) => 
        <tr key={singleSnack.snackName}>
            <td>{singleSnack.snackName}</td> 
            <td>{singleSnack.qty}</td>
            <td>{singleSnack.qty * singleSnack.snackPrice}</td>
        </tr>);

    // 不太会写 还没写完
    function totalPrice(props){
        const sum = 0;
        const totalPrice = props.order.snacksList.map(
        (singleSnack) =><li key={singleSnack.snackName}>{singleSnack.snackName} - qty: {singleSnack.qty}</li>);

    }    
    const [modalVisible, setModalVisible] = useState(false);
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);
    

    return (
            <Content>
                <tr>                    
                    <th>{props.order.createTime.slice(0,10)}</th>
                </tr>

                <div className="row">
                    <div className="column">
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
                
                    <div className="column">
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
                        </tr>

                    </table>
                </div>

                <div className="column">

                </div>
                    <div>
                        <tr>
                            <th>Service</th>
                            <th>Food</th>
                        </tr>

                        <tr>
                            {/* 这个rating是假的，可以看看怎么改 同下*/}
                            <td><Rate disabled defaultValue={4} /></td>
                            <td><Rate disabled defaultValue={5} /></td>
                        </tr>
                    </div>
                
                    <div>
                        <tr>
                            <th>Comment:</th>
                        </tr>
                        <tr>
                            {/* comment因为model定义时候没有default value，并且订单都是outstanding
                            还没到rating 和comment那步，可以看看怎么改， 或者看看怎么加到readme里*/}
                            <td>comments</td>
                        </tr>
                    </div>

                </div>  

                <br></br>

                <center>
                <hr></hr>
                </center>
           
            </Content>

    )
}