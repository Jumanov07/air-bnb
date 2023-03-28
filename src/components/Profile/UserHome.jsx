import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchHomeUserDetails } from '../../redux/slices/profilePageSlice';
import NameHotel from '../name-hotel/NameHotel';
import Feedback from '../UI/feedback/Feedback';
import PreviewSlider from '../UI/PreviewSlider';
import Rating from '../UI/Rating';

const UserHome = () => {
   const { homeDetails } = useSelector((state) => state.profileData);
   const dispatch = useDispatch();
   const { idHome } = useParams();
   useEffect(() => {
      dispatch(fetchHomeUserDetails(idHome));
   }, []);
   return (
      <div>
         <div style={{ display: 'flex' }}>
            <PreviewSlider
               imgs={homeDetails.images}
               style={{ marginBottom: '40px' }}
            />
            <NameHotel
               maxOfGuests={homeDetails.maxOfGuests}
               nameOfHotel={homeDetails?.location?.address}
               title={homeDetails.title}
               service={homeDetails.descriptionOfListing}
               houseType={homeDetails.houseType}
               showButtons
            />
         </div>
         <div
            style={{
               display: 'flex',
               gap: '300px',
               marginLeft: '40px',
               marginBottom: '40px',
            }}
         >
            <div>
               {homeDetails.feedbacks?.length > 0 ? (
                  homeDetails.feedbacks.map((el) => (
                     <Feedback key={el.id} {...el} />
                  ))
               ) : (
                  <Feedback />
               )}
            </div>
            <Rating
               title={homeDetails.sumOfRating}
               ratings={homeDetails.rating}
            />
         </div>
      </div>
   );
};

export default UserHome;
