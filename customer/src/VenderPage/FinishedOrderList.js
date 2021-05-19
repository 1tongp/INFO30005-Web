import React from 'react';
import './component.css'


// This is order list component for finished orders page 
class FinishedOrderList extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        var children;
      }
    render(){
        return <div className="cluster container--finishedorderlist">
           <div>
                <p>00000000000</p>
                <p>Full Name</p>
            </div>
            <div>
                <p>DD-MM-YYYY</p>
                <p>Order Status</p>
               
            </div>
        </div>
               
                

            
    }
}

export default FinishedOrderList;