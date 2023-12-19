import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { 
        auth,
        signIn,
        WithGooglePopup,
        signInWithGooglePopup,
        signInWithGoogleRedirect,
        createUserDocumentFromAuth
    } from '../../utils/firebase/firebase.utils';
import { useFetcher } from 'react-router-dom';

const SignIn = () => {
    const GetRedirectResultUseEffect = async () => {
        const response = await getRedirectResult(auth);
        if (response){
            const userDocRef = await createUserDocumentFromAuth(response.user);    
        }
        
    }
    
    // useEffect doesn't like async declarations
    useEffect(()=>{GetRedirectResultUseEffect()}, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn