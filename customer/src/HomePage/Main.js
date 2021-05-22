import logo from '../images/logo.png';
import cart from '../images/landing.png'
import m from '../images/menu.png';
import click from '../images/click.png';
import discount from '../images/discount.png';
import React from 'react';
import LeafMap from '../components/LeafMap.js';
import HeaderCus from '../components/HeaderCus.js';
import MyFooter from '../components/Footer.js';
import MapList from '../components/MapList.js';
import '../ShoppingCart/styles.css';
import './Main.css';
import { Layout, Button} from 'antd';
import {ShoppingOutlined, CopyrightOutlined, UserOutlined, MenuOutlined, ProfileOutlined} from '@ant-design/icons';
//import Footer from '../components/Footer.js';

const {Footer, Content } = Layout;

//this function will implement the customer page strcture (the map and choosing vans have not been implemented yet)
export default function CustomerMain (props) {
    console.log(props);

    // if customer want to view menu without loggin, the loggin step can be skip
    // since the map feature has not been placed yet, we assume that customer will order the snacks from a given vendor
    const toLogin = () =>{
        props.history.push('/customer/login')
    }
    const onSkip = () => {
        props.history.push('/customer/menupreview')
            // vendor: "6082092adf7e59001590d377")
    }
    
    return (
        <Layout>
            <HeaderCus data = {props}/>
            
            <div>
                <img src={cart} className='main_img'/>
                <div className="col-menu">
                    <div className="col-img"><img src={m} /></div>
                    <div className="col-img"><img src={click} alt="" /></div>
                    <div className="col-img"><img src={discount} alt="" /></div>
                </div>
               
                <div className='section'>
                    <br /><br /><br /><br />

                    <h2>FIND A VAN</h2>
                    <div className='map'>
                     <LeafMap data = {props}/>
                     <MapList data = {props}/>
                    
                        
                    </div>

                    {/* <div className='button_container'>
                        <Button onClick={toLogin} className = 'btn'>
                            <UserOutlined className='main_btn'/>
                            Login and Order
                        </Button> */}

                        {/* click the button to skip the login step*/} 
                        {/* <Button onClick={onSkip} className = 'btn'>     
                            <ProfileOutlined className='main_btn'/>                      
                            View Menu without Login
                        </Button>
                    </div> */}

                </div>
                <div className="about">
                    <div className="about-card">
                        <h2 >ABOUT US</h2>
                        <br/>
                        <div className='about-info'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla pariatur! Laborum odit modi, sapiente ex soluta eum quos natus, optio architecto, porro ab qui corporis quas! Culpa, dolorem illum!
                                </p>
                        </div>
                    </div>
                </div>     
            </div>  


            <MyFooter></MyFooter>   
      
     
        </Layout>
    )
}