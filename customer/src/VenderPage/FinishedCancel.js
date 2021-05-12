import React from 'react';
import './component.css'
import {StarFilled, StarOutlined} from '@ant-design/icons';

// This is the order detail component for finished orders page
class FinishedOrderDetailCancel extends React.Component{
    render(){
        return <div className="container--orderdetail">
            <center><h3>ORDER DETAILS</h3></center>
            
            <div className="child--FinishedDetail"> 
                <li>00000000000</li>
                <li>Full Name</li>
                <li>DD-MM-YYYY</li>
                <li>00:00:00 am</li>
            </div>
           <div className="cluster ">
               <div className="child--FinishedDetail">
                   <li>num x Drink Name</li>
                   <li>num x Drink Name</li>
                   <p className="font--discount"></p>
               </div>
               <div className="child--FinishedDetail">
                   <li>$00.00</li>
                   <li>$00.00</li>
                   <p className="font--totalprice">$00.00(total price)</p>   
               </div>
           </div>

           <div className="child--FinishedDetail">
               <p className="font--cancel">ORDER CANCELLED</p>

           </div>
           
          
            
            
        </div>
               
                

            
    }
}

export default FinishedOrderDetailCancel;