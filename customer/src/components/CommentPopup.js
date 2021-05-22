import{Modal} from 'react-bootstrap';
import './commentpop.css';
import {StarFilled, StarOutlined} from '@ant-design/icons';

export default function CommentPop () {
    return (
        <div className='login-container'>
            <div className='comment-popup'>
                <Modal.Body>
                <h2>YOUR ORDER IS READY FOR PICK UP, ENJOY!</h2>
                <br />
                <h3>Service</h3>
                <div className='stars'>
                    <StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                </div>
                <br />
                <h3>Food</h3>
                <div className='stars'>
                    <StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                </div>
                <form>
                    <div className='input'>
                        <p>Comment (optional)</p>

                    </div>
                {/* <input type='text' placeholder='Comment (optional)'> </input> */}
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <button >
                        DONE
                    </button>
                </Modal.Footer>
                
            </div>

        </div>

    )
}