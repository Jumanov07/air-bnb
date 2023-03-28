import { styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getProjects } from '../../redux/slices/profilePageSlice';
import { paths, TAB_ITEMS } from '../../utils/constants';
import { ratingSelect, sort } from '../../utils/constants/general';
import BreadCrumbs from '../UI/BreadCrumbs';
import CenteredTabs from '../UI/CenteredTabs';
import Profile from '../UI/Profile';
import SelectProfileSort from '../UI/SelectProfileSort';
import HomeCardProfile from './HomeCardProfil';

const lastPath = 'profile';

function ProfileHome() {
   const { data } = useSelector((state) => state.profileData);
   const [searchParams, setSearchParams] = useSearchParams();
   const [sortValue, setSortValue] = useState([]);
   const [valueTabs, setValueTabs] = useState('Bookings');
   const [rating, setRating] = useState([]);

   const dispatch = useDispatch();
   const filterType = (value) => {
      searchParams.set('homeType', value);
      setSortValue(value);
      setSearchParams(searchParams);
   };
   const sortRating = (value) => {
      searchParams.set('rating', value);
      setRating(value);
      setSearchParams(searchParams);
   };

   const getRequestDate = useCallback(() => {
      const getParams = {
         mainInUserProfile: valueTabs,
         size: 40,
         page: 1,
         sortHousesAsDesired: sortValue.join(','),
         sortHousesByApartments: sortValue.join(','),
         sortHousesByHouses: sortValue.join(','),
         sortingHousesByValue: sortValue.join(','),
         sortingHousesByRating: rating.join(','),
      };
      return getParams;
   }, [sortValue, valueTabs, rating]);

   useEffect(() => {
      const params = getRequestDate();
      dispatch(getProjects({ ...params }));
   }, [getRequestDate, getProjects]);

   return (
      <div>
         <TitleStyled>
            <BreadCrumbs lastPath={lastPath} paths={paths} />
            <h1 data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
               Profile
            </h1>
         </TitleStyled>
         <Box1>
            <BoxContainer>
               <Profile
                  user={data?.profileName}
                  contact={data?.profileContact}
               />
            </BoxContainer>
            <div className="Bootom" style={{ marginBottom: '100px' }}>
               <CenteredTabs
                  TAB_ITEMS={TAB_ITEMS}
                  valueTabs={valueTabs}
                  setValueTabs={setValueTabs}
               />

               {valueTabs === 'My announcement' ? (
                  <SelectContainer>
                     <SelectProfileSort
                        valueTabs={valueTabs}
                        sortValue={sortValue}
                        value={sortValue || ''}
                        setRating={setRating}
                        options={sort}
                        setSortValue={setSortValue}
                        open
                        onChange={(e) => filterType(e.target.value, e)}
                        style={{
                           margin: '20px',
                           maxWidth: '180px',
                        }}
                     />
                     <SelectProfileSort
                        value={rating || ''}
                        options={ratingSelect}
                        setRating={setRating}
                        setSortValue={setSortValue}
                        onChange={(e) => sortRating(e.target.value, e)}
                        style={{ margin: '20px' }}
                     />
                  </SelectContainer>
               ) : null}
               <Container
                  data-aos-duration="3000"
                  data-aos="fade-right"
                  style={
                     valueTabs === 'My announcement' ||
                     valueTabs === 'On moderation'
                        ? {
                             display: 'grid',
                             gridTemplateColumns: ' repeat(3, 1fr)',
                             gridTemplateRows: 'repeat(2, 1fr)',
                             gridColumnGap: '20px',
                             gridRowGap: ' 200px',
                             marginTop: '20px',
                          }
                        : null
                  }
               >
                  {data?.profileHouseResponses?.map((item) => (
                     <HomeCardProfile
                        {...item}
                        getRequestDate={getRequestDate}
                        houseRating={item.rating}
                        id={item.id}
                        locationResponse={item.location}
                        valueTabs={valueTabs}
                     />
                  ))}
               </Container>
            </div>
         </Box1>
      </div>
   );
}
export default ProfileHome;
const TitleStyled = styled('div')(() => ({
   marginLeft: '90px',
}));

const SelectContainer = styled('div')(() => ({
   display: 'flex',
}));

const BoxContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginTop: '50px',
   marginLeft: '50px',
}));
const Container = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: ' repeat(3, 1fr)',
   gridTemplateRows: 'repeat(2, 1fr)',
   gridColumnGap: '20px',
   gridRowGap: ' 320px',
   marginTop: '20px',
   overflowY: 'scroll',
   scrollBehavior: 'smooth',
}));

const Box1 = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-around',
   '.Bottom': {
      marginBottom: '100px',
   },
}));
