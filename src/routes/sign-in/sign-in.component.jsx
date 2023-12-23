import SignUpForm from '../../components/sign-up-form/sign-up-form.component'; 
import Button from '../../components/button/button.component';
//import FormInput from '../../components/form-input/form-input.component';


import { 
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInWithFacebookPopup
    } from '../../utils/firebase/firebase.utils';
import { useFetcher } from 'react-router-dom';

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logFacebookUser = async () => {
        const {user} = await signInWithFacebookPopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (
        <div> 
            <h1>Sign in Page</h1>
            <Button onClick={logGoogleUser} buttonType='google'>Sign in with Google</Button>
           {/*-- <button onClick={logFacebookUser}>Sign in with Facebook</button> -*/} 
           <SignUpForm />     
        </div>
    )
}

export default SignIn