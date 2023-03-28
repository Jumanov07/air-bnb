import { Modal, styled } from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../UI/Button';
import DatePicker from '../UI/DatePicker';
import PaymentWithCards from './PaymentWithCards';

const DateBookings = () => {
   const [date, setDate] = useState([null, null]);
   const [searchParams, setSearchParams] = useSearchParams();

   const hendlerChange = (data) => {
      setDate(data);
   };
   const handleOpen = () => {
      setSearchParams({ isOpen: 'price' });
   };

   const handleCloses = () => {
      setSearchParams();
   };
   const isOpen = searchParams.get('isOpen') === 'price';

   return (
      <div>
         <Container>
            <TextStyled>23/dd</TextStyled>
            <BorederStyled />
            <BoxContainer>
               <p>Check In </p>
               <p>Check out</p>
            </BoxContainer>
            <DatePicker date={date} onChange={hendlerChange} />
            <ButtonStyled onClick={handleOpen}>request to book</ButtonStyled>
         </Container>
         <ModalStyled onClose={handleCloses} open={isOpen}>
            <PaymentWithCards />
         </ModalStyled>
      </div>
   );
};

export default DateBookings;
const ModalStyled = styled(Modal)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   outline: 'none',
   width: '500px',
   height: '510px',
}));
const ButtonStyled = styled(Button)(() => ({
   width: '454px',
   marginTop: '20px',
   marginLeft: '20px',
}));
const Container = styled('div')(() => ({
   width: '500px',
   height: '236px',
}));
const BoxContainer = styled('div')(() => ({
   display: 'flex',
   gap: '200px',
   marginLeft: '30px',
}));
const TextStyled = styled('div')(() => ({
   marginLeft: '200px',
   marginBottom: '30px',
}));
const BorederStyled = styled('div')(() => ({
   border: '1px solid #C4C4C4',
   width: '454px',
   marginLeft: '20px',
   marginBottom: '10px',
}));
