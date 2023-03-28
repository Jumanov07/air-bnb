import { Avatar, styled, TextareaAutosize, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

const NameHotel = ({
   maxOfGuests,
   houseType,
   descriptionOfListing,
   title,
   location,
   owner,
   onClick,
   onClickAccept,
   id,
}) => {
   const [opens, setOpens] = useState(false);
   const [valueTextTarea, setValueTextTarea] = useState('');
   const [valueText, setValueText] = useState(true);

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
         <MainContainer>
            <ContainerForButton>
               <ButtonForApartement>{houseType}</ButtonForApartement>
               <ButtonForGuests>{maxOfGuests}Guests</ButtonForGuests>
            </ContainerForButton>
            <StyledNameOfHotel>
               <Typography variant="h5" style={{ fontWeight: '500' }}>
                  {title}
               </Typography>
               <StyledTypography variant="h7">{title}</StyledTypography>
               <StyledMorris>{`${location?.region} , ${location?.address} , ${location?.townOrProvince}`}</StyledMorris>
            </StyledNameOfHotel>
            <StyledP>
               {valueText
                  ? descriptionOfListing?.slice(0, 100)
                  : descriptionOfListing}
               {descriptionOfListing?.length >= 200 ? (
                  <StyledSeeButton onClick={() => setValueText(!valueText)}>
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
            <ContainerForDeleteAndEdit>
               <>
                  <DeleteButton onClick={() => openModalHandler()}>
                     Reject
                  </DeleteButton>
                  <EditButton onClick={() => onClickAccept(id)}>
                     Accept
                  </EditButton>
               </>
            </ContainerForDeleteAndEdit>
         </MainContainer>
      </>
   );
};

export default NameHotel;

const StyledSeeButton = styled('button')(() => ({
   color: 'blue',
   border: 'none',
   background: 'white',
}));

const StyledP = styled('p')(() => ({
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
   fontFamily: 'Inter',
   width: '500px',
}));
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

const MainContainer = styled('main')(() => ({
   width: '542px',
   height: '298px',
}));

const ContainerForButton = styled('section')(() => ({
   display: 'flex',
   gap: '14px',
}));

const ButtonForApartement = styled('button')(() => ({
   width: '95px',
   height: '29px',
   backgroundColor: '#FFF0F6',
   border: 'solid #FFCBE0 2px',
}));

const ButtonForGuests = styled('button')(() => ({
   width: '75px',
   height: '29px',
   backgroundColor: '#FFF0F6',
   border: 'solid #FFCBE0 2px',
}));

const StyledTypography = styled(Typography)(() => ({
   color: '#828282',
}));

const StyledNameOfHotel = styled('div')(() => ({
   marginTop: '20px',
}));

const ContainerForDeleteAndEdit = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   marginTop: '57px',
}));

const DeleteButton = styled(Button)(() => ({
   backgroundColor: 'white',
   color: '#BB7200',
   width: '196px',
   border: '2px solid #BB7200',
   '&:hover': {
      backgroundColor: 'white',
   },
}));

const EditButton = styled(Button)(() => ({
   width: '196px',
}));
