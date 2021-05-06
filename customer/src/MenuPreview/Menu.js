import React,{useState, useEffect} from 'react';
import '../ShoppingCart/styles.css';
import './Menu.css';
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

export default function MenuPre (props) {
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

    return(

        <Layout>
                       
            <Content className='container'>
                <h1>MENU</h1>
                {props.snacks.map((snack, index) => (
                        <Card cover={<img alt={snack.snackName} src={snack.snackPhotoPath} width={400} height={300}/>} style={{marginBottom:"2vh"}} size={'small'} key={snack._id}>
                            <Meta title={snack.snackName + " :$" + snack.snackPrice} />
                        </Card>
                    ))}
                
                <Button className='place' href='/customer/login'>
                    Sign in and Place order
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