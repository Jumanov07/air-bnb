import { styled } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TAB_ITEM } from '../../utils/constants';
import {
   blockAllHouse,
   deleteUserHomeProfile,
   fetchUserProfile,
   unBlockHouse,
} from '../../redux/slices/userProfileSlice';
import CenteredTabs from '../UI/CenteredTabs';
import Profile from '../UI/Profile';
import Button from '../UI/Button';
import BreadCrumbs from '../UI/BreadCrumbs';
import HomeCard from '../UI/HomeCard';

function UserGetByHouses() {
   const { dataUsers } = useSelector((state) => state.userProfile);
   console.log(dataUsers, 'datausers');
   const [tabValue, setTabValue] = useState('Bookings');
   const { userId } = useParams();
   const dispatch = useDispatch();

   const paths = [
      {
         name: 'users',
         path: '/users',
      },
   ];
   const lastPath = dataUsers.profileName;

   const getRequesDataText = useCallback(() => {
      const getParams = {
         userId,
         bookingsOrAnnouncement: tabValue,
      };
      return getParams;
   }, [tabValue]);

   useEffect(() => {
      const params = getRequesDataText();
      dispatch(fetchUserProfile(params));
   }, [getRequesDataText, dispatch]);

   const allBlockedHouseHandler = (userId) => {
      dispatch(blockAllHouse(userId))
         .unwrap()
         .then(() => {
            const params = getRequesDataText();
            dispatch(fetchUserProfile(params));
         });
   };

   const blockUnblockHendler = (id) => {
      const paramsGet = getRequesDataText();
      const params = {
         houseId: id,
         housesStatus: 'Blocked',
      };
      dispatch(unBlockHouse({ params }))
         .unwrap()
         .then(() => {
            dispatch(fetchUserProfile(paramsGet));
         });
   };
   const deleteHomeHendler = (homeId) => {
      dispatch(deleteUserHomeProfile(homeId))
         .unwrap()
         .then(() => {
            const params = getRequesDataText();
            dispatch(fetchUserProfile(params));
         });
   };

   return (
      <StyledUserBox>
         <BreadCrumbs lastPath={lastPath} paths={paths} />
         <StyledContainer>
            <div>
               <StyledUserName>{dataUsers.profileName}</StyledUserName>
               <Profile
                  contact={dataUsers.profileContact}
                  user={dataUsers.profileName}
               />
               {tabValue === 'My announcement' ? (
                  <StyledButtonMyAnnounsment
                     onClick={() => allBlockedHouseHandler(userId)}
                  >
                     block all announcement
                  </StyledButtonMyAnnounsment>
               ) : null}
            </div>

            <StyledBoxHomeCard>
               <StyledBoxP>
                  <CenteredTabs
                     TAB_ITEMS={TAB_ITEM}
                     setValueTabs={setTabValue}
                     valueTabs={tabValue}
                  />
               </StyledBoxP>
               <StyledMapBox>
                  {dataUsers?.houseResponseForAdminUsers?.map((item) => {
                     return (
                        <HomeCard
                           key={item.id}
                           {...item}
                           onClicking={deleteHomeHendler}
                           onClick={blockUnblockHendler}
                        />
                     );
                  })}
               </StyledMapBox>
            </StyledBoxHomeCard>
         </StyledContainer>
      </StyledUserBox>
   );
}

export default UserGetByHouses;

const StyledUserName = styled('h3')(() => ({
   paddingBottom: '22px',
   textTransform: 'uppercase',
   fontSize: '20px',
}));

const StyledBoxHomeCard = styled('div')(() => ({
   width: '900px',
}));

const StyledButtonMyAnnounsment = styled(Button)(() => ({
   width: '292px',
   marginTop: '50px',
   marginLeft: '40px',
}));

const StyledMapBox = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: ' repeat(3, 1fr)',
   gridTemplateRows: 'repeat(2, 1fr)',
   gridColumnGap: '20px',
   gridRowGap: ' 200px',
   marginTop: '20px',
}));

const StyledContainer = styled('div')(() => ({
   width: '95%',
   margin: 'auto',
   display: 'flex',
   justifyContent: 'space-between',
   paddingTop: '40px',
}));

const StyledUserBox = styled('div')(() => ({
   width: '1440px',
   margin: 'auto',
   paddingTop: '50px',
}));
const StyledBoxP = styled('div')(() => ({
   '& .MuiTabs-flexContainer': {
      width: '900px',
      gap: '100px',
   },
}));
