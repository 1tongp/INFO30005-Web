//import the functions will be used
import React from 'react';
import '../ShoppingCart/styles.css';
import '../Menu/Menu.css';
import { Layout , Card } from 'antd';
import { Button } from 'react-bootstrap';
import { CopyrightOutlined , LikeOutlined } from '@ant-design/icons';

const { Footer, Content } = Layout;
const {Meta} = Card;

//this function will implement the view only Menu page strcture
export default function MenuPre (props) {
    return(
        <Layout>       
            <Content className='container'>
                <h1>MENU（View Only）</h1>
                {/* loop each snack in the database and show them out as a menu */}
                {props.snacks.map((snack) => (
                        <Card cover={<img className='card' alt={snack.snackName} src={snack.snackPhotoPath}/>} key={snack._id}>
                            <div>
                                <Meta title={snack.snackName + " :$" + snack.snackPrice} className='card-info'/>
                                <br /><br /><br /><br />
                            </div>
                        </Card>
                ))}

                <Button className='place' href='../customer/login'>
                    Signin to Order
                    <LikeOutlined className='place_icon'/>
                </Button>
                <br /><br />
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