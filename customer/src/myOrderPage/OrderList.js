import React from 'react';
import './MyOrder.css';
import { Layout, Button } from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined, CopyrightOutlined} from '@ant-design/icons';
import '../ShoppingCart/styles.css';
import OrderDetail from './OrderDetail.js';
import {useHistory} from "react-router-dom";
import logo from '../images/logo.png';
const { Header, Footer, Content } = Layout;

// function to loop particular custmomer's orders
export default function OrderList(props){
    let history = useHistory();
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
                <img src={logo} alt = 'logo image' className='logo'/>                
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href='../'>HOME</a>
                        <Button onClick = {history.goBack} id='btnMenu'> MENU </Button>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
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