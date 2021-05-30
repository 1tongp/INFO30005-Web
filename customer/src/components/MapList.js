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

