import { 
    createContext,
    useEffect,
    useReducer
} from 'react';

import { 
    onAuthStateChangedListener,
    createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`Unhandled type ${type} `);
    }

}



export const UserProvider = ({children}) => {

    const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);
 
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            currentUser: user
        })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe; // whenever function useEffect returns will run when component unmounts
    },[]);

    const value = {
        currentUser,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
