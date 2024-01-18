import {
    ErrorBoxStyled
  } from './error-box.styles';
  

  export const ErrorBox = ({ message, children }) => {
    return (
      <ErrorBoxStyled>{children}</ErrorBoxStyled>
    )
  };
  
  export default ErrorBox;