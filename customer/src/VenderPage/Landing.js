import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import { Jumbotron, Button, Modal, Form } from 'react-bootstrap';
import './component.css'
import './FulfilledOrderlist'

import './landing.css'

import { Layout, Menu } from 'antd';
import FulfilledOrderlist from './FulfilledOrderlist';
import Searchbar from './Searchbar.js'
import FinishedOrderList from './FinishedOrderList.js'
import FinishedOrderDetail from './FinishedOrderDetail.js'
import Sidebar from './Sider.js'

import VendorMap from '../components/vendorMap';
import { useState, useEffect } from 'react';




const { Header, Sider, Content } = Layout;



export default function VendorMain(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const showModal = () => {
    setShow(true);
  };

  // console.log("below is landing.js");
  // console.log(props);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("position: "+ position);
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
      // props.data.location.state.position = [lat, lng];
      // props.location.state.vendor.location = position.coords;
    });
    // axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
    //   console.log(response)
    //   setVendors(response.data.vendors)
    // })
    // console.log([lat,lng]);

  }, [lat, lng])

  // console.log("Props data:");
  props.location.state.position = [lat, lng];
  // console.dir(props.location.state.position);

  const toLogin = () => {
    props.history.push('/customer/login')
  }

  const openVan = () => {
    props.history.push('/preparing')
  }


  // state = {
  //     collapsed: false,
  //     modal1Visible: false,
  //   };

  //   setModal1Visible(modal1Visible) {
  //     this.setState({ modal1Visible });
  // }

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };
  const [desc, setDesc] = useState('');
  const [adress, setAdress] = useState('');


  const vendorModal = (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{adress}</h4> <br />
        <p className="current-location-coords">
          {lat} &#176; N, {lng} &#176; E
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
    </>
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
              <VendorMap data={props} />
              {/* Map */}
            </div>
            <div className="current-location">
              <h4 className="current-location-title">CURRENT LOCATION: </h4>
              <p className="current-location-p">
                <Form>
                  <Form.Label>Add Adress</Form.Label>
                  <Form.Control type="text" placeholder="123 Street St, Melbourne" onChange={e => setAdress(e.target.value)}  />
                </Form>
                <br />
                <span className="current-location-coords">
                  {lat} &#176; N, {lng} &#176; E
                        </span>
              </ p>
            </div>

            <div className="add-description" placeholder="Add description">
              <Form>
                <Form.Group>
                  <Form.Label>Add description</Form.Label>
                  <Form.Control as="textarea" rows={2} onChange={e => setDesc(e.target.value)} />
                </Form.Group>
              </Form>

            </div>
            <div className="button-wrapper">
              {/* onClick={} */}
              <Button variant="outline-primary" onClick={toLogin} >Back To Login</Button>
              <Button variant="outline-primary" onClick={showModal} >Open for Business</Button>
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


