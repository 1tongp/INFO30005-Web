import React,{Component, useEffect, useState, message} from 'react';
import '../myOrderPage/MyOrder.css';
import '../ShoppingCart/styles.css';
import OrderDetail from './OrderDetail.js';
import axios from '../API/axios.js';
import URLs from '../url.js';
import io from 'socket.io-client';
import '../myOrderPage/myorderheader.css';
import { Empty } from 'antd';

// function to loop particular custmomer's orders
// export default function OrderListCom(props) {
//     const loopOrders = props.data.location.state.customerOrders.map((singleOrder) => {
//         return (
//             <OrderDetail
//                 key={singleOrder._id}
//                 order={singleOrder} />
//         )
//     })

//     return (
//         <div>
//             {loopOrders}
//         </div>
//     )


// }

function Orders(props) {
    const [orders, setOrders] = useState([])
    const id = props.id
    //console.log(id);

    useEffect(() => {
        console.log(id);
        console.log(props);
        // async function fetchData() {
        //     axios.get("/order?" + props.target + "=" + id + props.status).then(response => {
        //         console.log(response.data);
        //         if (response.data.success){
        //             setOrders(response.data.customerOrders)
        //         } else {
        //             setOrders([])
        //             message.info('No outstanding orders found');
        //         }
        //     }).catch(error =>{
        //         setOrders([]);
        //     })
        // }
        // fetchData()
        async function fetchData() {
            axios.get("/order?" + props.target + "=" + id).then(response => {
                if (response.data.success){
                    setOrders(response.data.customerOrders)
                } else {
                    setOrders([])
                    message.error(response.data.error);
                }
            }).catch(error =>{
                setOrders([]);
                console.log(error)
            })
        }
        fetchData()
    },[])

    //console.log(orders);

    const loopOrders = orders.map((singleOrder) => {
        return (
            <OrderDetail
                key={singleOrder._id}
                order={singleOrder} />
        )
    })

    return (
        <>
            {
                (orders.length > 0) ? loopOrders
                : <Empty image = "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    description = {<span>Currently No Orders</span>} />
            }
        </>
    )




}

export default class OrderListCom extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            orders: [],
        }
    }
    
    componentDidMount() {
        console.log(this.props);
        const socket = io(`${URLs.socketURL}/socket`, {transports: ['websocket']});
    
        socket.on("newOrder", (order) => {
            console.log("insertion detected at frontend");
            this.setState({ orders: [...this.state.orders, order]});
        });
    
        socket.on("updateOrder", (id) => {
            console.log("update detected at frontend");
            console.log(id);
        });
    
        socket.on("delectOrder", (id) => {
            console.log("deletion detected at frontend");
            const updatedOrders = this.state.orders.filter((order) => {
                return order._id !== id;
            });
            this.setState({orders: updatedOrders})
        });
    }

    render(){
        return (
            <div>
                <Orders id = {this.props.id} orders = {this.props.orders} target = {this.props.target} status = {this.props.status}/>
            </div>
        )
    }
    

}
