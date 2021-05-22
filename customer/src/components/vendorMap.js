import React, { useMemo, useState } from 'react'
import { Icon } from "leaflet" ;
import logo from '../images/coffee-marker.png';
import personlogo from '../images/map-marker.png';
import axios from '../API/axios.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useHistory } from 'react-router';

export default function VendorMap(props) {
    console.log(props);

    let history = useHistory();
    const[show, setShow] = useState(false);
    const[address, setAddress] = useState('');
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [position, setPosition] = useState(props.data.center)
    const eventHandlers = useMemo(
        (e) => ({
            
        }
        )
    )
    const vendorIcon = new Icon({
        iconUrl: logo,
        iconSize: [55,55],
    })
    const personIcon = new Icon({
        iconUrl: personlogo,
        iconSize: [55,55],
    })

    // const toMenu = () =>{
    //     // push the customer information
    //     props.data.history.push('/customer/menu', {customer: props.data.location.state.customer});     
    // }

    const testLocation = [-37.5914496,145.11636479999999];
    return (
        <div>
            {/* -37.5914496, 145.11636479999999 */}
            {/* props.data.location.state.vendor.location */}
            <MapContainer center={props.data.location.state.position} zoom={16} scrollWheelZoom={false}
                style={{height : "59vh", objectFit: "cover"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.data.location.state.position} icon = { personIcon }>
                    <Popup>
                        You are here.
                    </Popup>
                </Marker>
                {/* {
                    // props.data.location.state.vendors.map((vendor) => (
                    //     <Marker key = {vendor.id} position={vendor.location} icon = { vendorIcon } 
                    //         eventHandlers={{click : () => {
                    //             props.data.history.push('/customer/menu', {
                    //                 customer: props.data.location.state.customer, 
                    //                 vendor: vendor}); 
                    //         }}}>

                    //     </Marker>
                    ))
                } */}
            </MapContainer>
        </div>
    )
}