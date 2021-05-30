// import React , {useState} from 'react'
// import {Layout} from 'antd';
// import './Login.css'
// import axios from '../API/axios.js';

// const { Content } = Layout;

// export default function LoginPage(props) {
//     console.log(props);

//     const [loginEmail, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     // an action to complete the login by given correct email and password
//     const onLogin = () => {
//         axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
//         console.log(props);
//         console.log(response);
//         if(response.data.success){
//           // push the customer information
//           props.history.push('/customer/menu', {customer: response.data.customer});
//         }
//         else{
//           alert(response.data.error)
//         }
//       }).catch(error => {
//         console.log(error.response.data.message)
//         alert(error.response.data.message)
//       })
//     }

//     const toMain = () => {
//       props.history.push('../');
//     }

//     return (
//         <Layout>
//             <Content className="loginContainer" >
//                 <br /><br />
//                 {/* click continue button and the form data will be sent to ... */}
//                 <form 
//                 className="loginForm" 
//                 name="login" 
//                 action="" 
//                 onSubmit="" //return validateForm() haven't written yet
//                 method="post"> 
//                     <h2>LOG IN</h2>
//                     <br></br>
//                     <br/>
//                     <input type="loginEmail" placeholder="Username"  
//                     onChange = {e => setEmail(e.target.value)} />
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <input type="password" placeholder="Password" 
//                     onChange = {e => setPassword(e.target.value)}/>
//                     <br></br>

//                     {/* go to forget password page */}
//                     <a href = "" className='forgotPasswordLink'>Forgot password?</a>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <input type="button" value="BACK" onClick = {toMain} className="btnBack"/>
//                     <input type="button" value="CONTINUE" onClick = {onLogin} className="btnContinue"/>
//                     <br></br>
//                     <br></br>
//                     <br /><br />

//                     {/* go to registration page */}
//                     <p>New user? <a href="" className = 'signupLink'>Sign up now!</a></p>
//                 </form>
//             </Content>
//         </Layout>
//     )
// }