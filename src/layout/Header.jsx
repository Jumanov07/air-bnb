/* eslint-disable import/no-cycle */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
   Checkbox,
   FormControlLabel,
   InputAdornment,
   TextField,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearctIcon, HeaderIcon } from '../assets/icons';
import Button from '../components/UI/Button';
import GoogleSignIn from '../components/Authorization/GoogleSignIn';
import AdminSignIn from '../components/Authorization/AdminSignIn';
import LogOut from '../components/UI/LogOut';

function Header({ searchValue, setSearchValue }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();

   const openModalHandler = () => {
      setSearchParams({ modal: 'sign-in' });
   };
   const navigateAdd = () => {
      navigate('/main/addannouncement');
   };
   const navigateMain = () => {
      navigate('/');
   };
   const { modal } = Object.fromEntries(searchParams);
   const isSignInWithGooleModalOpened = modal === 'sign-in';
   const signInAdmin = modal === 'admin-sign-in';
   const handleClose = () => {
      searchParams.delete('modal');
      setSearchParams(searchParams);
   };
   const { isAuthorized } = useSelector((state) => state.auth);

   return (
      <MainContainer>
         <IconForHeaderIcon>
            <HeaderIcon onClick={navigateMain} />
         </IconForHeaderIcon>
         {isAuthorized ? (
            ''
         ) : (
            <Text>
               <h3>leave an ad</h3>
            </Text>
         )}
         <StyledLabelCheckbox
            label="Search nearby"
            control={
               <Checkbox
                  style={{
                     color: '#DD8A08',
                  }}
               />
            }
         />
         <InputTextField
            label=""
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            classes={{ root: 'root' }}
            placeholder="Search"
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearctIcon className="searchIcon" />
                  </InputAdornment>
               ),
            }}
         />
         <div style={{ display: 'flex', gap: '30px' }}>
            <Button
               reducer="2px"
               height="37px"
               width="196px"
               onClick={navigateAdd}
            >
               {isAuthorized ? (
                  <div>
                     <div>submit an ad</div>
                  </div>
               ) : (
                  <ButtonInsideText onClick={openModalHandler}>
                     <div>JOIN </div> <div>US</div>
                  </ButtonInsideText>
               )}
            </Button>

            {isAuthorized ? <LogOut /> : ''}

            <GoogleSignIn
               handleClose={handleClose}
               isMounted={isSignInWithGooleModalOpened}
            />
            <AdminSignIn isMounted={signInAdmin} />
         </div>
      </MainContainer>
   );
}
export default Header;

const IconForHeaderIcon = styled('div')(() => ({
   cursor: 'pointer',
}));

const StyledLabelCheckbox = styled(FormControlLabel)(() => ({
   position: 'relative',
   left: '150px',
   ' & .MuiFormControlLabel-label': {
      color: 'black',
   },
}));

const InputTextField = styled(TextField)(() => ({
   position: 'relative',
   left: '70px',
   width: '414px',
   height: '37px',
   borderRadius: '2px',
   border: '1px solid #C4C4C4',
   display: 'flex',
   justifyContent: 'center',
   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}));

const Text = styled('div')(() => ({
   color: '#FFBE58',
   fontSize: '1rem',

   cursor: 'pointer',
}));
const ButtonInsideText = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   width: '56px',
   height: '17px',
   fontSize: '0.800rem',
   lineHeight: '1rem',
   color: '#F7F7F7',
}));

const MainContainer = styled('header')(() => ({
   display: 'flex',
   justifyContent: 'space-evenly',
   background: '#FFFFFF',
   height: '88px',
   width: '100%',
   alignItems: 'center',
}));
