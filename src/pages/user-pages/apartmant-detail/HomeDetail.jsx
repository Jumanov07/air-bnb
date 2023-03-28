import React, { useState, useEffect } from 'react';
import {
   Avatar,
   Container,
   styled,
   Typography,
   Button as MuiButton,
} from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailOfHouse } from '../../../redux/slices/homeDetail.slice';
import Button from '../../../components/UI/Button';
import DatePicker from '../../../components/UI/DatePicker';
import Feedback from '../../../components/UI/feedback/Feedback';
import IconButton from '../../../components/UI/IconButton';
import PreviewSlider from '../../../components/UI/PreviewSlider';
import Rating from '../../../components/UI/Rating';
import { HeartCompletedIcon, HeartIcon } from '../../../assets/icons';
import RequestBook from '../../../components/Authorization/book/RequestBook';
import BreadCrumbs from '../../../components/UI/BreadCrumbs';
import AutoScroll from '../../../utils/helpers/AutoScroll';
import { postFovoriteSlice } from '../../../redux/slices/getHouseSlice';
import GoogleSignIn from '../../../components/Authorization/GoogleSignIn';
import LeaveFeedback from '../../leave-feedback/LeaveFeedback';

function HomeDetail() {
   const [date, setDate] = useState([null, null]);
   const [toggle, setToggle] = useState(false);
   const { pageData } = useSelector((state) => state.homeDetail);
   const { isAuthorized } = useSelector((state) => state.auth);
   const [openSignIn, setOpenSignIn] = useState(null);
   const [valueText, setValueText] = useState(true);

   const params = useParams();

   const [searchParams, setSearchParams] = useSearchParams();
   const dispatch = useDispatch();

   const signIn = () => {
      setOpenSignIn(true);
   };
   const closeSignIn = () => {
      setOpenSignIn(false);
   };

   const openFeedBackModal = () => setSearchParams({ feedback: true });
   const closeFeedBackModal = () => setSearchParams({});
   const isFeedBackOpen = searchParams.get('feedback');

   const openModalHandle = () => setSearchParams({ bookTrip: true });

   const closeBookTrip = () => setSearchParams({});
   const openBookTrip = searchParams.get('bookTrip');

   const toggleHandler = () => {
      dispatch(postFovoriteSlice({ id: params.id }));
      setToggle((prev) => !prev);
   };

   const {
      houseType,
      maxOfGuests,
      title,
      descriptionOfListing,
      location,
      price,
      images,
      owner,
      feedbacks,
      rating,
      bookingResponse,
      id,
   } = pageData;

   const hendlerHansge = (value) => {
      setDate(value);
   };

   const paths = [
      {
         name: `main`,
         path: '/',
         prevName: 'region',
         prevPath: '/main/region',
      },
   ];
   const lastPath = 'hotel';
   // const Invalid = 'Invalid Date';

   useEffect(() => {
      dispatch(getDetailOfHouse(params.id));
   }, []);
   return (
      <StyledBoxContainer>
         <AutoScroll />
         <StyledBreadCrumbs paths={paths} lastPath={lastPath} />
         <StyledName>{title}</StyledName>
         <StyledContainerSlider>
            <PreviewSlider imgs={images} />
            <div>
               <BoxButton>
                  <StyledButton>{houseType}</StyledButton>
                  <StyledButton>{maxOfGuests} Guests</StyledButton>
               </BoxButton>
               <StyledNameOfHotel>{title}</StyledNameOfHotel>
               <StyledNameOfDate>{` ${location?.region},${location?.address},${location?.townOrProvince}`}</StyledNameOfDate>
               <StyledP>
                  {valueText
                     ? descriptionOfListing?.slice(0, 100)
                     : descriptionOfListing}
                  {descriptionOfListing?.length >= 200 ? (
                     <StyledSeeButton onClick={() => setValueText(!valueText)}>
                        {valueText ? 'See more' : '  See less'}
                     </StyledSeeButton>
                  ) : null}
               </StyledP>
               <StyledAvatar>
                  <Avatar src={owner?.image} />
                  <div>
                     <h4>{owner?.name}</h4>
                     <p>{owner?.email}</p>
                  </div>
               </StyledAvatar>
               <StyledBox>
                  <StyledPrice>{price}$/day</StyledPrice>
                  <StyledLine> </StyledLine>
                  <StyledDate1>
                     <StyledCheck>
                        <span>Check in</span>
                        <div>Check out</div>
                     </StyledCheck>
                     {bookingResponse ? (
                        <StyledCheck>
                           <span>24.09.1695</span>
                           <div>28092023</div>
                        </StyledCheck>
                     ) : (
                        <DatePicker date={date} onChange={hendlerHansge} />
                     )}
                  </StyledDate1>
                  <StyledYouHave>
                     You have to be signed in to book a listing!
                  </StyledYouHave>
                  <div style={{ display: 'flex', marginTop: '30px' }}>
                     {!bookingResponse ? (
                        <>
                           {' '}
                           <UiButton
                              onClick={isAuthorized ? openModalHandle : signIn}
                           >
                              request to book
                           </UiButton>
                           <MuiButton
                              style={{
                                 border: !toggle ? '2px solid' : null,
                              }}
                              variant={!toggle ? 'outlined' : 'text'}
                              color={!toggle ? 'warning' : 'info'}
                              onClick={isAuthorized ? toggleHandler : signIn}
                           >
                              {toggle ? (
                                 <HeartCompletedIcon
                                    height="25px"
                                    width="25px"
                                 />
                              ) : (
                                 <HeartIcon height="25px" width="25px" />
                              )}
                           </MuiButton>{' '}
                        </>
                     ) : (
                        <UiButton>change the date</UiButton>
                     )}
                  </div>
               </StyledBox>
            </div>
         </StyledContainerSlider>
         <StyledFeedback variant="h5">Feedback</StyledFeedback>
         <StyledInFeedback>
            <StyledBoxMapFeedback>
               {feedbacks?.length > 0 ? (
                  feedbacks?.map((el) => (
                     <Feedback signIn={signIn} key={el.id} {...el} />
                  ))
               ) : (
                  <Feedback />
               )}
            </StyledBoxMapFeedback>
            <div>
               <Rating ratings={rating} title={rating?.sumOfRating} />
               {!bookingResponse ? (
                  <StyledBtn
                     onClick={isAuthorized ? openFeedBackModal : signIn}
                  >
                     leave feedback
                  </StyledBtn>
               ) : null}
            </div>

            <LeaveFeedback
               id={id}
               date={date}
               handleClose={closeFeedBackModal}
               open={isFeedBackOpen}
            />
            <RequestBook
               signIn={signIn}
               isMounted={openBookTrip}
               handleClose={closeBookTrip}
               startDate={date[0]}
               endDate={date[1]}
               dailyPrice={price}
            />

            <GoogleSignIn handleClose={closeSignIn} isMounted={openSignIn} />
         </StyledInFeedback>
      </StyledBoxContainer>
   );
}
export default HomeDetail;

const StyledBreadCrumbs = styled(BreadCrumbs)(() => ({
   marginRight: '160px',
   lineHeight: '50px',
   '& .MuiBreadcrumbs-root': {
      marginRight: '60px',
      lineHeight: '50px',
   },
}));

const StyledBtn = styled(Button)(() => ({
   width: '423px',
   height: '37px',
   color: '#828282',
   background: 'white',
   border: '1px solid #828282',
   fontWeight: '500',
   fontSize: '16px',
   marginTop: '20px',
   '&:hover': {
      background: '#F0F8FF',
   },
}));

const StyledCheck = styled('div')(() => ({
   display: 'flex',
   gap: '180px',
   marginLeft: '20px',
}));
const StyledBoxMapFeedback = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '50px',
   marginLeft: '20px',
}));
const StyledDate1 = styled('div')(() => ({
   marginTop: '25px',
}));
const StyledInFeedback = styled('div')(() => ({
   display: 'flex',
   gap: '48px',
}));
const StyledFeedback = styled(Typography)(() => ({
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '84px',
   width: '105px',
   marginLeft: '20px',
   textTransform: 'uppercase',
}));
const StyledPrice = styled('div')(() => ({
   color: '#6C6C6C',
   paddingTop: '10px',
}));
const StyledYouHave = styled('div')(() => ({
   color: '#828282',
   marginTop: '20px',
}));
const StyledLine = styled('div')(() => ({
   width: '374px',
   height: '10px',
   borderBottom: '1px solid #C4C4C4',
   marginLeft: '40px',
}));
const StyledNameOfDate = styled('p')(() => ({
   color: '#363636;',
   marginTop: '30px',
}));
const StyledNameOfHotel = styled('h2')(() => ({
   color: ' #000000;',
   marginTop: '40px',
}));
const StyledBox = styled('div')(() => ({
   width: '494px',
   height: '222px',
   background: 'rgb(251, 246, 246)',
   borderRadius: '2px',
   textAlign: 'center',
   marginTop: '20px',
}));
const StyledAvatar = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   marginTop: '20px',
}));
const StyledButton = styled(IconButton)(() => ({
   background: '#FFF0F6',
   border: '1px solid #FFCBE0',

   height: '17px',
   fontWeight: '400',
   fontSize: '14px',
}));
const BoxButton = styled('div')(() => ({
   display: 'flex',
   gap: '14px',
   marginTop: '35px',
}));
const StyledContainerSlider = styled('div')(() => ({
   display: 'flex',
   gap: '68px',
}));

const UiButton = styled(Button)(() => ({
   width: '423px',
   height: '37px',
   marginRight: '50px',
}));
const StyledName = styled('h2')(() => ({
   color: '#000000',
   marginTop: '30px',
   marginLeft: '20px',
}));
const StyledBoxContainer = styled(Container)(() => ({
   height: '100%',
   margin: 'auto',
   maxWidth: '1400px !important',
   marginBottom: '100px',
   '& .MuiTypography-root': {
      marginTop: '20px',
      marginLeft: '20px',
   },
}));

const StyledP = styled('p')(() => ({
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
   fontFamily: 'Inter',
   width: '500px',
}));

const StyledSeeButton = styled('button')(() => ({
   color: 'blue',
   border: 'none',
   background: 'white',
   cursor: 'pointer',
   marginLeft: '10px',
}));
