import React from 'react'
import { Icon } from "leaflet" ;
import logo from '../images/coffee-marker.png';
import personlogo from '../images/map-marker.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function LeafMap(props) {
    const vendorIcon = new Icon({
        iconUrl: logo,
        iconSize: [55,55],
    })
    const personIcon = new Icon({
        iconUrl: personlogo,
        iconSize: [55,55],
    })

    return (
        <div>
            <MapContainer center={props.center} zoom={17} scrollWheelZoom={false}
                style={{height : "65vh"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.center} icon = { personIcon }>
                    <Popup>
                        You are here.
                    </Popup>
                </Marker>
                {
                    props.vendors.map((vendor) => (
                        <Marker key = {vendor.id} position={vendor.location} icon = { vendorIcon }>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    )
}