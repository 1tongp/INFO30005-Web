import React from 'react';
import './component.css'
import {StarFilled, StarOutlined} from '@ant-design/icons';

// This is the order detail component for finished orders page
class FinishedOrderDetail extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }
    render(){
        return <div className="container--orderdetail">
            <center><h3>ORDER DETAILS</h3></center>
            
            <div className="child--FinishedDetail"> 
                <li>Order Id: {this.props.children._id}</li>
                <li>Customer Id: {this.props.children.customer}</li>
                <li>{this.props.children.createTime.slice(0, 10)} {this.props.children.createTime.slice(11, 19)}</li>
            </div>
           <div className="cluster ">
               <div className="child--FinishedDetail">
                   {
                       this.props.children.snacksList.map((singleSnack) => (
                        <li>{singleSnack.snackName} x {singleSnack.qty} ${singleSnack.snackPrice}</li>
                       ))
                   }
                   <p className="font--discount">Discount Applied(or not)can't change currently without socket.io</p>
               </div>
               <div className="child--FinishedDetail">
                   <p className="font--totalprice">Total Price: ${this.props.children.totalPrice}</p>   
               </div>
           </div>
           <div className="child--FinishedDetail">
               <li>Fulfilled at: 00:00:00 am(can't change without socket.io)</li>
               <li>Picked up at: 00:00:00 am(can't change without socket.io)</li>
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