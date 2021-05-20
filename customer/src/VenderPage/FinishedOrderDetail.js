import React from 'react';
import './component.css'
import {StarFilled, StarOutlined} from '@ant-design/icons';

// This is the order detail component for finished orders page
class FinishedOrderDetail extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        var children;
    }
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
                   <p className="font--discount">Discount Applied(or not)</p>
               </div>
               <div className="child--FinishedDetail">
                   <li>$00.00</li>
                   <li>$00.00</li>
                   <p className="font--totalprice">$00.00(total price)</p>   
               </div>
           </div>
           <div className="child--FinishedDetail">
               <li>Fulfilled at: 00:00:00 am</li>
               <li>Picked up at: 00:00:00 am</li>
           </div>
           <div className="cluster child--FinishedDetail ">
               <div>
                   <p>Service</p>
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />
               </div>
               <div>
                   <p>Food</p>
                   <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />

               </div>
           </div>
           <div className="child--FinishedDetail">
               <p>
                   Comments: No comments were made.
               </p>
           </div>
            
            
        </div>
               
                

            
    }
}

export default FinishedOrderDetail;