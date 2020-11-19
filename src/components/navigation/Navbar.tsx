import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/netflix.png';

import './Navbar.scss';
const NavBar = () => {
    const auth = useSelector((state: any) => state.auth.authenticated);
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            return window.pageYOffset > 100 ? setScroll(true) : setScroll(false)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const classes = ['nav'];
    if (scroll) {
        classes.push('notactive');
    }
    return <div className={classes.join(' ')}>
        <div className="nav__logo">
            <Link to="/">
                <img src={logo} className="nav__logo--icon" alt="netflix logo" /></Link>
        </div>

        <div className="nav__auth">
            {auth === true ? <div className="nav__auth--button">
                <Link to="/watchlist">watchlist</Link>
            </div> : null}
            <div className="nav__auth--button">
                {auth === true ? <Link to="/logout">logout</Link> : <Link to="/login">Login</Link>}
            </div>
        </div>
    </div>
}

export default NavBar;