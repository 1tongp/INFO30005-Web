import React from 'react';
import './component.css'
import FulfilledCheckButton from './FulFilledCheck.js'



// This is the gray orderlist in fulfilled page

class FulfilledOrderlist extends React.Component{
    render(){
        return <div className="cluster container--orderlist fulfilled">
            <div className="container--basicinfo">
                <p>ordernumber: 0000000000</p>
                <p>Name</p>
                <p>00-00-0000</p>
                <p>00:00</p>
            </div>
            <div className="orderdetail">
                <li>num x Drink Name</li>
                <li>num x Snack Name</li>
                
                
            </div>
            <div>
                <p className="time">00:00:00</p>
                <FulfilledCheckButton className="fulfilledCheck"></FulfilledCheckButton>
          
                

            </div>

            

        </div>;
    }
}

export default FulfilledOrderlist;