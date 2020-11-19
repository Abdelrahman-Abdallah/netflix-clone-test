import React from 'react'
import './Footer.scss'
import logo from '../../assets/react.png'
function Footer() {
    return (
        <div className="footer">
            <div className="footer__content">Built with React js
            <div className="footer__img">
                    <img src={logo} alt="react" />
                </div>
            </div>

        </div>
    )
}

export default Footer
