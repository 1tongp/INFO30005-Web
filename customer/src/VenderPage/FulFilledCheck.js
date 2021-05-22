import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';
import { Modal} from 'antd';
import axios from '../API/axios.js';
// It is the dark green button for filfilled order lists.



class FulfilledCheckButton extends React.Component{
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

    onConfirm = () =>{
        axios.post('/order/change/' + this.props.children._id, {snacksList: this.props.children.snacksList, status: "finished"}).then(
            response =>{
                console.log(response);
                alert('Order has been picked up, you can view this order in the Finished Order section');
            }
        )
    }

    render(){
        return (
            <>            
            <button className="fulfilledCheck" onClick={() => this.setModal1Visible(true)}>
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
            <p>Order Picked Up?</p>

          </Modal>
          </>

        )   
    }
}

export default FulfilledCheckButton;