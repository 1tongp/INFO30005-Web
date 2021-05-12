import React from 'react';
import './component.css'
import {CheckOutlined} from '@ant-design/icons';

// It is the light green finish button for preparing order lists.

class CheckButton extends React.Component{
    render(){
        return <button className="check"><CheckOutlined /></button>
               
                

            
    }
}

export default CheckButton;