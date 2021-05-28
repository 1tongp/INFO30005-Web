import React from 'react';
import './component.css'
import CheckButton from './CheckButton.js'
import SingleOrder from './SingleOrder.js'
import PrepareNoOrder from './PrepareNoOrder.js'
import {
    CoffeeOutlined
} from '@ant-design/icons';
import { Empty } from 'antd';


// This is the white order list for preparing page

class Orderlist extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)

        this.state = {
            diff: "",
        }
    }

    // // socket.io 
    // // update each second
    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(), 1000
    //     );
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }

    // tick() {
    //     let now = new Date().getTime()
    //     let upd = Date.parse(this.props.order.updateTime)
    //     this.setState({ diff: ((now - upd) / 60000)})
    // }



    render(){
        return (
        <div className="cluster">
            {/* {
                (orders.length > 0) ? loopOrders
                : <Empty image = "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    description = {<span>Currently No Orders</span>} />
            } */}
            
            {
                (this.props.children.children.location.state.orders.length > 0) ? 
                this.props.children.children.location.state.orders.map((order) =>(
                    <SingleOrder>{order}</SingleOrder>
                ))
                : <PrepareNoOrder>{this.props}</PrepareNoOrder>
              
            }
            {/* <SingleOrder>{this.props}</SingleOrder> */}
            {/* {
                this.props.children.children.location.state.orders.map((order) =>(
                <div className="container--basicinfo">
                    <p>OrderNumber: {order._id}</p>
                    <p>Customer Id: {order.customer}</p>
                    <p>{order.createTime.slice(0,10)}</p>
                    <p>{order.createTime.slice(11,19)}</p>
                    <div className="orderdetail">
                
            </div>
                </div>
                ))
            } */}
            {/* <div className="container--basicinfo">
                <p>ordernumber: {this.props.order}</p>
                <p>Name</p>
                <p>00-00-0000</p>
                <p>00:00</p>
            </div>
            
            {/* <div className="orderdetail">
                    <li>num x Drink Name</li>
                    <li>num x Snack Name</li>
            </div> */}
{/* 
                <li>num x Drink Name</li>
                <li>num x Snack Name</li> */}
            {/* <div>
                <p className="time">00:00:00</p>
               <CheckButton />
                
            </div> */}
        </div>
        )
    }
}

export default Orderlist;