import React, { useMemo, useState, useEffect} from 'react'
import axios from '../API/axios.js';
import 'antd/dist/antd.css';
import { Jumbotron, Button, Modal, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './component.css'
import './FulfilledOrderlist'

import './landing.css'
import '../landing.css'
import { CaretLeftOutlined, CaretRightOutlined} from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import FulfilledOrderlist from './FulfilledOrderlist';
import Searchbar from './Searchbar.js'
import FinishedOrderList from './FinishedOrderList.js'
import FinishedOrderDetail from './FinishedOrderDetail.js'
import Sidebar from './Sider.js'
import VendorMap from '../components/vendorMap';
import { Empty } from 'antd';

const { Header, Sider, Content } = Layout;

export default function VendorMain(props) {
  console.log(props.location.state.position[0]);
  console.log(props);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const showModal = () => {
    setShow(true);
  };

  // console.log("below is landing.js");
  // console.log(props);
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');
  const [desc, setDesc] = useState('');
  const [adress, setAdress] = useState('');

  // this.center = latLng([this.lat,this.lng]);
  // const [position, setPosition] = useState(props.location.state.position);
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

  console.log(position);


  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     // console.log("position: "+ position);
  //     setLat(position.coords.latitude)
  //     setLng(position.coords.longitude)
  //     // props.data.location.state.position = [lat, lng];
  //     // props.location.state.vendor.location = position.coords;
  //   });
  //   // axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
  //   //   console.log(response)
  //   //   setVendors(response.data.vendors)
  //   // })
  //   // console.log([lat,lng]);

  // }, [lat, lng])

  // // console.log("Props data:");
  // props.location.state.position = [lat, lng];
  // // console.dir(props.location.state.position);

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
        props.history.push('/vendor/preparing', {vendor: props.location.state.vendor, orders:[], key:'1'})
      }
      else{
        props.history.push('/vendor/preparing', {vendor: props.location.state.vendor, orders: response.data.orders, key:'1'});

      }
    })
  }


  


  const vendorModal = (
    <div className='login-container'>
      <div className='popup locationpop'>
      <Modal.Header>
        <Modal.Title>Confirm Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{adress}</h4> <br />
        <p className="current-location-coords">
          {position.lat} &#176; N, {position.lng} &#176; E
          </p>
        <br></br>
        <p>
          {desc}
        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
            </Button>
        <Button variant="outline-primary" onClick={openVan}>
          Continue
            </Button>
      </Modal.Footer>
    </div>
    </div>
  )

  return (
    <Layout>
      {/* <Sidebar /> */}
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <p className="landing-title">CHOOSE LOCATION</p>
        </Header>
        <Content
          className="site-layout-background-content"
          style={{
            margin: '0px 0px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="landing-wrapper">
            <div className="map-wrapper">
              
                {/* -37.5914496, 145.11636479999999 */}
                {/* props.data.location.state.vendor.location */}
                <MapContainer className='v-map' center={props.location.state.position} zoom={16} scrollWheelZoom={false}
                  style={{ height: "59vh", objectFit: "cover" }}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {rendervendor}
                </MapContainer>
              
              {/* Map */}
            </div>
            <div className="current-location">
              <h4 className="current-location-title">CURRENT LOCATION: </h4>
              <p className="current-location-p">
                <Form>
                  <Form.Label>Add Address</Form.Label>
                  <Form.Control type="adress" placeholder="Add address" onChange={e => setAdress(e.target.value)} />
                </Form>
                <br />
                <span className="current-location-coords">
                  {position.lat} &#176; N, {position.lng} &#176; E
                        </span>
              </ p>
            </div>

            <div className="add-description" >
              <Form>
                <Form.Group>
                  <Form.Label>Add description</Form.Label>
                  <Form.Control type="desc" placeholder="Add address descriptions" rows={2} onChange={e => setDesc(e.target.value)} />
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

            {/* <Modal className='popup'
            centered
            closable={false}
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            >
            <p>Done for Today?</p>
          </Modal> */}
          </div>



        </Content>


      </Layout>
    </Layout>
  );
}

