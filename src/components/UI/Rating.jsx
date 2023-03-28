import React from 'react';
import { Stack, LinearProgress, styled } from '@mui/material';
import { StarIcon } from '../../assets/icons';

const numbers = {
   five: 5,
   four: 4,
   three: 3,
   two: 2,
   one: 1,
};

function Rating({ title, ratings = {} }) {
   const ratingsCopy = { ...ratings } || {};
   delete ratingsCopy.sumOfRating;
   const ratingArray = Object.entries(ratingsCopy).map(([key, value]) => {
      return { id: numbers[key], value };
   });

   return (
      <Container>
         <IconStar>
            <Ratings>
               <h2>{title}</h2> <StarIcons />
            </Ratings>
         </IconStar>
         {ratingArray?.map((rating) => {
            return (
               <ContainerRating key={rating.id}>
                  <div>{rating.id}</div>
                  <StackStyled>
                     <LinearProgressStyled
                        color="success"
                        variant="determinate"
                        value={rating.value}
                        valueBuffer={100}
                     />
                  </StackStyled>
                  <Prosent>{rating.value}%</Prosent>
               </ContainerRating>
            );
         })}
      </Container>
   );
}

export default Rating;

const Ratings = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}));

const Prosent = styled('div')(() => ({
   width: '1rem',
}));

const LinearProgressStyled = styled(LinearProgress)(() => ({
   background: '#C4C4C4',
}));
const StarIcons = styled(StarIcon)(() => ({
   marginBottom: '7px',
}));

const IconStar = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}));

const ContainerRating = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

const StackStyled = styled(Stack)(() => ({
   width: '294px',
   marginBottom: '3px',
}));

const Container = styled('div')(() => ({
   width: '424px',
   height: '232px',
   borderRadius: '16px',
   border: '1px solid #C4C4C4',
   display: 'grid',
   padding: ' 20px 30px',
   gap: '6px',
}));
