import { Box, styled } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HomeCard from '../../components/UI/HomeCard';
import Loading from '../../components/UI/Loading';
import NotFound from '../../components/UI/NotFound';

import Select from '../../components/UI/Select';
import { getAllHousingDate } from '../../redux/slices/allHousingSlice';
import {
   filterByArr,
   FilterByHomeType,
   FilterByPrice,
   sortByArr,
} from '../../utils/constants/general';

const AllHousing = () => {
   const [selectValues, setSelectValues] = useState({
      filterBy: '',
      sortBy: '',
      filterbyhomeType: '',
      filterByPrice: '',
   });
   const { data, loading } = useSelector((state) => state.allHousing);
   const [searchParams, setSearchParams] = useSearchParams();
   const dispatch = useDispatch();

   const handlerChancheSelect = (event, key) => {
      const { value } = event.target;
      setSelectValues({ ...selectValues, [key]: value });
   };

   useEffect(() => {
      searchParams.set('houses-booked', selectValues.filterBy);
      setSearchParams(searchParams);
   }, [selectValues.filterBy]);

   useEffect(() => {
      searchParams.set('popular-or-the-latest', selectValues.sortBy);
      setSearchParams(searchParams);
   }, [selectValues.sortBy]);

   useEffect(() => {
      searchParams.set('houseType', selectValues.filterbyhomeType);
      setSearchParams(searchParams);
   }, [selectValues.filterbyhomeType]);

   useEffect(() => {
      searchParams.set('price', selectValues.filterByPrice);
      setSearchParams(searchParams);
   }, [selectValues.filterByPrice]);

   const getRequestDate = useMemo(() => {
      const getRequestParams = {};

      if (selectValues.filterBy) {
         getRequestParams.housesBooked = selectValues.filterBy;
      }
      if (selectValues.sortBy) {
         getRequestParams.popularOrTheLatest = selectValues.sortBy;
      }
      if (selectValues.filterbyhomeType) {
         getRequestParams.houseType = selectValues.filterbyhomeType;
      }
      if (selectValues.filterByPrice) {
         getRequestParams.price = selectValues.filterByPrice;
      }

      return getRequestParams;
   }, [
      selectValues.filterBy,
      selectValues.sortBy,
      selectValues.filterbyhomeType,
      selectValues.filterByPrice,
   ]);

   useEffect(() => {
      const params = getRequestDate;
      dispatch(getAllHousingDate({ params }));
   }, [getRequestDate]);

   return (
      <MainContainer>
         <div style={{ padding: '46px 40px 0px 40px' }}>
            <StyledForSelect>
               <h2 className="title">ALL HOUSING</h2>
               <div className="select-box">
                  <Select
                     title="Filter by:"
                     label={selectValues.filterBy}
                     filterByArr={filterByArr}
                     value={selectValues.filterBy}
                     onChange={(e) => handlerChancheSelect(e, 'filterBy')}
                  />
                  <Select
                     title="Sort by:"
                     label={selectValues.sortBy}
                     sortByArr={sortByArr}
                     value={selectValues.sortBy}
                     onChange={(e) => handlerChancheSelect(e, 'sortBy')}
                  />
                  <Select
                     title="Filter by home type:"
                     label={selectValues.filterbyhomeType}
                     FilterByHomeType={FilterByHomeType}
                     value={selectValues.filterbyhomeType}
                     onChange={(e) =>
                        handlerChancheSelect(e, 'filterbyhomeType')
                     }
                  />
                  <Select
                     title="Filter by price:"
                     label={selectValues.filterByPrice}
                     FilterByPrice={FilterByPrice}
                     value={selectValues.filterByPrice}
                     onChange={(e) => handlerChancheSelect(e, 'filterByPrice')}
                  />
               </div>
            </StyledForSelect>
            <Wrapper>
               {loading && <Loading />}
               {data?.length > 0 ? (
                  data.map((item) => {
                     return (
                        <HomeCard
                           key={item.id}
                           price={item.price}
                           houseRating={item.houseRating}
                           descriptionOfListing={item.descriptionOfListing}
                           maxOfGuests={item.maxOfGuests}
                           isFavorite={item.isFavorite}
                           images={item.images}
                           locationResponse={item.locationResponse}
                           id={item.id}
                        />
                     );
                  })
               ) : (
                  <NotFound />
               )}
            </Wrapper>
         </div>
      </MainContainer>
   );
};

export default AllHousing;

const MainContainer = styled('div')(() => ({
   width: '100% ',
   marginBottom: '300px',
}));

const StyledForSelect = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   '& .title': {
      padding: '30px',
      fontFamily: 'Inter',
      fontWeight: '500',
      fontSize: '20px',
      color: 'black',
   },

   '& .select-box': {
      paddingLeft: '80px',
      display: 'flex',
      gap: '16px',
   },
}));

const Wrapper = styled('div')(() => ({
   marginTop: '40px',
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr )',
   rowGap: '210px',
}));
