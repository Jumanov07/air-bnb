import { Avatar, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
   deleteUserHomeProfile,
   fetchHomeDetails,
   unBlockHouse,
} from '../../redux/slices/userProfileSlice';
import BreadCrumbs from '../UI/BreadCrumbs';
import Button from '../UI/Button';
import Feedback from '../UI/feedback/Feedback';
import IconButton from '../UI/IconButton';
import PreviewSlider from '../UI/PreviewSlider';
import Rating from '../UI/Rating';

function HomeUserDetails() {
   const { homeDetails } = useSelector((state) => state.userProfile);
   const [valueText, setValueText] = useState(true);
   const { userId, homeId } = useParams();
   const navigate = useNavigate();
   const pahtLocation = useLocation();
   const paths = [
      {
         name: `users/${homeDetails?.owner?.name}`,
         path: `/users/${userId}`,
      },
   ];
   const lastPath = homeDetails.title;

   const {
      location,
      houseType,
      maxOfGuests,
      owner,
      images,
      feedbacks,
      rating,
      blocked,
      id,
      descriptionOfListing,
   } = homeDetails;

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchHomeDetails(homeId));
   }, []);

   const unBlockHandler = (id) => {
      const params = {
         houseId: id,
         housesStatus: 'Blocked',
      };
      dispatch(unBlockHouse({ params }))
         .unwrap()
         .then(() => {
            dispatch(fetchHomeDetails(homeId));
         });
   };

   const deleteHomeHandler = (id) => {
      dispatch(deleteUserHomeProfile(id))
         .unwrap()
         .then(() => {
            navigate(`/users/${userId}`);
         });
   };
   return (
      <StyledBoxContainer>
         <div>
            <BreadCrumbs lastPath={lastPath} paths={paths} />
            <StyledUserName>{lastPath}</StyledUserName>
         </div>
         <div>
            <StyledContainerHotel>
               <PreviewSlider imgs={images} />
               <StyledHameHome>
                  <BoxButton>
                     <StyledIconBotton>{houseType}</StyledIconBotton>
                     <StyledIconBotton>
                        {`guets ${maxOfGuests}`}
                     </StyledIconBotton>
                  </BoxButton>
                  <h3>{homeDetails.title}</h3>
                  <StyledMorris>{`${location?.region} , ${location?.address} , ${location?.townOrProvince}`}</StyledMorris>
                  <StyledP>
                     {valueText
                        ? descriptionOfListing?.slice(0, 100)
                        : descriptionOfListing}
                     {descriptionOfListing?.length >= 200 ? (
                        <StyledSeeButton
                           onClick={() => setValueText(!valueText)}
                        >
                           {valueText ? 'See more' : 'See less'}
                        </StyledSeeButton>
                     ) : null}
                  </StyledP>
                  <StyledAvatar>
                     <Avatar src={owner?.image} alt={owner?.name} />
                     <div>
                        <h4>{owner?.name}</h4>
                        <p>{owner?.email}</p>
                     </div>
                  </StyledAvatar>
                  {pahtLocation.pathname !== '/application' ? (
                     <StyledButtonBox>
                        <StyledDeleteButton
                           onClick={() => deleteHomeHandler(id)}
                        >
                           DELETE
                        </StyledDeleteButton>

                        <StyledBlockButton onClick={() => unBlockHandler(id)}>
                           {blocked ? 'Unblock' : 'Block'}
                        </StyledBlockButton>
                     </StyledButtonBox>
                  ) : (
                     <StyledButtonBox>
                        <StyledDeleteButton>REJECT</StyledDeleteButton>
                        <StyledBlockButton>ACCEPT</StyledBlockButton>
                     </StyledButtonBox>
                  )}
               </StyledHameHome>
            </StyledContainerHotel>
         </div>
         {pahtLocation.pathname !== '/application' ? (
            <>
               <StyledFeedback>FEEDBACK</StyledFeedback>
               <BoxProfile>
                  <StyledBoxMapFeedback>
                     {feedbacks?.length > 0 ? (
                        feedbacks.map((el) => <Feedback key={el.id} {...el} />)
                     ) : (
                        <Feedback />
                     )}
                  </StyledBoxMapFeedback>

                  <Rating ratings={rating} title={rating?.sumOfRating} />
               </BoxProfile>
            </>
         ) : null}
      </StyledBoxContainer>
   );
}

export default HomeUserDetails;
const StyledSeeButton = styled('button')(() => ({
   color: 'blue',
   border: 'none',
   background: 'white',
}));

const StyledBoxMapFeedback = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}));

const StyledFeedback = styled(Typography)(() => ({
   margin: '60px 0px 50px 0px',
   color: '#000000 ',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '24px',
   fontFamily: 'Inter',
}));

const BoxProfile = styled('div')(() => ({
   display: 'flex',
   gap: '127px',
}));

const StyledBlockButton = styled(Button)(() => ({
   width: '196px',
   height: '37px',
}));

const StyledDeleteButton = styled(Button)(() => ({
   background: '#E5E5E5',
   color: '#DD8A08',
   border: '1px solid #DD8A08',
   width: '196px',
   height: '37px',
   ':hover': {
      background: 'none',
   },
}));

const StyledButtonBox = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   marginTop: '57px',
}));
const StyledMorris = styled('p')(() => ({
   margin: '8px 0px 20px 0px',
   color: '#828282',
}));

const StyledAvatar = styled('div')(() => ({
   display: 'flex',
   gap: '16px',
   marginTop: '32px',
   '& p': {
      color: '#828282',
   },
}));

const StyledContainerHotel = styled('div')(() => ({
   display: 'flex',
   gap: '68px',
}));
const StyledHameHome = styled('div')(() => ({
   paddingTop: '32px',
}));
const StyledP = styled('p')(() => ({
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
   fontFamily: 'Inter',
   width: '500px',
}));
const StyledIconBotton = styled(IconButton)(() => ({
   background: '#FFF0F6',
   color: 'black',
   border: '1px solid #FFCBE0',
   marginBottom: '26px',
}));

const BoxButton = styled('div')(() => ({
   display: 'flex',
   gap: '14px',
}));

const StyledBoxContainer = styled('div')(() => ({
   width: '1440px',
   margin: 'auto',
}));

const StyledUserName = styled(Typography)(() => ({
   textTransform: 'uppercase',
   fontSize: '20px',
   paddingTop: '40px',
}));
