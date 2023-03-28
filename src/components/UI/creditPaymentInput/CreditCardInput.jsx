import { styled } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postPriceAndDate } from '../../../redux/slices/homeDetail.slice';
import Button from '../Button';

const CreditCardInput = ({ signIn, amount }) => {
   const [error, setError] = useState(null);
   const dispatch = useDispatch();
   const { isAuthorized } = useSelector((state) => state.auth);
   const [, setSearchParams] = useSearchParams();
   const stripe = useStripe();
   const elements = useElements();
   const closeBookTrip = () => setSearchParams({});

   const handleSubmit = async (event) => {
      event.preventDefault();
      const { token, error } = await stripe.createToken(
         elements.getElement(CardElement)
      );

      if (error) {
         setError(error.message);
      } else {
         elements.getElement(CardElement).clear();
      }
      dispatch(postPriceAndDate({ amount, currency: 'USD', token: token.id }));
      closeBookTrip();
   };

   return (
      <StyledBox onSubmit={handleSubmit}>
         <div>
            <CardElement />
         </div>
         <StyledError>{error && <p className="error">{error}</p>}</StyledError>
         {!isAuthorized ? (
            <StyledButton onClick={signIn} type="submit">
               Book
            </StyledButton>
         ) : (
            <StyledButton type="submit">Book</StyledButton>
         )}
      </StyledBox>
   );
};

export default CreditCardInput;

const StyledError = styled('div')(() => ({
   marginTop: '10px',
}));

const StyledButton = styled(Button)(() => ({
   width: '424px',
   marginTop: '22px',
}));

const StyledBox = styled('form')(() => ({
   width: '424px',
   border: '2px solid #C4C4C4',
   height: '39px',
   alignItems: 'center',
   paddingTop: '10px',
   borderRadius: '2px',
}));
