//import the functions will be used
import React, { useState, useEffect} from 'react';
import '../ShoppingCart/styles.css';
import './Menu.css';
import './menu-new.css';
import './menu-card.css';
import { Layout, InputNumber, message, BackTop} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import axios from '../API/axios';
import MyFooter from '../components/Footer.js';


//this function will implement the Menu page strcture
export default function Menu(props) {
    console.log(props);
    console.log(props.customer);
    const [order, setOrders] = useState([]);
    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrders(newArray);
    }

    const [name, setCustomerName] = useState('');
    useEffect(() => {
        axios.get('/customer/' + props.customer).then(response => {
            console.log(response);
            // console.log(response.data.customer.givenName);
            console.log(props);
            setCustomerName(response.data.customer.givenName);
        })
    })


    //record the action submit, which summary the order and price, then push the order to database
    const onSubmit = () => {
        if (props.customer) {
            var submitOrder = []
            var sumPrice = 0;
            for (var i = 0; i < order.length; i++) {
                if (Number.isFinite(order[i])) {
                    submitOrder.push({
                        "snackName": props.snacks[i].snackName,
                        "qty": order[i],
                        "snackPrice": props.snacks[i].snackPrice
                    })
                    sumPrice += props.snacks[i].snackPrice * order[i]
                }
            }

            if (submitOrder.length === 0) {
                alert("Please do not submit empty order")
            } else {
                axios.post('/order/create', {
                    customer: props.customer,
                    vendor: props.vendor, 
                    snacksList: submitOrder,
                    totalPrice: sumPrice,
                    customerName: name
                }).then(response => {
                    console.log(response);
                    if (response.data.message === "created a new order") {
                        
                        alert("Order has been places! You can check your order and view previous orders in My Order page")
                    }
                    else {
                        
                        alert("Order placing errored!")
                    }
                })
            }
        }
        else {
            console.log(props.customer);
            alert("Please login first to place the order");
            props.history.push('../');
        }
    }
    return (
        <div>
        <BackTop />
        <Layout>
            <div className="container--menu">
                <h1 classname="font--menu">MENU</h1>
                <div className="menu">
                    {props.snacks.map((snack, index) => (
                        <div className="menu-card">

                            <div className="card-image" style={{ backgroundImage: `url(${snack.snackPhotoPath})` }}></div>
                            <div className="card-info">
                                <div className="card-name">
                                    <h3>{snack.snackName}</h3>
                                </div>
                                <div className="cost-wrapper">
                                    <h5 className="cost">
                                        $ {snack.snackPrice}
                                    </h5>
                                </div>
                                <div className="description-wrapper">
                                    <p>{snack.snackDescription}</p>
                                </div>
                                <div className="card-btns">
                                    <InputNumber classname="input--number" key={snack._id} min={0} defaultValue={0} onChange={e => onChange(index, e)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* click the button and submit the order*/}
                <button className='place' onClick={onSubmit}>
                    PLACE ORDER
                    <LikeOutlined className='place_icon' />
                </button>
                <br /><br />

            </div>
            <MyFooter></MyFooter>
        </Layout>
        </div>
    )
}