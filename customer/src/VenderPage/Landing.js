import React, { useMemo, useState} from 'react'
import axios from '../API/axios.js';
import 'antd/dist/antd.css';
import { Modal, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import './component.css'
import './FulfilledOrderlist'
import './landing.css'
import '../landing.css'
import { CaretLeftOutlined, CaretRightOutlined} from '@ant-design/icons'
import { Layout} from 'antd';

const { Header} = Layout;

export default function VendorMain(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const showModal = () => {
    setShow(true);
  };

  const [desc, setDesc] = useState('');
  const [adress, setAdress] = useState('');
  const [position, setPosition] = useState({lat: props.location.state.position[0], lng: props.location.state.position[1]});


  const eventHandlers = useMemo(
    (e) => ({
      dragend(e) {
        setPosition(e.target.getLatLng())
      }
    }),
    [],
  )

  const rendervendor = (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}>
    </Marker>
  )

  const toLogin = () => {
    props.history.push('../')
  }

  const openVan = () => {
    axios.post('/vendor/park/' + props.location.state.vendor.id, {
      currentAddress: adress,
      parked: true,
      readyForOrder: true,
      location: [position.lat, position.lng]
    }).then(response1 => {
      console.log(response1);
    })
    axios.get('/order/' + props.location.state.vendor.id + '?status=outstanding').then(response => {
      console.log(response);
      if(!response.data.success){
        props.history.push('/vendor/preparing', {vendor: props.location.state.vendor, orders:[], key:'1', position: props.location.state.position})
      }
      else{
        props.history.push('/vendor/preparing', {vendor: props.location.state.vendor, orders: response.data.orders, key:'1', position: props.location.state.position});

      }
    })
  }


  const vendorModal = (
    <div className='login-container'>
      <div className='popup locationpop'>
      <Modal.Header>
        <h2>CONFIRM LOCATION</h2>
      </Modal.Header>
      <Modal.Body>
        <br />
        <h3>Address: </h3>
        <p>{adress}</p>
        <p className="current-location-coords">
          {position.lat} &#176; N <br />{position.lng} &#176; E
          </p >

        <h3>Adress Description: </h3>
        <p>{desc}</p>
      </Modal.Body>
      <Modal.Footer>
      <button className="primary-btn" onClick={openVan}>
          Continue
        </button>
        <button className="secondary-btn" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </div>
    </div>
  )

  return (
    <div>
      {/* <Sidebar /> */}
      <div className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <p className="landing-title">CHOOSE LOCATION</p >
        </Header>
        <div
          className="site-layout-background-content remove-bar"
          style={{
            margin: '0px 0px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="landing-wrapper">
            <div className="map-wrapper">

                <MapContainer className='v-map' center={props.location.state.position} zoom={16} scrollWheelZoom={false}
                  style={{ height: "59vh", objectFit: "cover" }}>
                  <TileLayer
                    attribution='&copy; < a href=" ">OpenStreetMap</ a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {rendervendor}
                </MapContainer>
              
              {/* Map */}
            </div>
            <div className="current-location">
              <h4 className="current-location-title">CURRENT LOCATION </h4>
              <div className="current-location-p">
                <Form>
                  {/* <Form.Label>Add Address</Form.Label> */}
                  <Form.Control type="adress" placeholder="Enter address..." onChange={e => setAdress(e.target.value)} />
                </Form>
                <br />
                <span className="current-location-coords">
                  {position.lat} &#176; N, {position.lng} &#176; E
                        </span>
              </ div>
            </div>

            <div className="add-description" >
              <Form>
                <Form.Group>
                  {/* <Form.Label>Location Description</Form.Label> */}
                  <Form.Control type="desc" placeholder="Enter address descriptions..." rows={20} onChange={e => setDesc(e.target.value)} />
                </Form.Group>
              </Form>

            </div>
            <div className="button-wrapper">
              {/* onClick={} */}
              <button className='secondary-btn'  onClick={toLogin} ><CaretLeftOutlined />     Back To Login</button>
              <button className='primary'  onClick={showModal} >Open For Business     <CaretRightOutlined /></button>
            
            </div>

            <Modal show={show} onHide={handleClose}>
              {vendorModal}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}