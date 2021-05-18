  
import React from 'react'
import { Icon } from "leaflet" ;
import logo from '../images/coffee-marker.png';
import personlogo from '../images/map-marker.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../HomePage/Main.css';

export default function LeafMap(props) {
    console.log(props);
    const vendorIcon = new Icon({
        iconUrl: logo,
        iconSize: [55,55],
    })
    const personIcon = new Icon({
        iconUrl: personlogo,
        iconSize: [55,55],
    })

    const toMenu = () =>{
        // push the customer information
        props.data.history.push('/customer/menu', {customer: props.data.location.state.customer});     
    }

    return (
        <div className='map-container'>
            <MapContainer center={props.data.location.state.position} zoom={16} scrollWheelZoom={false}
                style={{height : "65vh"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.data.location.state.position} icon = { personIcon }>
                    <Popup>
                        You are here.
                    </Popup>
                </Marker>
                {
                    props.data.location.state.vendors.map((vendor) => (
                        <Marker key = {vendor.id} position={vendor.location} icon = { vendorIcon } 
                            eventHandlers={{click : () => {
                                props.data.history.push('/customer/menu', {
                                    customer: props.data.location.state.customer, 
                                    vendor: vendor}); 
                            }}}>

                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    )
}