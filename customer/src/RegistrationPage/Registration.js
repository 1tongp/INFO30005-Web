import React, { useState, useEffect } from 'react';
import './Registration.css'
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import axios from "../API/axios.js";

const { Header, Footer, Content } = Layout;

export default function RegistrationPage(props) {
    console.log(props);
    const [loginEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        });
        axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
            console.log(response)
            setVendors(response.data.vendors)
        })
    }, [lat, lng])

    const toLogin = () => {
        props.history.push("../");
    }
    const onSignUp = () => {
        if (password != passwordConfirm) {
            alert("Password Inconsistent!");
        }
        else {
            axios.post('/customer/register', { givenName: firstName, familyName: lastName, loginEmail: loginEmail, password: password }).then(response => {
                if (response.data.success) {
                    console.log('success')
                    alert("Welcome! Thanks for joining us! You are all set");
                    // push the customer information
                    // props.history.push('/customer', {
                    //     customer: response.data.customer,
                    //     vendors: vendors,
                    //     position: [lat, lng]
                    // }); 
                    // props.history.push('../');
                }
                else {
                    alert("This email has been registered! Please change another one")
                }
            }).catch(error => {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            })
        }
    }
    return (
        <Layout>
            <Header >

            </Header>

            <Content >
                <br /><br /><br />
                <h1>CREATE AN ACCOUNT</h1>
                <br />
                <div className="signupContainer">
                    <form >
                        <input type="firstName" placeholder="First Name" className="fnameinput" onChange={e => setFirstName(e.target.value)} />
                        <input type="lastName" placeholder="Last Name" className="lnameinput" onChange={e => setLastName(e.target.value)} />
                        
                        <input type="loginEmail" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                        
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                       
                        <input type="password" placeholder="Confirm Password" onChange={e => setPasswordConfirm(e.target.value)} />
                        <br />
                        <br />

                        <br />

                        <input type="submit" value="SIGN UP NOW >>" className="btnSignup" onClick={onSignUp} />

                    </form>
                    <br />
                    <br />
                    <br />

                    <input type="button" value="<< CANCEL" className="btnCancel" onClick={toLogin} />

                </div>

            </Content>

            <Footer className="footer">
                <p>
                    <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>


        </Layout>
    )
}
