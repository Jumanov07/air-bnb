import { Box, Container, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeCard from '../../components/UI/HomeCard';
import {
   applicationAccept,
   applicationReject,
   deleteApplicationHome,
   getAllApplication,
} from '../../redux/slices/announcements.slice';

function ApplicationAdmin() {
   const dispatch = useDispatch();
   const { applications } = useSelector((state) => state.announcements);
   // console.log(applications, 'shamil');

   useEffect(() => {
      const params = {
         page: 1,
         pageSize: 10,
      };
      dispatch(getAllApplication(params));
   }, []);

   const acceptHouseHandler = (id) => {
      const paramsAccept = {
         houseId: id,
         housesStatus: 'Accept',
      };
      dispatch(applicationAccept({ paramsAccept }))
         .unwrap()
         .then(() => {
            const params = {
               page: 1,
               pageSize: 10,
            };
            dispatch(getAllApplication(params));
         });
   };

   const rejectHomeHandler = ({ id, valueTextTarea }) => {
      const data = {
         id,
         valueTextTarea,
         housesStatus: 'Reject',
      };

      dispatch(applicationReject({ data }))
         .unwrap()
         .then(() => {
            const params = {
               page: 1,
               pageSize: 10,
            };
            dispatch(getAllApplication(params));
         });
   };

   const deleteApplicationCardHandler = (id) => {
      dispatch(deleteApplicationHome(id))
         .unwrap()
         .then(() => {
            const params = {
               page: 1,
               pageSize: 10,
            };
            dispatch(getAllApplication(params));
         });
   };

   return (
      <StyledContainer>
         <StyledTypography variant="span">Application</StyledTypography>
         <StyledBox>
            {applications.houseResponseForAdmins?.map((application) => (
               <HomeCard
                  key={application.id}
                  {...application}
                  onClickAccept={acceptHouseHandler}
                  isReading={application.watchedOrNot}
                  onClick={rejectHomeHandler}
                  onClicking={deleteApplicationCardHandler}
               />
            ))}
         </StyledBox>
      </StyledContainer>
   );
}

export default ApplicationAdmin;

const StyledContainer = styled(Container)(() => ({
   maxWidth: '1400px !important',
   paddingTop: '50px',
}));

const StyledTypography = styled(Typography)(() => ({
   textTransform: 'uppercase',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '74px',
   paddingLeft: '20px',
}));

const StyledBox = styled(Box)(() => ({
   marginTop: '22px',
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   rowGap: '50px',
}));
