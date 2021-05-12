import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';

// It is the dark green button for filfilled order lists.

class FulfilledCheckButton extends React.Component{
    render(){
        return <button className="fulfilledCheck"><CheckOutlined /></button>
                      
    }
}

export default FulfilledCheckButton;