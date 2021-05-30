import React , {useState} from 'react'
import '../RegistrationPage/Registration.css'
import { Layout} from 'antd';
import axios from '../API/axios.js';
import {useHistory} from "react-router-dom";
import MyFooter from '../components/Footer.js';

export default function MyProfile (props) {
    let history = useHistory();
    console.log(props);
    console.log(props.history);

    const [firstName, setfirstName] = useState(props.location.state.customer.givenName);
    const [lastName, setlastName] = useState(props.location.state.customer.familyName);
    const [password, setPassword] = useState(props.location.state.customer.password);

    const onChange = () => {
        var reg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{8,}$/
        if(reg.test(password)){
            console.log(props.history);
            axios.post('/customer/changeDetails/'+ props.location.state.customer._id, {givenName: firstName, familyName: 
            lastName, password: password}).then(response =>{
                console.log(response);
                if(response.data.changeDetails){
                // push the customer information
                    alert("success! Please Login again using your new details");
                    history.goBack();
                }
                else{
                    alert(response.data.error)
                }
            }).catch(error => {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            })
        }
    }

    const onBack = () => {
        history.goBack()
    }
    return (
        <Layout className="signupBackground ">
        {/* <Layout> */}
            <div className="header--nofunction"></div>
            <div className="container--signup container--profile">
                <div className="profile--subcontainer">
                <h1>MY PROFILE</h1>
        
                        <div >
                        <p className='email-warning'>Your Email Address (cannot be changed): <br /> {props.location.state.customer.loginEmail}</p>
                        <form >
                            <div className="cluster--signup">

                            <div className="margintop">
                                <label for="fname" className="label">First Name:</label>
                                <input id="fname" placeholder="First Name" className="nameinput" defaultValue = {props.location.state.customer.givenName}
                                onChange = {e => setfirstName(e.target.value)}/>
                                </div>
                            <div className="margintop">
                                <label for="lname" className="label">Last Name:</label>
                                <input id="lname" placeholder="Last Name" className="nameinput" defaultValue = {props.location.state.customer.familyName}
                                onChange = {e => setlastName(e.target.value)}/>
                            </div>
                            </div>

                            <br></br>

                            <div className='password-input'>
                                <label for="password" className="label">Password:</label>
                                <input id="password" type="password" className="nameinput" placeholder="New Password" defaultValue = {props.location.state.customer.password}
                                onChange = {e => setPassword(e.target.value)}/>
                            </div>
                            
                            <br/>

                            <br></br>
                            <br></br>

                            <div className="container--updatebtn">
                                <input type="submit" value="Update Now ►" className="btnSignup" 
                                onClick = {onChange}/>

                            </div>                                                   
            
                        </form>                
                            <br/>
                            <br/>
                       
                        <input type="button" value="◀︎ Back" className="btnCancel" 
                        onClick = {onBack}
                        />

                    </div>

                </div>
                        
            </div>

            <MyFooter></MyFooter>
            </Layout>
    )
}
