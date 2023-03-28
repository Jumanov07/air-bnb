import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { useSelector } from 'react-redux';

function Profile({ user, contact }) {
   const { role } = useSelector((state) => state.auth);
   return (
      <StyledBox>
         <StayledAvatar />
         <StyledUser>Name: {user}</StyledUser>
         <StyledContact> Contact: {contact}</StyledContact>
         {role === 'ADMIN' ? null : <StyledButton>Log out</StyledButton>}
      </StyledBox>
   );
}
export default Profile;

const StyledButton = styled('div')(() => ({
   color: ' #FF4B4B',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '19px',
   paddingLeft: '38px',
   paddingTop: '15px',
}));
const StyledBox = styled('div')((props) => ({
   width: props.width || '372px',
   height: props.height || '285px',
   borderRadius: '16px',
   border: '1px solid #C4C4C4',
   paddingTop: '38px',
}));

const StayledAvatar = styled(Avatar)(() => ({
   width: '75px',
   height: '75px',
   background: 'blue',
   margin: 'auto',
}));
// `;
const StyledUser = styled('div')(() => ({
   paddingTop: '30px',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   paddingLeft: '54px',
}));
//
const StyledContact = styled('div')(() => ({
   paddingTop: '12px',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   paddingLeft: '38px',
}));
