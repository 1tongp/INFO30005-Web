//import the functions will be used
import {useState, useEffect} from 'react'
import axios from '../API/axios';
import Menu from './Menu.js';
import '../ShoppingCart/styles.css';
import { Layout, message } from 'antd';
import '../loginPage/Login.css';
import HeaderCus from '../components/HeaderCus.js'


//function used to control the data after customer login 
function AfterLoginMain(props){
    console.log(props);
    const [snacks, setSnacks] = useState([]);
    const [customerId, setCustomer] = useState([]);

    useEffect(() => {
        //snackMenuGet
        if(props.location.state.customer){
            setCustomer(props.location.state.customer.id)
        }
        axios.get('/snack').then(response => {
            console.log(response)
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.position, props.location.state.vendor, props.location.state.customer]);



    //get the current order from the customer
    // const onOrder = () => {
    //     //orderListGet
    //     axios.get('/order?customer=' + props.location.state.customer.id).then(response =>{
    //     console.log(props);
    //     console.log(response);
    //     if(response.data){
    //         // props push the useful data
    //         props.history.push('/customer/order', {customerOrders: response.data.customerOrders});
    //     }
    //     else{
    //       message.error(response.data.error)
    //     }
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }

    return (
        <Layout>
            <HeaderCus data = {props}/>

            {/* return the snacks and customer details */}
            <Menu key='0' history = {props.history} snacks={snacks} customer={customerId} vendor={props.location.state.vendor.id} />
        </Layout>
    )
}

export default AfterLoginMain;