import { styled } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo } from '../../assets/icons';
import GoogleSignIn from '../../components/Authorization/GoogleSignIn';
import AdminSignIn from '../../components/Authorization/AdminSignIn';
import LogOut from '../../components/UI/LogOut';
import Button from '../../components/UI/Button';

const HeaderForWelcomePage = ({ buttonInsideText = 'JOIN US' }) => {
   const { isAuthorized } = useSelector((state) => state.auth);
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();
   const openModalHandle = () => setSearchParams({ modal: 'sign-in' });

   const { modal } = Object.fromEntries(searchParams);
   const isSignInWithGoogleModalOpened = modal === 'sign-in';
   const signInAdmin = modal === 'admin-sign-in';

   const handleClose = () => {
      searchParams.delete('modal');
      setSearchParams(searchParams);
   };

   return (
      <HeaderContainer>
         <Logo />
         <DisplayForButtonAndText>
            <LeaveText onClick={() => navigate('addannouncement')}>
               leave an ad
            </LeaveText>
            {!isAuthorized ? (
               <StyledButton onClick={openModalHandle}>
                  {buttonInsideText}
               </StyledButton>
            ) : (
               <LogOut textNon="true" />
            )}
            <GoogleSignIn
               handleClose={handleClose}
               isMounted={isSignInWithGoogleModalOpened}
            />
            <AdminSignIn isMounted={signInAdmin} />
         </DisplayForButtonAndText>
      </HeaderContainer>
   );
};
export default HeaderForWelcomePage;

const StyledButton = styled(Button)(() => ({
   width: '196px',
   height: '37px',
}));

const HeaderContainer = styled('header')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   height: '65px',
   width: '100%px',
   margin: '0px 100px 0px 100px',
}));

const LeaveText = styled('h3')(() => ({
   fontFamily: 'Inter',
   height: '22px',
   color: '#FFFFFF',
   font: '18px',
   paddingRight: '50px',
   cursor: 'pointer',
}));

const DisplayForButtonAndText = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));
