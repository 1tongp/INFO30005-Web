import React from 'react';
import './component.css'
import { CheckOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from '../API/axios.js';
// It is the light green finish button for preparing order lists.

class CheckButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)

        this.state = {
            diff: "",
        }
    }

    state = {
        modal1Visible: false,
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let now = new Date().getTime()
        let upd = Date.parse(this.props.children.children.updateTime)
        this.setState({ diff: ((now - upd) / 60000) })
    }

    onMarkOrder = () => {
        var statusToGo, discount
        var totalSum = this.props.children.children.totalPrice
        statusToGo = "fulfilled"
        console.log(this.state.diff);
        if (this.state.diff > 15) {
            discount = true
            totalSum = totalSum * 0.8
        } else {
            discount = false
        }
        axios.post('/order/change/' + this.props.children.children._id, {
            discount: discount,
            status: statusToGo,
            totalPrice: totalSum
        }).then(response => {
            console.log(response);
            if (response.data.success) {
                alert('Order has been fulfilled, you can view this order in the Fulfilled section')
                this.setModal1Visible(false);
            }
            else {
                alert("Order updating errored!")
            }
        })

    }

    render() {
        return (
            <>
                <button className="check" onClick={() => this.setModal1Visible(true)}>
                    <CheckOutlined />
                </button>
                <Modal className='popup vendor-popup'
                    centered
                    closable={false}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false), this.onMarkOrder}
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