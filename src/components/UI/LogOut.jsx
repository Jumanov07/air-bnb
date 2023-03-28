import {
   alpha,
   Avatar,
   Box,
   Button as Btn,
   Menu,
   MenuItem,
   styled,
   Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowToDown } from '../../assets/icons';
import { authActions } from '../../redux/slices/auth.slice';
import { LOGIN_INFO_LS_KEY } from '../../utils/constants/general';
import Button from './Button';
import Modal from './Modal';

const road = {
   main: '/',
   profile: 'main/profile',
   profileMain: 'profile',
   profileHeader: '/main/profile',
};

function LogOut({ counOfLike }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(null);
   const [profileLogo, setProfileLogo] = useState(null);
   const location = useLocation();
   const navigate = useNavigate();
   const { isAuthorized } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   useEffect(() => {
      const userProfileImage = localStorage.getItem('PROFILE_LOGO');
      setProfileLogo(userProfileImage);
   }, []);
   const handleNavigate = () => {
      localStorage.removeItem('PROFILE_LOGO');
      localStorage.removeItem(LOGIN_INFO_LS_KEY);
      dispatch(authActions.logOut());
      navigate(road.main);
      setOpenModal(null);
   };

   const handleNavigateMyProfile = () => {
      if (location.pathname === '/main') {
         navigate(road.profileMain);
      } else if (location.pathname === '/main/region') {
         navigate(road.profileHeader);
      } else if (location.pathname === '/main/addannouncement') {
         navigate(road.profile);
      }
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleClickModal = () => {
      setOpenModal(true);
      setAnchorEl(null);
   };
   const handleCloseModal = () => {
      setOpenModal(false);
   };
   return (
      <StyledBox>
         {isAuthorized ? (
            <Typography textTransform="uppercase" width={30} color="#000000">
               {counOfLike ? `favorite(${counOfLike})` : 'favorite(0)'}
            </Typography>
         ) : null}
         {isAuthorized ? (
            <Image
               onClick={handleClick}
               src={profileLogo}
               alt="profile-photo"
            />
         ) : null}

         <Btn
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={
               !isAuthorized
                  ? { left: '40px', minWidth: '30px' }
                  : { left: '0px' }
            }
         >
            <ArrowToDown onClick={handleClick} />
         </Btn>
         <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
               'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleNavigateMyProfile} disableRipple>
               My profile
            </MenuItem>

            <MenuItem onClick={handleClickModal} disableRipple>
               Log out
            </MenuItem>
         </StyledMenu>

         {openModal && (
            <StyledModal handleClose={handleCloseModal} open>
               <StyledLogOutText>Log out</StyledLogOutText>
               <p>Are you sure you want to Log out?</p>
               <StyledBoxButton>
                  <StyledBtnCancel onClick={handleCloseModal}>
                     Cancel
                  </StyledBtnCancel>
                  <StyledBtnLogout onClick={handleNavigate}>
                     Log out
                  </StyledBtnLogout>
               </StyledBoxButton>
            </StyledModal>
         )}
      </StyledBox>
   );
}

export default LogOut;

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   height: '37px',
   width: '160px',
}));

const Image = styled(Avatar)(() => ({
   cursor: 'pointer',
   left: '70px',
}));
const StyledMenu = styled((props) => (
   <Menu
      elevation={0}
      anchorOrigin={{
         vertical: 'top',
         horizontal: 'left',
      }}
      transformOrigin={{
         vertical: 'bottom',
         horizontal: 'right',
      }}
      {...props}
   />
))(({ theme }) => ({
   '& .MuiPaper-root': {
      width: 180,
      height: 88,
      border: ' 1px solid #C4C4C4',
      color:
         theme.palette.mode === 'light'
            ? 'rgb(55, 65, 81)'
            : theme.palette.grey[300],
      '& .MuiMenu-list': {
         padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
         '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
         },
         '&:active': {
            backgroundColor: alpha(
               theme.palette.primary.main,
               theme.palette.action.selectedOpacity
            ),
         },
      },
   },
}));
const StyledBtnLogout = styled(Button)(() => ({
   width: '196px',
}));

const StyledBtnCancel = styled(Button)(() => ({
   width: '150px',
   color: '#828282',
   background: '#FFFFFF',
   '&:hover': {
      backgroundColor: 'white',
   },
}));

const StyledBoxButton = styled('div')(() => ({
   display: 'flex',
   paddingTop: '43px',
   gap: '10px',
   justifyContent: 'center',
}));

const StyledModal = styled(Modal)(() => ({
   width: '422px',
   height: '191px',
   textAlign: 'center',
   paddingTop: '25px',
}));
const StyledLogOutText = styled('p')(() => ({
   textTransform: 'uppercase',
   color: '#363636',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   paddingBottom: '20px',
}));
