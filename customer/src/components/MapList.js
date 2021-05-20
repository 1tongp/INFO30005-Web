import{Button} from 'react-bootstrap';
export default function MapList(props){

    console.log(props);
    return(
        <div className='map-list-container'>
            <h3>Nearest Vans</h3>
            {
                 props.data.location.state.vendors.map((vendor) => (
                <div className='map-item'>
                    <div className='list-name'>{vendor.name}</div>
                    <div className='list-location'>{vendor.currentAddress}</div>
                    <div className='list-distance'>{vendor.distance}KM</div>
                    
                </div>
                ))
            }
        </div>
    )
}

// export default function MapList(props){

//     console.log(props);
//     return(
//         <div className='map-list-container'>
//             <h3>Nearest Vans</h3>
//             {
//                  props.data.location.state.vendors.map((vendor) => (
//                 <div className='map-item' onClick={
//                     props.data.history.push('/customer/menu', {
//                         customer: props.data.location.state.customer, 
//                         vendor: vendor})
//                 }>
//                     {vendor.name}
//                     {vendor.currentAddress}
//                     Distance: {vendor.distance}KM
//                     <hr />
//                 </div>
//                 ))
//             }
//         </div>
//     )
// }



  
// export default function MapList(){
//     return(
//         <div className='map-list-container'>
//             <h3>Nearest Vans</h3>
//             <div className='map-item'>
//                 <div className='list-name'>Van Name</div>
//                 <div className='list-location'>Location</div>
//             </div>
//             <hr />
//             <div className='map-item'>
//                 <div className='list-name'>Van Name</div>
//                 <div className='list-location'>Location</div>
//             </div>
//             <hr />
//             <div className='map-item'>
//                 <div className='list-name'>Van Name</div>
//                 <div className='list-location'>Location</div>
//             </div>
//             <hr />
//             <div className='map-item'>
//                 <div className='list-name'>Van Name</div>
//                 <div className='list-location'>Location</div>
//             </div>
//             <hr />
//             <div className='map-item'>
//                 <div className='list-name'>Van Name</div>
//                 <div className='list-location'>Location</div>
//             </div>
//         </div>
//     )
// }