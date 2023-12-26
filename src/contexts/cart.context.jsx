import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id === productToAdd.id
    })

    if(existingCartItem) {
      return cartItems.map((cartItem) => {
        if(cartItem.id === productToAdd.id) {
            return {...cartItem, quantity: cartItem.quantity + 1};
        } else {
            return cartItem;
        }
      })  
    }
    
    return [...cartItems, { ...productToAdd, quantity: 1}]
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id === cartItemToRemove.id
    }); 

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((carItem) => {
            return carItem.id !== cartItemToRemove.id
        })
    }

    return cartItems.map((cartItem) => {
        if(cartItem.id === cartItemToRemove.id) {
            return {...cartItem, quantity: cartItem.quantity - 1};
        } else {
            return cartItem;
        }
    }) 

}

export const CartContext = createContext({
    isCartOpen: false,
    serIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartCount(getCartItemsTotalQuantity());
        setCartTotal(getCartTotal());
    }, [cartItems])

    const getCartItemsTotalQuantity = (cart) => {
        return cartItems.reduce((total, { quantity }) => {  
          return total + quantity
        }, 0)
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity)
        },0)
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {  
        isCartOpen, 
        setIsCartOpen, 
        clearItemFromCart, 
        removeItemFromCart, 
        addItemToCart, 
        cartItems, 
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}