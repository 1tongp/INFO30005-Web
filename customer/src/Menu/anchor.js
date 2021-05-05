import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import {Divider, Drawer, PageHeader} from 'antd';
// import 'antd/dist/antd.css';
import axios from '../API/axios';

import OrderList from '../myOrderPage/MyOrder.js';
import Menu from './Menu.js';
import '../ShoppingCart/styles.css';

function AfterLoginMain(props){
    const [drawerVisible, setDrawerVisible] = useState(false);
    const handleDrawerClose = () =>setDrawerVisible(false);
    const handleDrawerShow = () => setDrawerVisible(true);
    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // orderListGet
        axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
            setOrders(response.data.customerOrders)
        })
        // snackMenuGet
        axios.get('/snack').then(response => {
            console.log(response)
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.customer.id]);

    return (
        // <>
        //     <PageHeader title = {"Hi " + props.location.state.customer.givenName + ": Welcome to Snack in Van "}
        //         extra = {[<Menu key='0' snacks={snacks} customer={props.location.state.customer.id} />,
        //             <Button variant = "outline-primary" key="1"
        //                 onClick={handleDrawerShow}>See Orders</Button>
        //         ]}>
        //     </PageHeader>
        //     <Drawer visible = {drawerVisible}
        //         closable = {true}
        //         onClick = {handleDrawerClose}
        //         width = {"60vw"}>
        //         All Orders
        //         <Divider />
        //         <OrderList orders = {orders} />
        //     </Drawer>
        // </>
        
        <Menu key='0' snacks={snacks} customer={props.location.state.customer.id} />
    )
}

export default AfterLoginMain;