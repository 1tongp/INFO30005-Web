import React,{useState, useEffect}from 'react';
import './MyOrder.css';
import { Layout, Button, Space} from 'antd';
import {ShoppingOutlined, CaretLeftOutlined, CopyrightOutlined} from '@ant-design/icons';
import { Rate } from 'antd';
import axios from '../API/axios';
import OrderDetail from './OrderDetail.js';

const { Header, Footer, Content } = Layout;

// function to loop particular custmomer's orders
function OrderList(props){
    console.log(props);
    const loopOrders = props.orders.map((singleOrder) => {
        return(
            <OrderDetail
            key = {singleOrder._id}
            order = {singleOrder} />
        )
    })
    return(
        <div>
            {loopOrders}
        </div>
    )
}

function MyOrder (props) {
    console.log(props);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const handleDrawerClose = () =>setDrawerVisible(false);
    const handleDrawerShow = () => setDrawerVisible(true);
    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);

    useEffect(() => {
        // orderListGet
        axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
            setOrders(response.data.customerOrders)
        })
        // snackMenuGet
        axios.get('/snack').then(response => {
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.customer.id]);

    return (
        <Layout>
            <Header>

            </Header>
            
            <Content >
                <br></br>
                <h1>MY ORDERS</h1>
                <br></br>


                <tr>                    
                    <th></th>
                </tr>
     
                <OrderList orders = {orders} />
                <br></br>

                <center>
                <hr></hr>
                </center>
           
     

            </Content>

            <Footer>
                <p>
                <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>

        </Layout>
    )
}

export default MyOrder;