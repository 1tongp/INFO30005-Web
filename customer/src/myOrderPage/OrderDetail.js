import React, {useState} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Card, Modal} from 'antd';
import {ArrowsAltOutlined, EditOutlined} from '@ant-design/icons';

const {Meta} = Card;

export default function OrderDetail(props){
    console.log(props);
    const snacks = props.order.snacksList.map((singleSnack) => <li key={singleSnack.snackName}>{singleSnack.snackName} - qty: {singleSnack.qty}</li>);
    const [modalVisible, setModalVisible] = useState(false);
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            change orders within 10 mins, feature still in progress
        </Tooltip>
    );

    return (
        <div>
            <Modal visible={modalVisible} title={"Order Id: " + props.order._id}
            onOk={handleClose} onCancel={handleClose}>
            <p>Vendor Id: {props.order.vendor._id}
                <br/>Vendor Previous Address : {props.order.vendor.currentAddress}</p>
            <p></p>
            <p>{snacks}</p>
            </Modal>
            <Card style={{margin:"10px"}}
            actions={[<ArrowsAltOutlined onClick={handleShow} />, <OverlayTrigger 
                placement="bottom"
                delay={{show:250, hide:400}}
                overlay={renderTooltip}
            >
                <EditOutlined />
            </OverlayTrigger>]}>
            <Meta title={"Vendor name : " + props.order.vendor.name + "   -   " + props.order.status} />
        </Card>
        </div>
    )
}