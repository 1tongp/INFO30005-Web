import React from 'react';
import './Registration.css'
import { Layout} from 'antd';
import {
    CopyrightOutlined
} from '@ant-design/icons';


const { Header, Footer, Content } = Layout;

export default function registrationPage () {
    return (
        <Layout className="signupBackground">
            <Header >

            </Header>
            
            <Content >
                <h2>CREATE AN ACCOUNT</h2>
                <br/>
                <div className="signupContainer">
                <form >
                    <input placeholder="First Name" className="fnameinput"/>
                    <input placeholder="Last Name" className="lnameinput"/>
                    <br/>
                    <br/>
                    <input placeholder="E-mail Address"/>
                    <br/>
                    <br/>
                    <input type="password" placeholder="Password"/>
                    <br/>
                    <br/>
                    <input type="password" placeholder="Confirm Password"/>
                    <br/>
                    <br/>

                    <br/>
                  
                    <input type="submit" value="SIGN UP NOW ►" className="btnSignup" />
                    


                </form>

           
                    <br/>
                    <br/>
                    <br/>

                
                
                <input type="button" value="◀︎ CANCEL" className="btnCancel" />
                    


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
