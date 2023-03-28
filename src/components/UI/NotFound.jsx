import { styled } from '@mui/material';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
   return (
      <StyledNotFound className="not-found">
         <div className="icon">
            <FaExclamationTriangle />
         </div>
         <h2 className="heading">Oops! Component not found.</h2>
      </StyledNotFound>
   );
};

export default NotFound;

const StyledNotFound = styled('div')((props) => ({
   position: 'absolute',
   left: props.left || '350px',
   top: props.top || '',
   bottom: props.bottom || '',
   right: props.right || '',
   height: ' 100vh',
   fontSize: '2rem',
   color: '#555',
   textShadow: '1px 1px #ccc',

   '& .not-found .icon': {
      fontSize: '5rem',
      marginRight: '2rem',
   },

   '& .not-found .heading': {
      fontSize: '2.5rem',
      fontWeight: ' 500',
      margin: '0',
   },
}));
