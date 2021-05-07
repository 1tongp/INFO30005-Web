//import the functions will be used
import React,{useState} from 'react';
import '../ShoppingCart/styles.css';
import './Menu.css';
import { Layout, InputNumber, Card } from 'antd';
import {Button} from 'react-bootstrap';
import {CopyrightOutlined, LikeOutlined} from '@ant-design/icons';
import axios from '../API/axios';

const { Footer, Content } = Layout;
const {Meta} = Card;

//this function will implement the Menu page strcture
export default function Menu (props) {
    console.log(props);
    const [order, setOrders] = useState([]);
    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrders(newArray);
    }

    //record the action submit, which summary the order and price, then push the order to database
    const onSubmit = () =>{
        var submitOrder = []
        var sumPrice = 0;
        for(var i = 0; i < order.length; i++){
            if(Number.isFinite(order[i])){
                submitOrder.push({
                    "snackName":props.snacks[i].snackName,
                    "qty":order[i],
                    "snackPrice":props.snacks[i].snackPrice
                })
                sumPrice += props.snacks[i].snackPrice * order[i]
            }
        }
        
        if (submitOrder.length === 0) {
            alert("Please do not submit empty order")
        } else {
            axios.post('/order/create', {
                customer: props.customer,
                vendor: "6094951d171c4dcfb88a596f", // will be changed in the future
                snacksList: submitOrder,
                totalPrice: sumPrice
            }).then(response => {
                console.log(response);
                if (response.data.message === "created a new order") {
                    // change the message print to a pop up page
                    alert("Order has been places! You can check your order and view previous orders in My Order page")
                }
                else {
                    // change the message print to a pop up page
                    alert("Order placing errored!")
                }
            })
        }

    
    }
    return(
        <Layout>                      
            <Content className='container'>
                <h1>MENU</h1>
                {/* loop each snack in the database and show them out as a menu, the customer can choose the amount they want to order */} 
                {props.snacks.map((snack, index) => (
                        <Card cover={< img className='card' alt={snack.snackName} src={snack.snackPhotoPath}/>} key={snack._id}>
                            <div className='card-content'>
                                <Meta title={snack.snackName + " :$" + snack.snackPrice} className='card-info'/>
                                <InputNumber key={snack._id} min={0} defaultValue={0}  onChange={e=>onChange(index, e)} className='input' />
                            </div>
                        </Card>
                    ))}

                {/* click the button and submit the order*/} 
                <Button className='place' onClick={onSubmit}>
                    PLACE ORDER
                    <LikeOutlined className='place_icon'/>
                </Button>
                <br /><br />

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