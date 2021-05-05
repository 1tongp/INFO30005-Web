import React,{useState, useEffect} from 'react';
import '../ShoppingCart/styles.css';
import './Menu.css';
import logo from '../images/logo.png';
import Cap from '../images/Cappuccino.jpg';
import LongB from '../images/Long Black.jpg';
import Latte from '../images/Latte.jpg';
import FlatW from '../images/Flat White.jpg';
import Big from '../images/Big Cake.jpg';
import Small from '../images/Small Cake.jpg';
import Fancy from '../images/Fancy Biscuit.jpg';
import Plain from '../images/Plain Biscuit.jpg';
import { Layout, InputNumber, message,Card } from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {
    ShoppingOutlined,
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

    const onSubmit = () =>{
        var submitOrder = []
        for(var i = 0; i < order.length; i++){
            if(Number.isFinite(order[i])){
                submitOrder.push({
                    "name":props.snacks[i].snackName,
                    "qty":order[i]
                })
            }
        }
        axios.post('/order/create', {
            customer: props.customer,
            vendor:"6082092adf7e59001590d377", // will be changed in the future
            snacks: submitOrder
        }).then(response =>{
            if(response.data.success){
                message.success("Order has been places!")
                setModalVisible(false)
            }
            else{
                message.error("Order placing errored!")
            }
        })
    
    }
    return(
        // <>
        //     <Button variant="primary"
        //         onClick = {handleModalShow}>See Menu</Button>
        //     <Modal show={modalVisible} onHide={handleModalClose}>
        //         <Modal.Header closeButton>
        //             <Modal.Title>Menu</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             {props.snacks.map((snack, index) => (
        //                 <Card cover={<img alt="example" src={snack.snackPhotoPath} />} style={{marginBottom:"2vh"}} size={'small'} key={snack._id}>
        //                     <Meta title={snack.snackName + "      $" + snack.snackPrice} />
        //                     <InputNumber key={snack._id} min={0} defaultValue={0} style={{marginLeft:"80%"}} onChange={e=>onChange(index, e)} />
        //                 </Card>
        //             ))}
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button variant="primary" onClick={onSubmit}>
        //                 Submit
        //             </Button>
        //         </Modal.Footer>
        //     </Modal>
        // </>

        <Layout>
            <Header className='header_container'>
                
                <img src={logo} className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>
                    
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <a href=''>Log In</a>
                                <a href=''>Sign Up</a>

                                {/* after log in */}

                                {/* <a href=''>Profile</a>
                                <a href=''>My Orders</a>
                                <a href=''>Log Out</a> */}

                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            
            <Content className='container'>
                <h1>MENU</h1>
                {props.snacks.map((snack, index) => (
                        <Card cover={<img alt="example" src={snack.snackPhotoPath} />} style={{marginBottom:"2vh"}} size={'small'} key={snack._id}>
                            <Meta title={snack.snackName + "      $" + snack.snackPrice} />
                            <InputNumber key={snack._id} min={0} defaultValue={0} style={{marginLeft:"80%"}} onChange={e=>onChange(index, e)} />
                        </Card>
                    ))}

                <Button className='place'>
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