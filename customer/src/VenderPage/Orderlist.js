import React from 'react';
import './component.css'
import CheckButton from './CheckButton.js'




// This is the white order list for preparing page

class Orderlist extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
      }

    render(){
        return <div className="cluster container--orderlist">
            {
                this.props.children.children.location.state.orders.map((order) =>(
                <div className="container--basicinfo">
                    <p>OrderNumber: {order._id}</p>
                    <p>Customer Id: {order.customer}</p>
                    <p>{order.createTime.slice(0,10)}</p>
                    <p>{order.createTime.slice(11,19)}</p>
                </div>
                
                    
                ))
            }
            {/* <div className="container--basicinfo">
                <p>ordernumber: {this.props.order}</p>
                <p>Name</p>
                <p>00-00-0000</p>
                <p>00:00</p>
            </div> */}
            <div className="orderdetail">
                <li>num x Drink Name</li>
                <li>num x Snack Name</li>
                
                
            </div>
            <div className="orderdetail">
                    <li>num x Drink Name</li>
                    <li>num x Snack Name</li>
                
                
            </div>
            <div>
                <p className="time">00:00:00</p>
               <CheckButton />
                

            </div>

            

        </div>;
    }
}

export default Orderlist;
