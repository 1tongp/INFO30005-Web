import React from 'react';
import '../ShoppingCart/styles.css';
import './main.css';
import logo from '../images/logo.png';
import cart from '../images/landing.png'
import m from '../images/menu.png';
import click from '../images/click.png';
import discount from '../images/discount.png';
import { Layout, Button } from 'antd';
import {
    ShoppingOutlined,
    CopyrightOutlined,
    UserOutlined,
    MenuOutlined,
    ProfileOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function Main () {
    const onSkip = () => {
        props.history.push('/menupreview',{
            vendor: "6082092adf7e59001590d377"
        });  
    }
    
    return (
        <Layout>
            <Header className='header_container'>
                
                <img src={logo} className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>
                    
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <a href=''>Log In</a>
                                <a href=''>Sign Up</a>

                                {/* after log in */}

                                {/* <a href=''>Profile</a>
                                <a href=''>My Orders</a>
                                <a href=''>Log Out</a> */}

                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            
            <Content className=''>
                <img src={cart} className='main_img'/>
                <div className="col-menu">
                    <div className="col-img"><img src={m} /></div>
                    <div className="col-img"><img src={click} alt="" /></div>
                    <div className="col-img"><img src={discount} alt="" /></div>
                </div>

                <div className='section'>
                    <h1>FIND A VAN</h1>

                    <div className='button_container'>
                        <Button >
                            <UserOutlined className='main_btn'/>
                            Login and Order
                        </Button>
                        
                        <Button onClick={onSkip}>                          
                            View Menu without Login
                        </Button>
                    </div>

                </div>
                <div className="about">
                    <div className="about-card">
                        <h2 >ABOUT US</h2>
                        <br/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla pariatur! Laborum odit modi, sapiente ex soluta eum quos natus, optio architecto, porro ab qui corporis quas! Culpa, dolorem illum!</p>
                    </div>
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