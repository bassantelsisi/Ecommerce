import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import CartIcon from '../CartIcon/CartIcon';
import Wishlist from '../Wishlist/Wishlist';
import WishlistIcon from '../WhishlistIcon/WhishlistIcon';


function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

function logout() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');  
}
  return <>
    <nav className='bg-white flex p-5 items-center'>
      <div>
        <img src={Logo} alt="" />
      </div>

      <div className='links '>
        {token ? <ul className='flex space-x-3 pl-5'>
          <li className="flex items-center"><Link to="/">Home</Link></li>
          <li className="flex items-center"><Link to="categories">Categories</Link></li>
          <li className="flex items-center"><Link to="brands">Brands</Link></li>
          <li className="flex items-center"><Link to="products">Products</Link></li>
          <li className="flex items-center"><Link to="Whishlist"><WishlistIcon/></Link></li>
          <li className="flex items-center"><Link to="cart"><CartIcon/></Link></li>
        </ul> : null}

      </div>
      <div className="social ms-auto space-x-3">
        <i className='fab fa-facebook'></i>
        <i className='fab fa-tiktok'></i>
        <i className='fab fa-youtube'></i>
      </div>
      <div className='space-x-3 pl-5'>
        {token ? <button onClick={logout}>Log Out</button>:<>
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </> }
        
        
      </div>
    </nav>
  </>
}

export default Navbar