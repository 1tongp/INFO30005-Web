import React , {useState} from 'react'
import '../RegistrationPage/Registration.css'
import { Layout} from 'antd';
import { CopyrightOutlined} from '@ant-design/icons';
import axios from '../API/axios.js';
import {useHistory} from "react-router-dom";

import MyFooter from '../components/Footer.js';


const { Header, Footer, Content } = Layout;

export default function MyProfile (props) {
    let history = useHistory();
    console.log(props);
    console.log(props.history);

    const [firstName, setfirstName] = useState(props.location.state.customer.givenName);
    const [lastName, setlastName] = useState(props.location.state.customer.familyName);
    const [password, setPassword] = useState(props.location.state.customer.password);
    // const [disable, setDisable] = useState(true);

    // const enablePassword = () => {
    //     if (disable) { setDisable(false)}
    //     else {setDisable(true)}
    // }

    const onChange = () => {
        console.log(props.history);
        axios.post('/customer/changeDetails/'+ props.location.state.customer._id, {givenName: firstName, familyName: 
            lastName, password: password}).then(response =>{
            console.log(response);
            if(response.data.changeDetails){
          // push the customer information
                alert("success! Please Login again using your new details");
                props.history.push('/', {customer: response.data.customer});
            }
            else{
                alert(response.data.error)
            }
        }).catch(error => {
            console.log(error.response.data.message)
            alert(error.response.data.message)
            })
    }

    const onBack = () => {
        history.goBack()
    }
    return (
        <Layout className="signupBackground">
        {/* <Layout> */}
            <div className="header--nofunction"></div>
            <br /><br /><br /><br />
                
                
                
            
            <div >
                {/* <div className="profiletext">
                    <p className="title">Nice to see you! You can change your details here...</p>
                    <p className="warningtext">Your Email Address (can not be changed): </p>
                    <p>{props.location.state.customer.loginEmail}</p>

                </div> */}
                

                <h1>MY PROFILE</h1>
        
                <div className="signupContainer">
                <p className='email-warning'>Your Email Address (cannot be changed): <br /> {props.location.state.customer.loginEmail}</p>
                <form >
                    <div className="cluster--signup">

                    <div>
                        <label for="fname" className="label">First Name:</label>
                        <input id="fname" placeholder="First Name" className="nameinput" defaultValue = {props.location.state.customer.givenName}
                        onChange = {e => setfirstName(e.target.value)}/>
                        </div>
                    <div>
                        <label for="lname" className="label">Last Name:</label>
                        <input id="lname" placeholder="Last Name" className="nameinput" defaultValue = {props.location.state.customer.familyName}
                        onChange = {e => setlastName(e.target.value)}/>
                    </div>
                    </div>

                    <div className='password-input'>
                        <label for="password" className="label">Password:</label>
                        <input id="password" type="password" className="nameinput" placeholder="New Password" defaultValue = {props.location.state.customer.password}
                        onChange = {e => setPassword(e.target.value)}/>
                    </div>
                    


                    <br/>
                  
                    <input type="submit" value="Update Now ►" className="btnSignup" 
                    onClick = {onChange}/>
                    


                </form>

           
                    <br/>
                    <br/>
                    <br/>
                
                <input type="button" value="◀︎ Back" className="btnCancel" 
                onClick = {onBack}
                />

             </div>

            </div>

            <MyFooter></MyFooter>
            </Layout>
    )
}
