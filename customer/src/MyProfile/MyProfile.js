import React , {useState} from 'react'
import '../RegistrationPage/Registration.css'
import { Layout} from 'antd';
import { CopyrightOutlined} from '@ant-design/icons';
import axios from '../API/axios.js';
import {useHistory} from "react-router-dom";


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
            <Header >

            </Header>
            
            <Content >
                <h2>Nice to see you, Change your details here:</h2>
                <h2>Your Email Address (can not be changed): {props.location.state.customer.loginEmail}</h2>
                <br/>
                <div className="signupContainer">
                <form >
                    <input placeholder="First Name" className="fnameinput" defaultValue = {props.location.state.customer.givenName}
                    onChange = {e => setfirstName(e.target.value)}/>
                    <input placeholder="Last Name" className="lnameinput" defaultValue = {props.location.state.customer.familyName}
                    onChange = {e => setlastName(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <input type="password" placeholder="New Password" defaultValue = {props.location.state.customer.password}
                    onChange = {e => setPassword(e.target.value)}/>
                    <br/>
                    <br/>

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
