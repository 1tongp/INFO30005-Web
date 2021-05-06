import React,{useState, useEffect}from 'react';
import './MyOrder.css';
import { Layout, Button, Space} from 'antd';
import {ShoppingOutlined,  
        UserOutlined,
        MenuOutlined, 
        CopyrightOutlined
} from '@ant-design/icons';
import '../ShoppingCart/styles.css';
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
           <Header className='header_container'>
                
                <img src="logo.png" className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>
                    
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href='../'>HOME</a>
                        <a className='header_text' href='../customer'>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                {/* <a href=''>Log In</a>
                                <a href=''>Sign Up</a> */}

                                {/* after log in */}

                                <a href=''>Profile</a>
                                <a href=''>My Orders</a>
                                <a href=''>Log Out</a>

                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            
            <Content>
                <br></br>
                <h1>MY ORDERS</h1>
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