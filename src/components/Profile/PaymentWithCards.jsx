import { styled } from '@mui/material';
import * as React from 'react';
import Button from '../UI/Button';
import CreditCardInput from '../UI/creditPaymentInput/CreditCardInput';

export default function PaymentWithCards() {
   return (
      <Container>
         <div>
            <TitleStyled>
               <h1 className="text">BOOK YOUR TRIP</h1>
               <span>
                  The booking date has been changed, please pay an <br />
                  additional 3 days in the period from April 28, 2022 <br /> to
                  April 30, 2022 inclusive.
               </span>
            </TitleStyled>
            <div>
               <BoxContainer>
                  <DataStyled>From 12.02.22 to 15.02.22</DataStyled>
                  <PriceHome>$240.04 x 3 days =$ 717.09 was paid</PriceHome>
               </BoxContainer>
               <TextContainer>
                  <DataStyled>From 12.02.22 to 15.02.22</DataStyled>
                  <PriceHome>$240.04 x 3 days =$ 717.09</PriceHome>
               </TextContainer>
            </div>
            <PriceStyled>
               <NumberStyled>Total =$1 434.18</NumberStyled>
               <AmountStyled>Payment amount =$717.09</AmountStyled>
            </PriceStyled>
            <CardStyled>
               <CreditCardInput onChange value />
               <ButtonStyled>BOOK</ButtonStyled>
            </CardStyled>
         </div>
      </Container>
   );
}
const Container = styled('div')(() => ({
   width: '500px',
   height: '510px',
   background: '#FFFFFF',
}));
const TitleStyled = styled('div')(() => ({
   textAlign: 'center',
   paddingTop: '25px',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   marginBottom: '10px',
}));
const BoxContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '30px',
   gap: '10px',
   marginBottom: '20px',
}));
const TextContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '30px',
   gap: '10px',
   marginBottom: '30px',
}));
const PriceStyled = styled('div')(() => ({
   marginLeft: '240px',
   marginBottom: '20px',
}));
const CardStyled = styled('div')(() => ({
   marginLeft: '35px',
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}));
const ButtonStyled = styled(Button)(() => ({
   width: '424px',
}));
const DataStyled = styled('p')(() => ({
   color: '#C4C4C4',
}));
const PriceHome = styled('p')(() => ({
   color: '#646464',
}));
const NumberStyled = styled('p')(() => ({
   color: '#828282',
   fontWeight: '600',
}));
const AmountStyled = styled('p')(() => ({
   color: '#363636',
   fontWeight: '600',
   fontSize: '18px',
}));
