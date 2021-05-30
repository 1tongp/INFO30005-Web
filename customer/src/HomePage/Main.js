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
import { Layout} from 'antd';



//this function will implement the customer page strcture (the map and choosing vans have not been implemented yet)
export default function CustomerMain (props) {
    
    return (
        <Layout>
            <HeaderCus data = {props}/>           
            <div>
                <img src={cart} className='main_img'/>
                <div className="col-menu">
                    <img src={m} />
                    <img src={click} alt="" />
                    <img src={discount} alt="" />
                </div>
               
                <div className='section'>
                    <br /><br /><br /><br />

                    <h2>FIND A VAN</h2>
                    <div className='map'>
                     <LeafMap data = {props}/>
                     <MapList data = {props}/>                      
                    </div>
                </div>
                <div className="about">
                    <div className="about-card">
                        <h2 >ABOUT US</h2>
                        <br/>
                        <div className='about-info'>
                            <p>Snacks in a Van runs a fleet of food vans that work as popup cafes. We operate in 
                                different locations everyday, click the map to find the nearest van to order!
                            </p>
                        </div>
                    </div>
                </div>     
            </div>  
            <MyFooter></MyFooter>        
        </Layout>
    )
}