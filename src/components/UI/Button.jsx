import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

const BUTTON_FONT_SIZES = {
   small: '12px',
   medium: '14px',
   large: '16px',
};

const Button = ({
   children,
   onClick,
   disabled,
   variant,
   fullWidth,
   size = 'medium',
   ...props
}) => {
   return (
      <StyledButton
         disabled={disabled}
         variant={variant}
         onClick={onClick}
         size={size}
         {...props}
      >
         {children}
      </StyledButton>
   );
};
export default Button;

const StyledButton = styled(MuiButton)((props) => ({
   fontWeight: '500px',
   fontFamily: 'Inter',
   fontSize: BUTTON_FONT_SIZES[props.size],
   paddingTop: '10px',
   backgroundColor: '#DD8A08',
   color: '#F7F7F7',
   height: props.height || '37px',
   width: props.width || '100%',
   borderRadius: '2px',
   border: 'none',
   '&:hover': {
      backgroundColor: '#BB7200',
   },
   '&:active': {
      backgroundColor: '#F2B75B',
   },
   '&:disabled': {
      background: ' #C4C4C4',
      color: '#F7F7F7',
   },
}));
