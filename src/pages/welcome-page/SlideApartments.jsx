import React, { useEffect, useState } from 'react';
import { Box, CardMedia, styled, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Location, ArrowLeft, ArrowRight } from '../../assets/icons';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import NotFound from '../../components/UI/NotFound';
import { getLastesData } from '../../redux/slices/getLatesHouses';

const SimpleNextArrow = ({ onClick, className, lastest }) => {
   return (
      <ArrowR
         onClick={onClick}
         className={className}
         lastest={lastest?.toString()}
      />
   );
};

const SimplePrevArrow = ({ onClick, className, lastest }) => {
   return (
      <ArrowL
         onClick={onClick}
         className={className}
         lastest={lastest?.toString()}
      />
   );
};

function SlideApartments({ lastest, description, title }) {
   const { lastestData } = useSelector((state) => state.getLatesData);
   const [slideState, setSlideState] = useState({
      currentIndex: 0,
      selectedImage: lastestData?.[0]?.images?.[0] || null,
      addressValue: lastestData?.[0]?.locationResponse?.address || null,
      descriptionValue: lastestData?.[0]?.description || null,
   });

   if (!slideState.descriptionValue && lastestData?.[0]?.description) {
      slideState.descriptionValue = lastestData[0].description;
   }
   if (
      !slideState.addressValue &&
      lastestData?.[0]?.locationResponse?.address
   ) {
      slideState.addressValue = lastestData?.[0]?.locationResponse.address;
   }

   const dispatch = useDispatch();
   const settings = {
      infinity: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: (
         <SimpleNextArrow lastest={lastest} onClick={handleNextArrowClick} />
      ),
      prevArrow: (
         <SimplePrevArrow lastest={lastest} onClick={handlePrevArrowClick} />
      ),
      initialSlide: slideState.currentIndex,
      afterChange: (index) => {
         setSlideState({
            ...slideState,
            currentIndex: index,
            selectedImage: lastestData[index]?.images[0] || null,
            addressValue: lastestData[index]?.locationResponse?.address || null,
            descriptionValue: lastestData[index]?.description || null,
         });
      },
   };

   const handleSlideclick = (image, address, description) => {
      setSlideState({
         ...slideState,
         selectedImage: image,
         addressValue: address,
         descriptionValue: description,
      });
   };

   function handleNextArrowClick() {
      const nextIndex = slideState.currentIndex + 1;
      if (nextIndex >= 0 && nextIndex < lastestData.length) {
         setSlideState({
            ...slideState,
            currentIndex: nextIndex,
            selectedImage: lastestData[nextIndex]?.images || null,
            addressValue:
               lastestData[nextIndex]?.locationResponse?.address || null,
            descriptionValue: lastestData[nextIndex]?.description || null,
         });
      }
   }

   function handlePrevArrowClick() {
      const prevIndex = slideState.currentIndex - 1;
      if (prevIndex >= 0 && prevIndex < lastestData.length) {
         setSlideState({
            ...slideState,
            currentIndex: prevIndex,
            selectedImage: lastestData[prevIndex]?.images[0] || null,
            addressValue:
               lastestData[prevIndex]?.locationResponse?.address || null,
            descriptionValue: lastestData[prevIndex]?.description || null,
         });
      }
   }

   useEffect(() => {
      dispatch(getLastesData());
   }, [dispatch]);

   const navigate = useNavigate();

   const handleLastestClick = () => {
      navigate({
         search: 'popular-or-latest=The latest',
         pathname: 'region',
      });
   };
   const handlePapulartClick = () => {
      navigate({
         search: 'popular-or-latest=Popular',
         pathname: 'region',
      });
   };

   const handleReadMoreClick = () => {
      navigate({
         search: '',
         pathname: '',
      });
   };

   return (
      <StyledBox lastest={lastest?.toString()} data-aos="zoom-in-down">
         <MainWords>
            <FirstWords lastest={lastest?.toString()}>
               {lastest ? (
                  <Typography>the lastest</Typography>
               ) : (
                  'Popular Apartments'
               )}
            </FirstWords>
            {lastest ? (
               <ViewAll
                  lastest={lastest?.toString()}
                  onClick={handleLastestClick}
               >
                  View all
               </ViewAll>
            ) : (
               <ViewAll
                  lastest={lastest?.toString()}
                  onClick={() => handlePapulartClick()}
               >
                  View all
               </ViewAll>
            )}
         </MainWords>
         <StyledAction>
            {slideState.selectedImage && (
               <MediaCard image={slideState.selectedImage} />
            )}
            {!slideState.selectedImage && lastestData?.[0]?.images?.[0] && (
               <MediaCard image={lastestData?.[0]?.images?.[0]} />
            )}
            <ContainerWords data-aos="fade-up">
               <Title lastest={lastest?.toString()}>{title}</Title>
               <Description lastest={lastest?.toString()}>
                  {description}
               </Description>
               <Address>
                  <Typography component="span">
                     <Location />
                  </Typography>
                  {slideState.addressValue && (
                     <Typography component="span">
                        {slideState.addressValue}
                     </Typography>
                  )}
               </Address>
               {lastest ? (
                  slideState.descriptionValue && (
                     <Styleddescription>
                        {slideState.descriptionValue}
                     </Styleddescription>
                  )
               ) : (
                  <div>
                     {slideState.descriptionValue && (
                        <PapularDescription>
                           {slideState.descriptionValue}
                        </PapularDescription>
                     )}
                  </div>
               )}
               <ReadMore
                  onClick={() => handleReadMoreClick()}
                  lastest={lastest?.toString()}
               >
                  Read more
               </ReadMore>
            </ContainerWords>
            <ContainerImage data-aos="fade-left">
               <Slider {...settings}>
                  {lastestData.length > 0 ? (
                     lastestData?.map((item) => (
                        <Typography key={item?.images}>
                           <ImageAction
                              image={item?.images}
                              onClick={() =>
                                 handleSlideclick(
                                    item?.images[0],
                                    item?.locationResponse?.address,
                                    item?.description
                                 )
                              }
                           />
                        </Typography>
                     ))
                  ) : (
                     <NotFound />
                  )}
               </Slider>
               <Estimation lastest={lastest?.toString()}>
                  {`0${slideState.currentIndex + 1}`} /{' '}
                  {`0${lastestData?.length}`}
               </Estimation>
            </ContainerImage>
         </StyledAction>
      </StyledBox>
   );
}

export default SlideApartments;

const StyledBox = styled(Box)((props) => ({
   background: props.lastest ? '#E5E5E5' : ' #4F7755',
   width: '100%',
   height: '880px',
}));

const MainWords = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'flex-end',
   width: '100%',
   height: '150px',
   gap: '820px',
   fontFamily: 'Inter',
   fontStyle: 'normal',
}));

const FirstWords = styled('div')((props) => ({
   fontWeight: '500,',
   fontSize: '20px',
   lineHeight: '24px',
   textTransform: 'uppercase',
   color: props.lastest ? ' #363636' : '#F7F7F7',
}));

const ViewAll = styled(Typography)((props) => ({
   cursor: 'pointer',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '19px',
   textDecorationLine: 'underline',
   color: props.lastest ? '#363636' : '#FFBE58',
   width: '220px',
}));

const StyledAction = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-evenly',
   marginTop: '60px',
}));

const MediaCard = styled(CardMedia)(() => ({
   width: '525px',
   height: '456px',
}));

const ContainerWords = styled(Box)(() => ({
   height: '350px',
   marginTop: '50px',
   fontFamily: 'Inter',
   fontStyle: 'normal',
}));

const Title = styled(Typography)((props) => ({
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '60px',
   color: props.lastest ? '#363636' : ' #FFFFFF',
}));

const Description = styled(Typography)((props) => ({
   fontWeight: '400',
   fontSize: '16px',
   color: props.lastest ? '#6A6A6A' : '#F7F7F7',
   width: '309px',
   height: '105px',
   lineHeight: '130%',
}));

const Address = styled(Box)(() => ({
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '30px',
   color: '#97C69E',
   width: '270px',
   '& :nth-of-type(2)': {
      marginTop: '5px',
      marginLeft: '5px',
   },
}));

const ReadMore = styled(Typography)((props) => ({
   cursor: 'pointer',
   color: props.lastest ? ' #8A8A8A' : '#FFBE58',
   textDecorationLine: 'underline',
   width: '82px',
   height: '21px',
   marginTop: '20px',
}));

const ContainerImage = styled(Box)(() => ({
   width: '500px',
   height: '350px',
}));

const ImageAction = styled(CardMedia)(() => ({
   width: '224px',
   height: '317px',
   margin: 'auto',
}));

const ArrowR = styled(ArrowRight)((props) => ({
   width: '79px',
   height: '23px',
   left: '200px',
   '&.slick-arrow': {
      top: '410px',
      left: '179px',
   },
   '&  path': {
      stroke: props.lastest ? '#363636' : '#97C69E',
   },
   '&  line': {
      stroke: props.lastest ? '#363636' : '#97C69E',
   },
}));
const ArrowL = styled(ArrowLeft)((props) => ({
   width: '79px',
   height: '23px',
   '&.slick-arrow': {
      top: '410px',
      left: '15px',
   },
   '&  path': {
      stroke: props.lastest ? '#363636' : '#97C69E',
   },
   '&  line': {
      stroke: props.lastest ? '#363636' : '#97C69E',
   },
}));

const Estimation = styled(Box)((props) => ({
   color: props.lastest ? '#363636' : '#FFFFFF',
   fontFamily: 'Inter',
   fontStyle: 'normal',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
   marginLeft: '110px',
   marginTop: '80px',
}));

const Styleddescription = styled('p')(() => ({
   color: '#6A6A6A',
   width: '309px',
}));

const PapularDescription = styled('p')(() => ({
   color: '#F7F7F7',
   width: '309px',
}));
