import React, { useState } from 'react';
import { Rating, styled, TextareaAutosize, Typography } from '@mui/material';
// import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ImagePicker from '../../components/UI/ImagePicker';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import {
   feedbacks,
   getDetailOfHouse,
} from '../../redux/slices/homeDetail.slice';

const LeaveFeedback = ({
   titleForphoto = 'Add photos to the review',
   textForPhoto = 'it will become more noticeable and even more useful. Youcan upload up to 4 photos.  ',
   handleClose,
   open,
   id,
}) => {
   const [imagesFeedback, setImagesFeedback] = useState([]);
   const [value, setValue] = useState('');
   const [rate, setRate] = useState(null);

   const dispatch = useDispatch();

   const getLinkHandler = async (file) => {
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      axios({
         method: 'POST',
         url: `http://ec2-3-67-201-139.eu-central-1.compute.amazonaws.com/api/file`,
         data: bodyFormData,
         headers: { 'Content-Type': 'multipart/form-data' },
      })
         .then((response) => {
            return setImagesFeedback([...imagesFeedback, response?.data?.link]);
         })
         .catch((error) => {
            return console.log(error, 'errors');
         });
   };

   const getFileInImagePickerAndConvertationToFile = (file) => {
      getLinkHandler(file);
   };

   const handleDelete = (i) => {
      setImagesFeedback([...imagesFeedback.filter((_, index) => index !== i)]);
   };

   const valueHandler = (e) => {
      setValue(e.target.value);
   };

   const rateHandler = (e) => {
      setRate(e.target.value);
   };

   const postFeedbacks = () => {
      dispatch(
         feedbacks({
            text: value,
            rating: rate,
            image: imagesFeedback,
            id,
         })
      ).then(() => setValue(''), setRate(''), setImagesFeedback([]));
      dispatch(getDetailOfHouse(id)).then(() => handleClose());
   };

   return (
      <StyledModal handleClose={handleClose} open={open}>
         <MainContainer>
            <TextForFeedback variant="h4">Leave Feedback</TextForFeedback>
            <Section>
               {imagesFeedback.map((item, index) => {
                  return (
                     <DropImage
                        onClick={() => handleDelete(index)}
                        src={item}
                     />
                  );
               })}
               {imagesFeedback.length !== 4 ? (
                  <ImagePicker
                     setImage={getFileInImagePickerAndConvertationToFile}
                  />
               ) : null}
               <TextWrapper>
                  <Text>{titleForphoto}</Text>
                  <StyledTypography>{textForPhoto}</StyledTypography>
               </TextWrapper>
            </Section>
            <TitleRate>Rate</TitleRate>
            <StyledRating value={rate} onChange={rateHandler} />
            <div>
               <TitleFeedback>Feedback</TitleFeedback>
               <StyledTextarea
                  onChange={valueHandler}
                  minRows={4}
                  value={value}
                  placeholder="Share your impressions about this place"
               />
               <ContainerForButton>
                  <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
                  <ButtonPublic onClick={postFeedbacks}>Publish</ButtonPublic>
               </ContainerForButton>
            </div>
         </MainContainer>
      </StyledModal>
   );
};
export default LeaveFeedback;

const StyledModal = styled(Modal)(() => ({
   background: 'white',
   width: '800px',
   height: '600px',
   padding: '20px',
   borderRadius: '10px',
   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
}));

const MainContainer = styled('div')(() => ({
   width: '763px',
   height: '500px',
   margin: '0 auto',
}));

const DropImage = styled('img')`
   width: 130px;
   height: 130px;
   object-fit: cover;
`;

const TextForFeedback = styled(Typography)(() => ({
   position: 'relative',
   left: '30%',
}));

const TextWrapper = styled('div')(() => ({
   marginTop: '20px',
}));

const Section = styled('section')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '20px',
}));

const Text = styled(Typography)(() => ({
   fontWeight: '500',
   fontSize: '16px',
   lineHeight: '19px',
   color: '#266BD3',
}));

const StyledTypography = styled(Typography)(() => ({
   width: '352px',
   height: '34px',
   paddingTop: '8px',
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '17px',
   color: '#828282',
}));

const StyledTextarea = styled(TextareaAutosize)(() => ({
   width: '640px',
   resize: 'none',
   borderColor: '#828282',
   fontSize: '16px',
   // marginTop: '12px',
   paddingLeft: '16px',
   paddingTop: '10px',

   '::-webkit-input-placeholder': {
      lineHeight: '10px',
      paddingLeft: '20px',
      fontSize: '16px',
      color: '#828282',
   },
}));

const TitleRate = styled('h3')(() => ({
   marginTop: '22px',
   color: ' #828282',
}));
const StyledRating = styled(Rating)(() => ({
   fontSize: '30px',
   marginTop: '12px',
}));

const TitleFeedback = styled('h3')(() => ({
   marginTop: '22px',
   color: ' #828282',
}));

const ContainerForButton = styled('div')(() => ({
   display: 'flex',
   paddingLeft: '340px',
   // margin: '22px',
   gap: '8px',
}));

const ButtonCancel = styled(Button)(() => ({
   width: '150px',
   backgroundColor: '#FFFFFF',
   color: '#828282',
   '&:hover': {
      backgroundColor: '#FFFFFF',
   },
}));

const ButtonPublic = styled(Button)(() => ({
   width: '150px',
   backgroundColor: '#DD8A08',
   color: 'white',
}));

// const ButtonDelete = styled(Delete)(() => ({
//    color: 'red',
//    position: 'relative',
//    bottom: '100px',
//    left: '20px',
//    cursor: 'pointer',
//    '& :hover': {
//       color: 'green',
//    },
// }));
