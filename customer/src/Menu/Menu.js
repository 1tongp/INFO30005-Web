import React,{useState, useEffect} from 'react';
import '../ShoppingCart/styles.css';
import './Menu.css';
import { Layout, InputNumber, message,Card } from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {
    CopyrightOutlined,
    UserOutlined,
    LikeOutlined,
    MenuOutlined
} from '@ant-design/icons';
// import 'antd/dist/antd.css';
import axios from '../API/axios';

const { Header, Footer, Content } = Layout;
const {Meta} = Card;
function onChange(value) {
    console.log('changed', value);
  }

export default function Menu (props) {
    console.log(props);
    const [order, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [modalVisible, setModalVisible] = useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    // useEffect(() => {
    //     // orderListGet
    //     axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
    //         setOrders(response.data.customerOrders)
    //     })
    //     // snackMenuGet
    //     axios.get('/snack').then(response => {
    //         console.log(response);
    //         setSnacks(response.data.snacks)
    //     })
    // });

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrders(newArray);
    }

    window.onclick = function(e) { // checks were clicked
        let str = String(e.srcElement.className);
        console.log(str);
        // checks if user clicked the "x" icon on message
        let clickedClose = str.includes("anticon") || str == "[object SVGAnimatedString]";
        console.log(clickedClose); 
        // TODO: remove message

    }

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
        
        axios.post('/order/create', {
            customer: props.customer,
            vendor:"6082092adf7e59001590d377", // will be changed in the future
            snacksList: submitOrder,
            totalPrice: sumPrice
        }).then(response =>{
            console.log(response);
            if(response.data.message == "created a new order"){
                // change the message print to a pop up page
                message.success("Order has been places! You can check your order in your Shopping Cart and view previous orders in My Order page")
                setModalVisible(false)
            }
            else{
                // change the message print to a pop up page
                message.error("Order placing errored!")
            }
        })
    
    }
    return(

        <Layout>
                       
            <Content className='container'>
                <h1>MENU</h1>
                {props.snacks.map((snack, index) => (
                        <Card cover={< img className='card' alt={snack.snackName} src={snack.snackPhotoPath}/>} key={snack._id}>
                            <div className='card-content'>
                                <Meta title={snack.snackName + " :$" + snack.snackPrice} className='card-info'/>
                                <InputNumber key={snack._id} min={0} defaultValue={0}  onChange={e=>onChange(index, e)} className='input' />
                            </div>
                        </Card>
                    ))}

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