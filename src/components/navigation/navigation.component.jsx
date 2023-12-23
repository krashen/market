import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'; 
import SignIn from '../../routes/authentication/authentication.component';
import Home from '../../routes/home/home.component';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/' element={<Home />}>
                <CrwnLogo className='logo' />  
            </Link>          
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>
                    Shop
                </Link>
                <Link className='nav-link' to='/auth'>
                    Sign In
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation