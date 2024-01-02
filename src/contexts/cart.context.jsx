import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0  
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}

const cartReducar = (state, action) => {
    const { type, payload} = action;

    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }  

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {
    
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducar, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount 
            }
        ))
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
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