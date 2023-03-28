import { InputBase } from '@mui/material';
import styled from '@emotion/styled';
import { forwardRef } from 'react';

const FONT_SIZE_INPUT = {
   large: '16px',
   medium: '14px',
   small: '12px',
};
const Input = forwardRef(
   ({ value, onChange, error, size = 'large', ...props }, ref) => {
      return (
         <StyledInput
            classes={{ root: 'input', focused: 'focused', error: 'error' }}
            value={value}
            {...props}
            ref={ref}
            error={error}
            onChange={onChange}
            size={size}
         />
      );
   }
);
export default Input;
const StyledInput = styled(InputBase)((props) => ({
   height: '39px',
   borderRadius: '2px',
   fontFamily: 'Roboto',
   fontStyle: 'normal',
   fontWeight: '400',
   fontSize: FONT_SIZE_INPUT[props.size],
   lineHeight: '19px',
   padding: '10px 16px',
   '&.input': {
      border: '1px solid #C4C4C4',
   },
   '&.input.focused': {
      border: '1px solid #828282',
   },
   '&.input:hover': {
      border: '1px solid #828282',
   },
   '&.input.error': {
      border: '1px solid red',
   },
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
}));
