/* eslint-disable react/no-array-index-key */
import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import ImagePicker from '../UI/ImagePicker';
import Input from '../UI/Input';
import { paths, validationFormikThema } from '../../utils/constants/general';
import SelectLabel from './SelectLabel';
import { addAnnouncmentRequest } from '../../redux/slices/announcements.slice';

function AddAnnouncment() {
   const [images, setImage] = useState([]);
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         price: '',
         title: '',
         descriptionOfListing: '',
         maxOfGuests: '',
         houseType: '',
         location: {
            townOrProvince: '',
            address: '',
            region: '',
         },
      },

      onSubmit: (values, action) => {
         dispatch(addAnnouncmentRequest({ announcement: values, images }));
         action.setErrors();
         action.resetForm();
         setImage([]);
      },
      validationSchema: validationFormikThema,
   });

   const getFile = (file) => {
      setImage([...images, file]);
   };

   const deleteImageHandler = (idImg) => {
      const newImageBox = images.filter((el, index) => index !== idImg);
      setImage(newImageBox);
   };

   return (
      <StyledContainer onSubmit={formik.handleSubmit}>
         <StyledTextUpper>
            Hi! Let`s get started listing your place.
         </StyledTextUpper>
         <StyledBoxDiv>
            <p>
               In this form, we`ll collect some basic and additional information
               <br />
               about your listing.
            </p>
            <BoxSpanStyled>
               <span>Image</span> <span className="imageMax">Max 4 photo</span>
            </BoxSpanStyled>
         </StyledBoxDiv>
         <StyledBoxImageContainer>
            <StyledBoxImage>
               {images.map((item, index) => {
                  return (
                     <StyledPhotoBox key={index}>
                        <StyledPhoto src={URL.createObjectURL(item)} alt="" />
                        <DeleteIcon onClick={() => deleteImageHandler(index)} />
                     </StyledPhotoBox>
                  );
               })}
               {images.length < 4 ? <ImagePicker setImage={getFile} /> : ''}
            </StyledBoxImage>
            <div>
               <StyledPtext>Add photos to the review</StyledPtext>
               <p>
                  it will become more noticeable and even more useful.
                  <br /> You can upload up to 4 photos.
               </p>
            </div>
         </StyledBoxImageContainer>
         <StyledBoxRadio>
            <p>Home type</p>
            <RadioGroup
               row
               aria-labelledby="demo-row-radio-buttons-group-label"
               name="row-radio-buttons-group"
            >
               <FormControlLabel
                  size="large"
                  name="houseType"
                  control={
                     <Radio onChange={formik.handleChange} value="APARTMENT" />
                  }
                  label="Apartment"
                  style={{ paddingRight: '45px' }}
               />
               <FormControlLabel
                  name="houseType"
                  value="male"
                  control={
                     <Radio value="HOUSE" onChange={formik.handleChange} />
                  }
                  label="House"
               />
            </RadioGroup>
         </StyledBoxRadio>
         <BoxInputs>
            <StyledBoxMaxPrice>
               <div>
                  <p>Max of Guests</p>
                  <div>
                     <InputComponent
                        type="number"
                        placeholder="0"
                        value={formik.values.maxOfGuests}
                        name="maxOfGuests"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                     />
                     <StyledIsToched>
                        {formik.errors?.maxOfGuests &&
                        formik.touched?.maxOfGuests
                           ? formik.errors?.maxOfGuests
                           : ''}
                     </StyledIsToched>
                  </div>
               </div>
               <div>
                  <p>Price</p>
                  <InputComponent
                     onBlur={formik.handleBlur}
                     placeholder="$ 0"
                     type="number"
                     name="price"
                     value={formik.values.price}
                     onChange={formik.handleChange}
                  />
                  <StyledIsToched>
                     {formik.errors?.price && formik.touched?.price
                        ? formik.errors?.price
                        : ''}
                  </StyledIsToched>
               </div>
            </StyledBoxMaxPrice>
            <p>Title</p>
            <StyledTitleInput
               value={formik.values.title}
               onChange={formik.handleChange}
               name="title"
               onBlur={formik.handleBlur}
            />
            <StyledIsToched>
               {formik.errors?.title && formik.touched?.title
                  ? formik.errors?.title
                  : ''}
            </StyledIsToched>
            <p>Description of listing</p>
            <InputDescription
               value={formik.values.descriptionOfListing}
               onChange={formik.handleChange}
               name="descriptionOfListing"
               onBlur={formik.handleBlur}
               type="text"
            />
            <StyledIsToched>
               {formik.errors?.descriptionOfListing &&
               formik.touched?.descriptionOfListing
                  ? formik.errors?.descriptionOfListing
                  : ''}
            </StyledIsToched>
            <p>Region</p>
            <InputRegion
               options={paths}
               title="Please, select the region"
               value={formik.values.location?.region}
               onChange={formik.handleChange}
               name="location.region"
               onBlur={formik.handleBlur}
            />
            <StyledIsToched>
               {formik.touched?.location?.region &&
               formik.errors?.location?.region ? (
                  <div>{formik.errors?.location?.region}</div>
               ) : null}
            </StyledIsToched>
            <p>Town / Province</p>
            <InputProvince
               value={formik.values.location?.townOrProvince}
               onChange={formik.handleChange}
               name="location.townOrProvince"
               onBlur={formik.handleBlur}
            />
            <StyledIsToched>
               {formik.touched?.location?.townOrProvince &&
               formik.errors?.location?.townOrProvince ? (
                  <div>{formik.errors?.location?.townOrProvince}</div>
               ) : null}
            </StyledIsToched>
            <p>Address</p>
            <InputAddress
               value={formik.values.location?.address}
               onChange={formik.handleChange}
               name="location.address"
               onBlur={formik.handleBlur}
            />
            <StyledIsToched>
               {formik.touched?.location?.address &&
               formik.errors?.location?.address ? (
                  <div>{formik.errors?.location?.address}</div>
               ) : null}
            </StyledIsToched>
            <BoxButton htmlType="submit">
               <StyledButtonComponent type="submit">
                  SUBMIT
               </StyledButtonComponent>
            </BoxButton>
         </BoxInputs>
      </StyledContainer>
   );
}

export default AddAnnouncment;
const StyledIsToched = styled('div')(() => ({
   color: 'red',
}));
const StyledPhoto = styled('img')(() => ({
   width: '100%',
   height: '100%',
}));

const DeleteIcon = styled(DeleteForeverIcon)(() => ({
   zIndex: '1',
   position: 'relative',
   bottom: '105px',
}));

const StyledButtonComponent = styled(Button)(() => ({
   width: '196px',
   height: '37px',
}));
const BoxButton = styled('div')(() => ({
   width: '100%',
   paddingTop: '22px',
   display: 'flex',
   justifyContent: 'end',
}));
const InputAddress = styled(Input)(() => ({
   width: '100%',
}));
const InputProvince = styled(Input)(() => ({
   width: '100%',
}));
const InputRegion = styled(SelectLabel)(() => ({
   width: '610px',
}));
const InputDescription = styled('textarea')(() => ({
   width: '100%',
   height: '104px',
   padding: '5px',
   resize: 'none',
}));

const StyledTitleInput = styled(Input)(() => ({
   width: '100%',
   height: '39px',
}));

const BoxInputs = styled('div')(() => ({
   '& p': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      paddingTop: '28px',
      paddingBottom: '18px',
   },
}));
const InputComponent = styled(Input)(() => ({
   width: '245px',
   height: '39px',
   '& ::placeholder': {
      color: '#C4C4C4',
   },
}));
const StyledBoxMaxPrice = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   paddingTop: '30px',
   paddingBottom: '28px',
   '& p': {
      paddingBottom: '18px',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
   },
}));

const StyledBoxRadio = styled('div')(() => ({
   '& p ': {
      paddingTop: '28px',
      paddingBottom: '21px',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
   },
   '& .Mui-checked': {
      color: '#DD8A08 !important',
   },
}));
const StyledPtext = styled('p')(() => ({
   color: '#266BD3',
   fontWeight: '500',
   fontSize: '16px',
   lineHeight: '19px',
   paddingTop: '50px ',
}));

const StyledBoxImageContainer = styled('div')(() => ({
   display: 'flex',
   paddingBottom: '28px',
}));

const StyledBoxDiv = styled('div')(() => ({
   paddingTop: '20px',
   paddingBottom: '14px',
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
}));
const StyledBoxImage = styled('div')(() => ({
   maxWidth: '209px',
   display: 'flex',
   flexWrap: 'wrap',
   gap: '6px',
   marginRight: '20px',
}));

const BoxSpanStyled = styled('div')(() => ({
   '& .imageMax ': {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '19px',
      color: '#A9A9A9',
   },
}));

const StyledTextUpper = styled('p')(() => ({
   textTransform: 'uppercase',
   fontWeight: '500',
   fontSize: '16px',
   color: '#363636',
}));
const StyledContainer = styled('form')(() => ({
   margin: 'auto',
   width: '610px',
   marginBottom: '40px',
}));

const StyledPhotoBox = styled('div')(() => ({
   width: '100px',
   height: '100px',
}));
