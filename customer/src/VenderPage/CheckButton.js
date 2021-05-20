import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';
import { Modal } from 'antd';
import 'antd/dist/antd.css';

// It is the light green finish button for preparing order lists.

class CheckButton extends React.Component{
    state = {
        modal1Visible: false,
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
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
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            okText={'Confirm'}
            >
            <p>Order Prepared?</p>

          </Modal>
          </>
        )
            
    }
}

export default CheckButton;