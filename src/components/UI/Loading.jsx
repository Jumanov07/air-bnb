import React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCircularProgress = styled(CircularProgress)({
   color: '#007bff',
   animationName: 'spin',
   animationDuration: '1s',
   animationTimingFunction: 'linear',
   animationIterationCount: 'infinite',
});

const LoaderWrapper = styled('div')((props) => ({
   position: 'absolute',
   left: props.left || '45%',
   top: props.top || '30%',
   justifyContent: 'center',
   height: '100%',
   zIndex: '1',
}));

const LoaderText = styled('p')({
   marginTop: '10px',
   fontSize: '18px',
   fontWeight: 'bold',
});

const Loading = () => {
   return (
      <LoaderWrapper>
         <StyledCircularProgress size={64} />
         <LoaderText>Loading...</LoaderText>
      </LoaderWrapper>
   );
};

export default Loading;
