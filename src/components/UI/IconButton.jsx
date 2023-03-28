import { styled, Button as MuiIconButton } from '@mui/material';
import React from 'react';
import { theme } from '../../assets/styles/theme';

const FONT_SIZE_BUTTON = {
   large: '16px',
   medium: '14px',
   small: '12px',
};
function IconButton({
   children,
   variant,
   onClick,
   disabled,
   size = 'large',
   Icon,
   ...props
}) {
   return (
      <StyledButton
         theme={theme}
         variant={variant}
         onClick={onClick}
         disabled={disabled}
         size={size}
         startIcon={Icon}
         {...props}
         classes={{ startIcon: 'icon' }}
      >
         {children}
      </StyledButton>
   );
}

export default IconButton;

const StyledButton = styled(MuiIconButton)((props) => ({
   borderRadius: '0',
   backgroundColor: '#F3F3F3',
   color: '#828282',
   border: 'none',
   minWidth: '0',
   display: 'flex',
   flexDirection: 'row',
   padding: '8px',
   textTransform: 'initial',
   gap: '8px',
   justifyContent: 'center',
   fontWeight: 400,

   fontSize: FONT_SIZE_BUTTON[props.size],
   lineHeight: '19px',
   '&:hover ': {
      background: '#C4C4C4',
      color: '#F7F7F7',
   },
   '&:hover path': {
      fill: 'white',
   },
   '&:active': {
      background: '#A1A1A1',
   },
   '& .icon': {
      margin: '0',
   },
}));
