import React from 'react';
import './component.css'




// The search bar for finished order page. Have not added a button yet.

class Searchbar extends React.Component{
    render(){
        return <div className='cluster container--search'>
            
                <input className="searchbar" placeholder="Search Order Number Or Name..."></input>
               
   
        
                <button className="btn--search">Search</button>

            
        

        </div> 
    }
}

export default Searchbar;