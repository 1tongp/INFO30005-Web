import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';
import { Modal} from 'antd';

// It is the dark green button for filfilled order lists.



class FulfilledCheckButton extends React.Component{
    state = {
        modal1Visible: false,
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    render(){
        return (
            <>            
            <button className="fulfilledCheck" onClick={() => this.setModal1Visible(true)}>
            <CheckOutlined />
            </button>
            <Modal className='popup'
            centered
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            >
            <p>Order Fulfilled?</p>

          </Modal>
          </>

        )   
    }
}

export default FulfilledCheckButton;