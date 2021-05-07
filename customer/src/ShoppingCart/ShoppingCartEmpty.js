import './styles.css';
import logo from '../images/logo.png';
// import 'antd/dist/antd.css';
import { Layout, Button} from 'antd';
import {ShoppingOutlined, CaretLeftOutlined, CopyrightOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function shoppingCartEmpty () {
    return (
        <Layout>
            <Header className='header_container'>
                
                <img src={logo} className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>
                    
                <div className='mid_nav'>
                    <input type="checkbox" id="n_check"></input>
                    <div class="hamburger">
                        <label for="n_check">
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href='!#'>HOME</a>
                        <a className='header_text' href='!#'>MENU</a>
                        <a className='icon' href='!#'><ShoppingOutlined /></a>
                        <a className='icon' href='!#'><UserOutlined /></a>
                    </div>
                </div>
                    
                    {/* <div className='right_icons'> */}
                        {/* <a className='icon' href=''><ShoppingOutlined /></a> */}
                        {/* <a className='icon' href=''><UserOutlined /></a> */}
                    {/* </div>  */}

            </Header>
            
            <Content className="container">
                <h1>MY BASKET</h1>
                <div className='centre_content'>
                    
                    <ShoppingOutlined className='icon'/>
                    <br />
                    <br />
                    <br />
                    <br />

                    <p>
                        YOUR BASKET IS EMPTY : (
                    </p>

                    <br />
                    <br />
                    <br />
                    <br />
                    <Button type="primary">
                        <CaretLeftOutlined className='left_arrow'/> 
                        CONTINUE ORDERING
                    </Button>
                
                </div>

            </Content>

            <Footer>
                <p>
                <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>

        </Layout>
    )
}

