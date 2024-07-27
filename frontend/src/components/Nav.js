import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import homeLogo from './../images/homeLogo.png'

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div>
            <ul className='nav-ul'>
                <img alt='Logo Image' className='homeLogo' src={homeLogo} />
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {
                    auth ? <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    :<>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Nav;