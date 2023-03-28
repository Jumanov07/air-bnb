import {
   CardContent,
   Typography,
   Box,
   Button as MuiButton,
   CardActions as MuiCardActions,
   styled,
   CardMedia,
   Menu,
   MenuItem,
   TextareaAutosize,
} from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useEffect } from 'react';

import {
   Link,
   useLocation,
   useNavigate,
   useParams,
   useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   HeartCompletedIcon,
   HeartIcon,
   Location,
   Arrow,
   BookingsIcon,
   SertsaIcon,
} from '../../assets/icons';
import { getUserData, deleteItem } from '../../redux/slices/profilePageSlice';
import Button from './Button';
import { notFoundImage } from '../../assets/images';
import useDrawer from '../../hooks/useDrawer';
import { postFovoriteSlice } from '../../redux/slices/getHouseSlice';
import { getAllFavorites } from '../../redux/slices/announcements.slice';
import Modal from './Modal';
import DateBookings from '../Profile/DateBooKings';

const SimpleNextArrow = ({ onClick, className }) => {
   return <ArrowRight onClick={onClick} className={className} />;
};

const SimplePrevArrow = ({ onClick, className }) => {
   return <ArrowLeft onClick={onClick} className={className} />;
};

const settings = {
   dots: true,
   infinity: true,
   speed: 1000,
   slideToShow: 1,
   slideToScroll: 1,
   nextArrow: <SimpleNextArrow />,
   prevArrow: <SimplePrevArrow />,
};
function HomeCard({
   countOfBooking,
   countOfFavorite,
   checkOut,
   checkIn,
   price,
   houseRating,
   estimation,
   descriptionOfListing,
   maxOfGuests,
   isFavorite,
   isReading,
   images,
   id,
   valueTabs,
   getRequestDate,
   onClick,
   onClicking,
   onClickAccept,
   blocked,
   signIn,
   locationResponse,
}) {
   console.log(blocked, 'blocked');
   const [toggle, setToggle] = useState(isFavorite);
   const [searchParams, setSearchParams] = useSearchParams();
   const { open, anchorEl, handleClick, handleClose } = useDrawer();
   const [opens, setOpens] = useState(false);
   const [valueTextTarea, setValueTextTarea] = useState('');
   const location = useLocation();
   const navigate = useNavigate();
   const { userId } = useParams();
   const dispatch = useDispatch();

   const changeHandler = (id) => {
      dispatch(postFovoriteSlice({ id }));
      setToggle((prev) => !prev);
      dispatch(getAllFavorites());
   };
   const previewEstimation = houseRating / 5;
   const { role, isAuthorized } = useSelector((state) => state.auth);

   const handleOpen = () => {
      setSearchParams({ isOpen: true });
   };

   const handleCloses = () => {
      setSearchParams({});
   };

   useEffect(() => {
      dispatch(getUserData(id));
   }, []);

   const handleDeleteItem = () => {
      const params = getRequestDate();
      dispatch(deleteItem({ id, params }));
   };

   const handleCloseModal = () => {
      setOpens(false);
   };

   const openModalHandler = () => {
      setOpens(true);
   };
   const closeModalHandler = (id) => {
      onClick({ id, valueTextTarea });
      setOpens(false);
   };

   const isOpen = searchParams.get('isOpen');
   return (
      <>
         <StyledModalReject handleClose={handleCloseModal} open={opens}>
            <TextReject>Reject</TextReject>
            <StyledTextarea
               minRows={4}
               placeholder="Write the reason for your rejection"
               value={valueTextTarea}
               onChange={(e) => setValueTextTarea(e.target.value)}
            />
            <StyledButtonBox>
               <CancelButton onClick={handleCloseModal}>CANCEL</CancelButton>
               <SaveButton onClick={() => closeModalHandler(id)}>
                  SEND
               </SaveButton>
            </StyledButtonBox>
         </StyledModalReject>
         <StyledBlocked isBlocked={blocked}>
            <StyledBox data-aos="fade-left" isreading={isReading}>
               <CardContainer>
                  <Slider {...settings}>
                     {images?.length === 0 ? (
                        <MediCard image={notFoundImage} />
                     ) : (
                        images?.map((item) => (
                           <Link to={`${id}`}>
                              <MediCard key={id} image={item}>
                                 {valueTabs === 'My announcement' ? (
                                    <ContainerStyled>
                                       <BoxContainerr>
                                          <BookingsIcon className="bookings" />
                                          <p className="Number">
                                             {countOfFavorite}
                                          </p>
                                       </BoxContainerr>
                                       <BoxContainerr>
                                          <SertsaIcon className="Sertsa" />
                                          <p className="Number">
                                             {countOfBooking}
                                          </p>
                                       </BoxContainerr>
                                    </ContainerStyled>
                                 ) : null}
                              </MediCard>
                           </Link>
                        ))
                     )}
                  </Slider>

                  <ContentCard>
                     <ContainerFlex>
                        <ContainerPrice price={price}>
                           <span className="price">${price} /</span>
                           <span className="day"> day</span>
                        </ContainerPrice>
                        <ContainerMark>
                           <Rating
                              allowFraction
                              readonly
                              iconsCount={1}
                              initialValue={previewEstimation}
                              size={20}
                           />
                           <Estimation>
                              {houseRating}
                              {estimation}
                           </Estimation>
                        </ContainerMark>
                     </ContainerFlex>
                     <StyledDescriptionContainer>
                        <DecsriptText>{descriptionOfListing}</DecsriptText>
                        <StyledAdressContainer color="text.secondary">
                           <Location>{locationResponse?.address}</Location>
                           <p className="address">
                              {locationResponse?.address}
                           </p>
                        </StyledAdressContainer>
                     </StyledDescriptionContainer>
                     <CardActions>
                        <GuestTypography variant="body2" color="text.secondary">
                           {maxOfGuests} guest
                        </GuestTypography>
                        {role !== 'ADMIN' ? (
                           <ButtonFlex>
                              <Link to={`${id}`}>
                                 <ComponentButton>Book</ComponentButton>
                              </Link>
                              {isAuthorized ? (
                                 <ButtonHeard
                                    toggle={toggle?.toString()}
                                    onClick={() => changeHandler(id)}
                                    variant={toggle ? 'outlined' : 'text'}
                                    color={toggle ? 'warning' : 'info'}
                                 >
                                    {toggle ? (
                                       <HeartCompletedIcon />
                                    ) : (
                                       <HeartIcon />
                                    )}
                                 </ButtonHeard>
                              ) : (
                                 <ButtonHeard
                                    toggle={toggle?.toString()}
                                    onClick={signIn}
                                    variant={toggle ? 'outlined' : 'text'}
                                    color={toggle ? 'warning' : 'info'}
                                 >
                                    {toggle ? (
                                       <HeartCompletedIcon />
                                    ) : (
                                       <HeartIcon />
                                    )}
                                 </ButtonHeard>
                              )}
                           </ButtonFlex>
                        ) : (
                           <>
                              <MenuButton
                                 id="demo-positioned-button"
                                 aria-controls={
                                    open ? 'demo-positioned-menu' : undefined
                                 }
                                 aria-haspopup="true"
                                 aria-expanded={open ? 'true' : undefined}
                                 onClick={handleClick}
                              >
                                 {valueTabs === 'My announcement' ? (
                                    <MuiDots />
                                 ) : (
                                    location.pathname === '/profile' && (
                                       <StyledBlockButton>
                                          Blocked
                                       </StyledBlockButton>
                                    )
                                 )}
                                 {location.pathname === '/profile' ? (
                                    <StyledBlockButton>
                                       blocked
                                    </StyledBlockButton>
                                 ) : (
                                    <MuiDots />
                                 )}
                              </MenuButton>
                              <MenuCard
                                 id="demo-positioned-menu"
                                 aria-labelledby="demo-positioned-button"
                                 anchorEl={anchorEl}
                                 open={open}
                                 onClose={handleClose}
                                 anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                 }}
                                 transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                 }}
                              >
                                 {location.pathname === '/application' ? (
                                    <div>
                                       <MenuItem
                                          onClick={() => onClickAccept(id)}
                                       >
                                          Accept
                                       </MenuItem>
                                       <MenuItem onClick={openModalHandler}>
                                          Reject
                                       </MenuItem>
                                       <MenuItem onClick={() => onClicking(id)}>
                                          Delete
                                       </MenuItem>
                                    </div>
                                 ) : null}
                                 {location.pathname === `/users/${userId}` ? (
                                    <div>
                                       <MenuItem onClick={() => onClick(id)}>
                                          {blocked ? 'Unblock' : 'Block'}
                                       </MenuItem>
                                       <MenuItem onClick={() => onClicking(id)}>
                                          Delete
                                       </MenuItem>
                                    </div>
                                 ) : null}
                                 {location.pathname === '/all-housing' ? (
                                    <div>
                                       <MenuItem>Reject</MenuItem>
                                       <MenuItem>Delete</MenuItem>
                                    </div>
                                 ) : null}
                                 {valueTabs === 'My announcement' ? (
                                    <div>
                                       <MenuItem
                                          onClick={() => {
                                             navigate(
                                                `/main/addannouncement/${id}`
                                             );
                                          }}
                                       >
                                          Edit
                                       </MenuItem>
                                       <MenuItem
                                          onClick={() => handleDeleteItem(id)}
                                       >
                                          Delete
                                       </MenuItem>
                                    </div>
                                 ) : (
                                    ''
                                 )}
                              </MenuCard>
                           </>
                        )}
                     </CardActions>
                     {valueTabs === 'Bookings' ? (
                        <div>
                           <DateStyled>
                              <div>
                                 <TextStyled>Check in</TextStyled>
                                 <DateNumber>{checkIn}</DateNumber>
                              </div>
                              <div>
                                 <TextStyled>Check out</TextStyled>
                                 <DateNumber>{checkOut}</DateNumber>
                              </div>
                           </DateStyled>
                           <ButtonStyled onClick={handleOpen}>
                              change
                           </ButtonStyled>
                           <ModalStyled
                              handleClose={handleCloses}
                              open={isOpen}
                           >
                              <DateBookings />
                           </ModalStyled>
                        </div>
                     ) : null}
                  </ContentCard>
               </CardContainer>
            </StyledBox>
         </StyledBlocked>
      </>
   );
}

export default HomeCard;
const StyledButtonBox = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   gap: '10px',
   marginTop: '15px',
   marginLeft: '90px',
}));
const SaveButton = styled(Button)(() => ({
   width: '196px',
}));

const CancelButton = styled('button')(() => ({
   width: '150px',
   background: 'white',
}));

const StyledTextarea = styled(TextareaAutosize)(() => ({
   width: '90%',
   resize: 'none',
   borderColor: '#828282',
   fontSize: '16px',
   marginTop: '25px',
   paddingLeft: '16px',
   paddingTop: '10px',
   marginLeft: '20px',
   '::-webkit-input-placeholder': {
      lineHeight: '10px',
      paddingLeft: '16px',
      fontSize: '16px',
      color: '#828282',
   },
}));

const TextReject = styled('p')(() => ({
   textTransform: 'uppercase',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   textAlign: 'center',
   paddingTop: '25px',
}));

const StyledModalReject = styled(Modal)(() => ({
   width: '479px',
   height: '259px',
}));

const ModalStyled = styled(Modal)(() => ({
   width: '500px',
}));
const ContainerStyled = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   marginLeft: '20px',
   marginTop: '10px',
}));
const BoxContainerr = styled('div')(() => ({
   display: 'flex',
   background: '#1C2E20',
   width: '45px',
   height: '27px',
   borderRadius: '2px',
   '.bookings': {
      marginTop: '5px',
      marginLeft: '7px',
   },
   '.Number': {
      color: '#F7F7F7',
      marginLeft: '2px',
   },
   '.Sertsa': {
      marginTop: '5px',
      marginLeft: '8px',
   },
}));
const DateNumber = styled('div')(() => ({
   width: '100px',
   marginBottom: '10px',
}));
const DateStyled = styled('div')(() => ({
   display: 'flex',
   gap: '70px',
   color: '#363636',
}));
const TextStyled = styled('p')(() => ({
   color: '#646464',
   marginBottom: '10px',
}));

const ButtonStyled = styled(Button)(() => ({
   width: '295px',
   marginLeft: '-20px',
}));

const StyledBlockButton = styled('button')(() => ({
   width: '103px',
   height: '27px',
   background: '#828282',
   color: 'wheat',
}));

const StyledBlocked = styled('div')((props) => ({
   opacity: props.isBlocked ? '0.3' : null,
}));
const MenuButton = styled('button')(() => ({
   border: 'none',
   background: '#F7F7F7',
   cursor: 'pointer',
}));
const MenuCard = styled(Menu)(() => ({
   '& .MuiPaper-root': {
      width: '200px',
   },
   '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
      overflowX: 'unset',
      overflowY: 'unset',
   },
}));
const CardActions = styled(MuiCardActions)(() => ({
   position: 'relative',
   backgroundColor: '#F7F7F7',
   padding: '0',
   display: 'flex',
   justifyContent: 'space-between',
   '& .muibutton': {
      marginLeft: '0px',
   },
}));
const StyledBox = styled(Box)((props) => ({
   border: props.isreading ? '5px solid red' : '',
   height: props.isreading ? '385px' : '',
   width: props.isreading ? '310px' : '',
   borderRadius: props.isreading ? '8px' : '',
   marginBottom: props.isreading ? '30px' : '',
   margin: 'auto',
   background: props.isreading ? 'rgba(255, 0, 0, 0.18)' : '',
}));
const MuiDots = styled(MoreHorizIcon)(() => ({
   color: '#C4C4C4',
}));
const CardContainer = styled(Box)(() => ({
   width: '295px',
   height: '178px',
   margin: 'auto',

   '& .slick-dots li.slick-active button:before': {
      color: '#DD8A08',
   },
   '& .slick-dots': {
      bottom: '10px',
   },
   '& .slick-dots li button': {
      color: 'transparent',
      width: '6px',
      height: '6px',
   },
   '& .slick-dots li button:before': {
      color: 'white',
      opacity: '1',
   },
}));

const ArrowLeft = styled(Arrow)(() => ({
   position: 'absolute',
   left: '10px',
   zIndex: '1',
   width: '32px',
   height: '32px',
   ':hover circle': {
      fill: '#DD8A08',
   },
}));

const ArrowRight = styled(Arrow)(() => ({
   transform: 'rotate(180deg)',
   position: 'absolute',
   right: '10px',
   top: '85px',
   width: '32px',
   height: '32px',
   ':hover circle': {
      fill: '#DD8A08',
   },
}));

const MediCard = styled(CardMedia)(() => ({
   width: '295px',
   height: '178px',
   marginTop: '5px',
   ':hover': {
      opacity: '0.90',
   },
}));

const StyledAdressContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '6px',

   '& .address': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
   },
}));

const Estimation = styled(Typography)(() => ({
   color: '#FFFFFF',
}));

const StyledDescriptionContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   rowGap: '8px',
}));

const ButtonHeard = styled(MuiButton)(() => ({
   minWidth: '45px',
}));

const ButtonFlex = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
}));

const GuestTypography = styled(Typography)(() => ({
   width: '57px',
   height: '17px',
}));

const ContentCard = styled(CardContent)(() => ({
   backgroundColor: '#F7F7F7',
   padding: '20px',
   display: 'flex',
   flexDirection: 'column',
   rowGap: '18px',
   '&:last-child': {
      paddingBottom: '20px',
   },
}));

const ComponentButton = styled(Button)(() => ({
   width: '103px',
   height: '27px',
   padding: '0',
   display: 'inlineBlock',
   verticalAlign: 'middle',
   lineHeight: 'normal',
}));

const DecsriptText = styled(Typography)(() => ({
   fontWeight: '400',
   fontSize: '16px',
   width: '100%',
   textOverflow: 'ellipsis',
   overflow: 'hidden',
   whiteSpace: 'nowrap',
}));

const ContainerFlex = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}));

const ContainerPrice = styled('div')(() => ({
   '& .price': {
      width: '34px',
      height: '22px',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: ' 400',
      fontSize: ' 18px',
      lineHeight: '22px',
      textTransform: 'uppercase',
      color: '#000000',
   },
   '& .day': {
      width: '28px',
      height: '19',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineheight: '19px',
      color: '#6C6C6C',
   },
}));

const ContainerMark = styled('div')(() => ({
   width: '62px',
   background: ' #828282',
   borderRadius: '2px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   columnGap: '4px',
}));
