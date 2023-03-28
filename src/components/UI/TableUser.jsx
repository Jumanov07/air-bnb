/* eslint-disable no-unused-vars */
import {
   TableContainer,
   Table,
   TableBody,
   Paper,
   styled,
   TableRow,
   TableCell,
   LinearProgress,
   Box,
   Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nameData } from '../../utils/constants/generalForTable';
import { TableIcon } from '../../assets/icons';
import {
   deleteUser,
   fetchTableUser,
} from '../../redux/slices/userInAdminSlice';

function TableUser() {
   const dispatch = useDispatch();

   const { users, isLoading, error } = useSelector(
      (state) => state.userInAdmin
   );

   const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
   };
   useEffect(() => {
      dispatch(fetchTableUser());
   }, [dispatch]);

   return (
      <BoxContainer>
         <TableContainerStyled component={Paper}>
            <SyledTypography>users</SyledTypography>
            <Table>
               {nameData.map((el) => {
                  return (
                     <TableRowStyled key={el.id}>
                        <TableCell>{el.numer}</TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell>{el.contact}</TableCell>
                        <TableCell>{el.bookings}</TableCell>
                        <TableCell>{el.announcement}</TableCell>
                        <TableCell align="center">{el.action}</TableCell>
                     </TableRowStyled>
                  );
               })}
               <TableBody>
                  {isLoading ? (
                     <Box sx={{ width: '1000%' }}>
                        <LinearProgress />
                     </Box>
                  ) : (
                     error
                  )}
                  {users.map((el, index) => {
                     return (
                        <TableStyled key={el.id}>
                           <TableCell>{index + 1}</TableCell>
                           <TableCell>
                              <Link to={`${el.id}`}>{el.name}</Link>
                           </TableCell>
                           <TableCell>{el.email}</TableCell>
                           <TableCell>{el.bookings}</TableCell>
                           <TableCell>{el.announcements}</TableCell>
                           <TableCell align="center">
                              <TableIcon
                                 onClick={() => deleteUserHandler(el.id)}
                              />
                           </TableCell>
                        </TableStyled>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainerStyled>
      </BoxContainer>
   );
}

export default TableUser;

const SyledTypography = styled(Typography)(() => ({
   textTransform: 'uppercase',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '20px',
   paddingBottom: '20px',
}));

const BoxContainer = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   paddingTop: '50px',
}));

const TableContainerStyled = styled(TableContainer)(() => ({
   width: '1360px',
}));

const TableRowStyled = styled(TableRow)(() => ({
   width: '100%',
   height: '37px',
   backgroundColor: '#646464',
   color: '#FFFFFF',
   fontWeight: '500',
   fontSize: '14px',
   lineHeight: '17px',
}));

const TableStyled = styled(TableRow)(() => ({
   width: '100%',
   height: '54px',
   background: '#F3F3F3',
   fontWeight: '400',
   fontSize: '18px',
   lineHeight: '22px',
   '&:nth-of-type(odd)': {
      background: '#D8D8D8',
   },
}));
