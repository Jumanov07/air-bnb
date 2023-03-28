import { styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NameHotel from '../../components/name-hotel/NameHotel';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import PreviewSlider from '../../components/UI/PreviewSlider';
import {
   applicationDatailsAccept,
   applicationDatailsReject,
   fetchHomeApplicationDatails,
} from '../../redux/slices/announcements.slice';

function ApplicationHomeDatails() {
   const { houseApplication } = useSelector((state) => state.announcements);
   console.log(houseApplication, 'house');
   const navigate = useNavigate();
   console.log(houseApplication, 'shamils');
   const { idAdmin } = useParams();
   const {
      location,
      houseType,
      maxOfGuests,
      owner,
      images,
      title,
      descriptionOfListing,
      id,
   } = houseApplication;
   const dispatch = useDispatch();
   const paths = [
      {
         name: 'application',
         path: '/application',
      },
   ];
   const lastPath = title;

   useEffect(() => {
      dispatch(fetchHomeApplicationDatails(idAdmin));
   }, []);

   const rejectDatailsHandler = ({ id, valueTextTarea }) => {
      const data = {
         id,
         valueTextTarea,
         housesStatus: 'Reject',
      };

      dispatch(applicationDatailsReject({ data }))
         .unwrap()
         .then(() => {
            navigate('/application');
         });
   };

   const acceptDatailsHandler = (id) => {
      const paramsAccept = {
         houseId: id,
         housesStatus: 'Accept',
      };
      dispatch(applicationDatailsAccept({ paramsAccept }))
         .unwrap()
         .then(() => {
            navigate('/application');
         });
   };
   return (
      <StyledContainer>
         <BreadCrumbs lastPath={lastPath} paths={paths} />
         <StyledNameHouse>{title}</StyledNameHouse>

         <StyledBoxContainer>
            <PreviewSlider imgs={images} />
            <NameHotel
               maxOfGuests={maxOfGuests}
               descriptionOfListing={descriptionOfListing}
               houseType={houseType}
               title={title}
               location={location}
               owner={owner}
               id={id}
               onClick={rejectDatailsHandler}
               onClickAccept={acceptDatailsHandler}
            />
         </StyledBoxContainer>
      </StyledContainer>
   );
}

export default ApplicationHomeDatails;

const StyledContainer = styled('div')(() => ({
   margin: 'auto',
   width: '1440px',
}));

const StyledNameHouse = styled('p')(() => ({
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '24px',
   textTransform: 'uppercase',
   marginTop: '40px',
   marginBottom: '30px',
}));
const StyledBoxContainer = styled('div')(() => ({
   display: 'flex',
   gap: '68px',
   paddingTop: '50px',
}));
