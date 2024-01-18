import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid gray;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
  -webkit-box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
  -moz-box-shadow: -11px 11px 0px -2px rgba(0,0,0,0.33);
  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;