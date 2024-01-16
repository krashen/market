import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentButton } from './payment-form.styles';
import { _l } from '../../utils/helpers/helpers';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment ] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }    
        setIsProcessingPayment(true);
        
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then((res) => res.json());

        const { paymentIntent: { client_secret }} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details:{
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            _l(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                _l('Payment Successful')
            }
        }
    }


    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    disabled={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm