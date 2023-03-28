import { Box, Container, styled } from '@mui/material';
import React, { useState } from 'react';
<<<<<<< HEAD
import Button from '../../UI/Button';
import CreditCardInput from '../../UI/creditPaymentInput/CreditCardInput';
=======

import PaymentInputsWrapper from '../../UI/creditPaymentInput/PaymentCardWrapper';
import Modal from '../../UI/Modal';
>>>>>>> 27ed9a32a7496998a0ab776084995f034e112251

const RequestBook = ({
   startDate = new Date(),
   endDate = new Date(),
   dailyPrice,
   isMounted,
   handleClose,
   signIn,
}) => {
   function dateDifference(startDate = new Date(), endDate = new Date()) {
      const difference = endDate.getTime() - startDate.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      return days;
   }

   const startDataAndEndData = (date) => {
      const dateString = date.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });
      return dateString;
   };
   const startDateObject = new Date(startDate);
   const endDateObject = new Date(endDate);

   const selectedDays = dateDifference(startDateObject, endDateObject);

   const [value, setValue] = useState({
      number: '',
      data: '',
      cvc: '',
   });

   const handleChange = (e) => {
      setValue({ [e.target.name]: e.target.value });
   };

   const amount = dailyPrice * selectedDays;

   return (
      <StyledModal open={isMounted} handleClose={handleClose}>
         <Container>
            <UpperSection>
               <h2>BOOK YOUR TRIP</h2>
               <TextInformation>
                  Enter your payment information to book the listing from the
                  between {startDataAndEndData(startDateObject)}
                  {' to '}
                  {startDataAndEndData(endDateObject)} <br /> inclusive.
               </TextInformation>
            </UpperSection>
            <ContainerForTotal>
               <DivTotalAmount>
                  ${dailyPrice} * {selectedDays} =
                  <DivTotla>${dailyPrice * selectedDays}</DivTotla>
               </DivTotalAmount>
               <DivTotla>Total = ${dailyPrice * selectedDays}</DivTotla>
            </ContainerForTotal>
         </Container>
         <StyledCreditCardInput>
            <PaymentInputsWrapper
               amount={amount}
               signIn={signIn}
               value={value}
               handleClose={handleClose}
               onChange={handleChange}
               cardNumberName={value.number}
               expiryDateName={value.data}
               CVCName={value.cvc}
            />
         </StyledCreditCardInput>
      </StyledModal>
   );
};

export default RequestBook;

const StyledModal = styled(Modal)(() => ({
   margin: 'auto',
   background: 'white',
   width: '474px',
   height: '386px',
   padding: '25px',
}));

const UpperSection = styled('section')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   borderBottom: '1px solid',
}));

const TextInformation = styled('div')(() => ({
   margin: '24px',
   textAlign: 'center',
   width: '424px',
   height: '57px',
   fontSize: '16px',
   color: '#828282',
}));

const ContainerForTotal = styled('div')(() => ({
   textAlign: 'center',
}));

const DivTotalAmount = styled('div')(() => ({
   marginTop: '24px',
   marginBottom: '14px',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
   textAlign: 'center',
   color: '#646464',
}));

const DivTotla = styled('span')(() => ({
   fontStyle: 'normal',
   fontWeight: '600',
   fontSize: '18px',
   lineHeight: '22px',
   color: '#363636',
}));

const StyledCreditCardInput = styled(Box)(() => ({
   marginTop: '16px',
}));
