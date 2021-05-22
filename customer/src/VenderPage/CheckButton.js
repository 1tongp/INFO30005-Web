import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from '../API/axios.js';
// It is the light green finish button for preparing order lists.

class CheckButton extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    state = {
        modal1Visible: false,
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    // toPrepar = () => {
    //     axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=outstanding').then(response =>{
    //       console.log(response);
    //       if(!response.data.success){
    //         this.props.children.history.push('/vendor/preparing/noorder', {vendor: this.propschildren.location.state.vendor})
    //       }
    //       else{
    //         this.props.children.history.push('/vendor/preparing', {vendor: this.props.children.location.state.vendor, orders: response.data.orders});
    //       }
    //     })
    //   }

    onConfirm = () =>{
        axios.post('/order/change/' + this.props.children.children._id, {snacksList: this.props.children.children.snacksList, status: "fulfilled"}).then(
            response =>{
                console.log(response);
                alert('Order has been fulfilled, you can view this order in the Fulfilled section')
                axios.get('/order/' + this.props.children.children.vendor+ '?status=outstanding').then(response2 =>{
                    console.log(response2);
                    // if(!response2.data.success){
                    //     this.props
                    // }
                })
                

            }
        )
    }
    render(){
        return (
            <>
            <button className="check" onClick={() => this.setModal1Visible(true)}>
            <CheckOutlined />
            </button>
            <Modal className='popup vendor-popup'
            centered
            closable={false}
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false), this.onConfirm}
            onCancel={() => this.setModal1Visible(false)}
            okText={'Confirm'}
            >
            <p>Order Fulfilled?</p>

          </Modal>
          </>
        )
            
    }
}

export default CheckButton;