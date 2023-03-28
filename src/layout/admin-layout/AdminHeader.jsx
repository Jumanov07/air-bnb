import { alpha, Button as Btn, Menu, MenuItem, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import adminHeaderIcon from '../../assets/icons/adminHeaderIcon.svg';
import StrelkaAdmin from '../../assets/icons/StrelkaAdmin.svg';
import Button from '../../components/UI/Button';
import { authActions } from '../../redux/slices/auth.slice';
import Modal from '../../components/UI/Modal';

const road = {
   main: '/',
};

function AdminHeader() {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleNavigate = () => {
      localStorage.removeItem('PROFILE_LOGO');
      localStorage.removeItem('@AIR_BNB_LOGIN_INFO');
      dispatch(authActions.logOut());
      navigate(road.main);
      setOpenModal(false);
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
      <StyledBoxHeader>
         <StyledMiniWrapper>
            <IconForHeaderIcon>
               <img src={adminHeaderIcon} alt="" />
            </IconForHeaderIcon>
            <StyledUlBox>
               <li>
                  <NavLink
                     to="/application"
                     style={({ isActive }) => ({
                        color: isActive ? 'red' : 'white',
                     })}
                  >
                     Application
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/users"
                     style={({ isActive }) => ({
                        color: isActive ? 'red' : 'white',
                     })}
                  >
                     Users
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/all-housing"
                     style={({ isActive }) => ({
                        color: isActive ? 'red' : 'white',
                     })}
                  >
                     All housing
                  </NavLink>
               </li>
            </StyledUlBox>
         </StyledMiniWrapper>
         <StyledAdminAdministator>
            <p>Administator</p>
            <Btn
               id="basic-button"
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
               style={{ left: '10px', minWidth: '30px' }}
            >
               <img onClick={handleClick} src={StrelkaAdmin} alt="" />
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
               <MenuItem onClick={handleClickModal} disableRipple>
                  Log out
               </MenuItem>
            </StyledMenu>

            <StyledModal open={openModal}>
               <>
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
               </>
            </StyledModal>
         </StyledAdminAdministator>
      </StyledBoxHeader>
   );
}

export default AdminHeader;
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

const StyledLogOutText = styled('p')(() => ({
   textTransform: 'uppercase',
   color: '#363636',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   paddingBottom: '20px',
}));
const StyledModal = styled(Modal)(() => ({
   width: '422px',
   height: '191px',
   textAlign: 'center',
   paddingTop: '25px',
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
      width: 190,
      height: 48,
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

const StyledAdminAdministator = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
}));
const StyledUlBox = styled('ul')(() => ({
   listStyle: 'none',
   display: 'flex',
   gap: '36px',
   alignItems: 'center',

   '& a': {
      textDecoration: 'none',
      color: 'white',
   },
}));

const IconForHeaderIcon = styled('div')(() => ({
   cursor: 'pointer',
   width: '72px',
   height: '54px',
}));

const StyledBoxHeader = styled('header')(() => ({
   width: '100%',
   height: '82px',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 30px 0 30px',
   alignItems: 'center',
   margin: 'auto',
   background: '#0B0B0B',
   color: 'white',
}));

const StyledMiniWrapper = styled('div')(() => ({
   display: 'flex',
   gap: '83px',
   paddingLeft: '40px',
}));
