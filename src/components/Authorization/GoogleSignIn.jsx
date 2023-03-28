import { styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GoogleIcon } from '../../assets/icons';
import { signInViaGoogleRequest } from '../../redux/slices/auth.slice';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

function GoogleSignIn({ isMounted, handleClose }) {
   const dispatch = useDispatch();

   const [, setSearchParams] = useSearchParams();

   const signInHandler = () =>
      dispatch(signInViaGoogleRequest()).then(() => handleClose());

   return (
      <ModalStyled open={isMounted} handleClose={handleClose}>
         <Container>
            <Title>JOIN US</Title>
            <TextStyled>
               Sign in with Google to start booking available listings!
            </TextStyled>
            <ButtonStyled onClick={signInHandler}>
               <GoogleIcon />
               <div>Google</div>
            </ButtonStyled>
            <Linkk onClick={() => setSearchParams({ modal: 'admin-sign-in' })}>
               log in as admin
            </Linkk>
         </Container>
      </ModalStyled>
   );
}

export default GoogleSignIn;

const TextStyled = styled('p')(() => ({
   color: '#828282',
   marginBottom: '30px',
}));
const Title = styled('h3')(() => ({
   color: '#000000',
   marginBottom: '20px',
   marginTop: '15px',
}));
const Linkk = styled('a')(() => ({
   border: 'none',
   color: '#266BD3',
   background: '#FFFFFF',
   textDecoration: 'underline',
   cursor: 'pointer',
}));
const ButtonStyled = styled(Button)(() => ({
   width: '424px',
   height: '50px',
   color: '#000000',
   background: '#FFFFFF',
   '&: hover': {
      background: '#FFFFFF',
   },
   border: '2px solid #C4C4C4',
   borderRadius: '8px',
   marginBottom: '40px',
   columnGap: '20px',
}));

const ModalStyled = styled(Modal)(() => ({
   width: '474px',
   height: '0px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));
const Container = styled('div')(() => ({
   width: '474px',
   height: '238px',
   background: '#FFFFFF',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}));
