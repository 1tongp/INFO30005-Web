import React from 'react'
import { Layout} from 'antd';
import './Login.css'
import {
    CloseCircleOutlined
} from '@ant-design/icons';


const {  Content } = Layout;






export default function loginPage() {
    return (
        <Layout>
            
            <Content className="loginContainer">
                <CloseCircleOutlined className="closeIcon" href=""/>
                {/* click continue button and the form data will be sent to ... */}
                <form 
                className="loginForm" 
                name="login" 
                action="" 
                onSubmit="" //return validateForm() haven't written yet
                method="post"> 
                    <h2>LOG IN</h2>
                    <br></br>
                    <br/>
                    <input placeholder="Username" />
                    <br></br>
                    <br></br>
                    <br></br>
                    <input placeholder="Password" type="password"/>
                    <br></br>

                    {/* go to forget password page */}
                    <a href = "url" className='forgotPasswordLink'>Forgot password?</a>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="submit" value="CONTINUE" className="btnContinue"/>
                    <br></br>
                    <br></br>

                    {/* go to registration page */}
                    <p>New user? <a href="url" className = 'signupLink'>Sign up now!</a></p>
                </form>


            </Content>

            

            
        </Layout>


    )
}