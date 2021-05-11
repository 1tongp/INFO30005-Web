import React from 'react';
import './component.css'




// The search bar for finished order page. Have not added a button yet.

class Searchbar extends React.Component{
    render(){
        return <div>
            <input className="searchbar" placeholder="Search Order Number Or Name..."></input>
        

        </div> 
    }
}

export default Searchbar;