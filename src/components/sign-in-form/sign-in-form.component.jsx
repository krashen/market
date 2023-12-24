import './sign-in-form.styles.scss';
import { 
        useState
    } from 'react';

import { 
    signInWithGooglePopup,
    signInWithFacebookPopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../../components/button/button.component';

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logFacebookUser = async () => {
        const {user} = await signInWithFacebookPopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    const signInWithGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            
            switch(error.code) {
                case 'auth/invalid-credential':
                    alert('Incorrect user and/or password');
                    break;
                default:
                    alert('Error during login');
            }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    type='text'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    required
                    onChange={handleChange}
                    name='password'
                    type='password'
                    value={password}
                />
                
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogleUser} buttonType='google'>Sign in with Google</Button>
                    {/*-- <button onClick={logFacebookUser}>Sign in with Facebook</button> -*/} 
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm