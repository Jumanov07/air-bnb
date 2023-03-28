import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, styled } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { signInRequest } from '../../redux/slices/auth.slice';

const validationSchema = Yup.object({
   email: Yup.string().oneOf(
      ['airbnbhomesweethome1@gmail.com'],
      'Email not allowed'
   ),
   password: Yup.string().oneOf(['airbnb'], 'Invalid password'),
});
function AdminSignIn({ isMounted }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const [showPassword, setShowPassword] = React.useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const dispatch = useDispatch();

   const addData = (data) => {
      dispatch(signInRequest(data));
   };

   const handleClose = () => {
      searchParams.delete('modal');
      setSearchParams(searchParams);
   };

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values, action) => {
         addData(values);
         action.resetForm();
      },
   });

   return (
      <ModalStyled open={isMounted} handleClose={handleClose}>
         <ContainerStyled onSubmit={formik.handleSubmit}>
            <TextStyled>SIGN IN</TextStyled>
            <InputStyled
               id="email"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               type="email"
               placeholder="Login"
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
            />
            <InputStyled
               id="password"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               placeholder="Password"
               type={showPassword ? 'text' : 'password'}
               error={
                  formik.touched.password && Boolean(formik.errors.password)
               }
               helperText={formik.touched.password && formik.errors.password}
               endAdornment={
                  <InputAdornment
                     position="end"
                     onClick={handleClickShowPassword}
                  >
                     <IconButton type="button">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               }
            />
            <ButtonStyled
               type="submit"
               disabled={
                  !(
                     formik.values.email === 'airbnbhomesweethome1@gmail.com' &&
                     formik.values.password === 'airbnb'
                  )
               }
            >
               <div>SIGN IN</div>
            </ButtonStyled>
         </ContainerStyled>
      </ModalStyled>
   );
}

export default AdminSignIn;

const TextStyled = styled('h3')(() => ({
   marginTop: '20px',
   marginBottom: '20px',
}));
const ButtonStyled = styled(Button)(() => ({
   width: '414px',
   height: '30px',
   marginTop: '25px',
}));

const InputStyled = styled(Input)(() => ({
   width: '414px',
   height: '39px',
   marginTop: '15px',
}));
const ContainerStyled = styled('form')(() => ({
   width: '474px',
   height: '263px',
   background: '#FFFFFF',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   cursor: 'pointer',
}));
const ModalStyled = styled(Modal)(() => ({
   width: '470px',
   height: '5px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));
