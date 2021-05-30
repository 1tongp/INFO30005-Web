// import React, { useState } from 'react';
// import './component.css'
// import {SearchOutlined} from '@ant-design/icons';
// import axios from '../API/axios.js';
// import DetailButton from './searchButtonShow.js'


// // The search bar for finished order page. Have not added a button yet.

// // class Searchbar extends React.Component{
// //     constructor(props){
// //         super(props);
// //         console.log(this.props)
// //         this.state = {
// //             id: "",
// //         }
// //     }


// //     render(){
// //         return <div className='cluster container--search'>

// //                 <input className="searchbar" placeholder="Search Order Number Or Name..."></input>



// //                 <button className="btn--search">Search</button>




// //         </div> 
// //     }
// // }

// // export default Searchbar;

// export default function Searchbar(props) {
//     console.log(props);
//     const [id, setId] = useState();
//     const onSearch = () => {
//         axios.get('order/search/' + id).then(response =>{
//             if(response.data.success){
//                 console.log(response);
//                 <DetailButton>{response.data}</DetailButton>
//                 console.log("finished")
//             }
//         })
//     }
//     return (
//         <div className='cluster container--search'>

//             <input type='id' className="searchbar" placeholder="Search Order Id" onChange = {e => setId(e.target.value)}></input>



//             <button className="btn--search" onClick = {onSearch} > <SearchOutlined /> Search</button>




//         </div>
//     )

// }


