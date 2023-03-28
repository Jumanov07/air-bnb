import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardInput from './CreditCardInput';

const PaymentInputsWrapper = ({ signIn, amount, handleClose }) => {
   const stripePromise = loadStripe(
      'pk_test_51Mia0AFEUs1xF4Ojso7AR0xIqawv1HV2KoyINXWLDOZyW0VrMYWmvrtJ9CAWPrbwi09A7NByukxPBe9zwsgrPZmK00k2sYjjer'
   );

   return (
      <Elements stripe={stripePromise}>
         <CreditCardInput
            handleClose={handleClose}
            amount={amount}
            signIn={signIn}
         />
      </Elements>
   );
};

export default PaymentInputsWrapper;
