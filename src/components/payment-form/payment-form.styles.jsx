import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbb;
    padding: 20px;
    border-radius: 15px;
    box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
    -webkit-box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
    -moz-box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;
`

export const PaymentButton = styled(Button)`
   margin-left: auto;
   margin-top: 30px ;
   border: none;
   background-color: #88f;
   color: #fff;
   font-weight: bold;
   &:hover {
    background-color: #5e5efc;
   }
`