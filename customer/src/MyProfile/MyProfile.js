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

    const [firstName, setfirsttName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');

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
                <br/>
                <div className="signupContainer">
                <form >
                    <input placeholder="First Name" className="fnameinput"
                    onChange = {e => setfirsttName(e.target.value)}/>
                    <input placeholder="Last Name" className="lnameinput"
                    onChange = {e => setlastName(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <input type="password" placeholder="New Password"
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

            <Footer classname="footer"> 
                <p>
                <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>
            

        </Layout>
    )
}
