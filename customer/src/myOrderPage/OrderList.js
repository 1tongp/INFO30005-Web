import React,{useState, useEffect}from 'react';
import './MyOrder.css';
import { Layout, Button, Space} from 'antd';
import {ShoppingOutlined, CaretLeftOutlined, CopyrightOutlined} from '@ant-design/icons';
import { Rate } from 'antd';
import axios from '../API/axios';
import OrderDetail from './OrderDetail.js';

const { Header, Footer, Content } = Layout;

// function to loop particular custmomer's orders
export default function OrderList(props){
    console.log(props);
    const loopOrders = props.location.state.customerOrders.map((singleOrder) => {
        return(
            <OrderDetail
            key = {singleOrder._id}
            order = {singleOrder} />
        )
    })
    return(
        <Layout>
            <Header>

            </Header>
            
            <Content>
                <br></br>
                <h1>MY ORDERS</h1>
                <br></br>


                <tr>                    
                    <th></th>
                </tr>
     
                <br></br>

                <center>
                <hr></hr>
                </center>
                <div>
                   {loopOrders}
                </div>
           
     

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