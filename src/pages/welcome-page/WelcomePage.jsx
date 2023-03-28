import React from 'react';
import {
   Box,
   Checkbox,
   FormControlLabel,
   InputAdornment,
   styled,
   TextField,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import HeaderForWelcomePage from './HeaderForWelcomePage';

import welcomeImage from '../../assets/images/imageForWelcomePage.png';

import { SearctIcon } from '../../assets/icons';

const WelcomePage = () => {
   const location = useLocation();
   return (
      <MainImage url={welcomeImage}>
         {location.pathname === '/main' ? <HeaderForWelcomePage /> : null}
         <MainDiv>
            <Section>
               <Title data-aos="fade-down">
                  FIND A PLACE YOU`LL LOVE TO STAY AT
               </Title>
               <InputTextField
                  label=""
                  classes={{ root: 'root' }}
                  placeholder="Region, city, apartment, house..."
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <SearctIcon className="searchIcon" />
                        </InputAdornment>
                     ),
                  }}
               />
               <StyledLabelCheckbox
                  label="Искать поблизости"
                  control={<Checkbox style={{ color: '#DD8A08' }} />}
               />
            </Section>
         </MainDiv>
      </MainImage>
   );
};
export default WelcomePage;

const MainDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100%',
}));

const InputTextField = styled(TextField)(() => ({
   width: '725px',
   height: '42px',
   backgroundColor: '#F7F7F7',
   borderRadius: '2px',
   display: 'flex',
   justifyContent: 'center',
   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}));

const MainImage = styled(Box)((props) => ({
   backgroundImage: `url(${props.url})`,
   backgroundSize: 'cover',
   height: '100vh',
   width: '100%',
   paddingTop: '28px',
}));

const StyledLabelCheckbox = styled(FormControlLabel)(() => ({
   position: 'relative',
   left: '540px',
   ' & .MuiFormControlLabel-label': {
      color: 'white',
   },
}));

const Section = styled('section')(() => ({
   width: '725px',
   height: '140px',
   alignItems: 'center',
}));

const Title = styled('h1')(() => ({
   position: 'relative',
   bottom: '30px',
   left: '20px ',
   color: 'white',
   fontSize: '35px',
}));
