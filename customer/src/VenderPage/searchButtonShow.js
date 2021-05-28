import React from 'react';
import './component.css'
import {ContainerOutlined} from '@ant-design/icons';
import { Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from '../API/axios.js';
import FinishedOrderDetail from './FinishedOrderDetail.js';
// It is the light green finish button for preparing order lists.

class DetailButton extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    state = {
        modal1Visible: true,
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    render(){
        return (
            <>
            <Modal className='detail-popup'
            centered
            closable={false}
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            okText={'Close'}
            width={600}
            footer={[
                <Button className='close-detail-btn' type='primary' onClick={() => this.setModal1Visible(false)}>
                    Close
                </Button>
            ]}
            >
                <FinishedOrderDetail>{this.props.children[1]}</FinishedOrderDetail>
          </Modal>
          </>
        )
    }
}

export default DetailButton;