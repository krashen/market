import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'; 
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';

import Home from '../home/home.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/' element={<Home />}>
                <CrwnLogo className='logo' />  
            </LogoContainer>          
            <NavLinks>
                <NavLink to='/shop'>
                    Shop
                </NavLink>
                { currentUser ? 
                    (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ) : (
                        <NavLink to='/auth'>Sign In</NavLink>
                    )
                }
                <CartIcon />             
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation