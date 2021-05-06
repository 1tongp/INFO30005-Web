import React , {useState, useEffect} from 'react'
import { Layout} from 'antd';
import './Login.css'
import {
    CloseCircleOutlined
} from '@ant-design/icons';
import{message} from 'antd';
import axios from '../API/axios.js';
import Menu from '../Menu/Menu.js'
const { Content } = Layout;

export default function LoginPage(props) {
    console.log(props);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 用这个信息去跟后端核对
    // delete console
    const onLogin = () => {
        axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
        console.log(props);
        console.log(response);
        if(response.data.success){
          // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
          props.history.push('/customer', {customer: response.data.customer});
        }
        else{
          message.error(response.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.message)
        message.error(error.response.data.message)
      })
    }

    return (
        <Layout>
            <Content className="loginContainer" >
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
                    <input type="loginEmail" placeholder="Username"  
                    onChange = {e => setEmail(e.target.value)} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="password" placeholder="Password" 
                    onChange = {e => setPassword(e.target.value)}/>
                    <br></br>

                    {/* go to forget password page */}
                    <a href = "url" className='forgotPasswordLink'>Forgot password?</a>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="button" value="CONTINUE" onClick = {onLogin} className="btnContinue"/>
                    <br></br>
                    <br></br>

                    {/* go to registration page */}
                    <p>New user? <a href="url" className = 'signupLink'>Sign up now!</a></p>
                </form>
            </Content>
        </Layout>
    )
}