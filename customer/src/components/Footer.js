import '../ShoppingCart/styles.css';
import {CopyrightOutlined} from '@ant-design/icons'
import './footer.css'

export default function MyFooter(){
    return(
        <>
            <div id="footer">
                    <p>
                    <CopyrightOutlined /> SNACKS IN A VAN
                    <br />
                    All Rights Reserved
                    </p>
            </div>
        </>
    )
}