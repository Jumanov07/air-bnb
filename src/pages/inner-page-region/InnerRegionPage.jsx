import { Container, styled, Typography } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import GoogleSignIn from '../../components/Authorization/GoogleSignIn';
import PagePagination from '../../components/pagination/Pagination';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import HomeCard from '../../components/UI/HomeCard';
import IconButton from '../../components/UI/IconButton';
// import NotFound from '../../components/UI/NotFound';
import Select from '../../components/UI/Select';
import Header from '../../layout/Header';
import { getHouseSlice } from '../../redux/slices/getHouseSlice';

import {
   homePrice,
   homeType,
   homeTypeSecond,
   option,
} from '../../utils/constants/general';
import AutoScroll from '../../utils/helpers/AutoScroll';
import CatalogMagic from '../spiner/Spiner';

const paths = [
   {
      name: 'main',
      path: `/`,
   },
];
const lastPAth = 'region';

const clearAll = {
   region: 'region',
   papular: 'popular-or-latest',
   filterHome: 'filter-by-home-type',
   filterType: 'sort',
};

const InnerRegionPage = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const closeSignIn = () => setSearchParams({});
   const OpenSignIn = searchParams.get('open');
   const signIn = () => setSearchParams({ open: true });

   const { house, isLoading } = useSelector((state) => state.houseData);

   const dispatch = useDispatch();
   const getPageIndex = searchParams.get('page-index');
   const [regionValue, setRegionValue] = useState(
      searchParams.get('region') || ''
   );
   const [searchValue, setSearchValue] = useState('');
   const [filterByType, setFilterByType] = useState('');
   const [value] = useDebounce(searchValue, 1000);
   const [filterByHome, setFilterHome] = useState('');
   const [sortPapular, setSortPapular] = useState('');

   const filterSort = (valueSort) => {
      searchParams.set('popular-or-latest', valueSort);
      setSortPapular(valueSort);
      setSearchParams(searchParams);
   };

   const regionFilter = (valueRegion) => {
      searchParams.set('region', valueRegion);
      setRegionValue(valueRegion);
      setSearchParams(searchParams);
   };

   const filterTypeHandler = (valueType) => {
      searchParams.set('sort', valueType);
      setFilterByType(valueType);
      setSearchParams(searchParams);
   };

   const FilterHomeType = (filterByHomeValue) => {
      searchParams.set('filter-by-home-type', filterByHomeValue);
      setFilterHome(filterByHomeValue);
      setSearchParams(searchParams);
   };

   const demonstrateHundler = () => {
      const getRegion = searchParams.get('region');
      const getSort = searchParams.get('popular-or-latest');
      const getHouses = searchParams.get('filter-by-home-type');
      const getType = searchParams.get('sort');
      const demonstrate = {
         region: '',
         sortFilter: '',
         houses: '',
         filterType: '',
      };
      if (getRegion) {
         demonstrate.region = getRegion;
      }
      if (getSort) {
         demonstrate.sortFilter = getSort;
      }
      if (getHouses) {
         demonstrate.houses = getHouses;
      }
      if (getType) {
         demonstrate.filterType = getType;
      }
      return demonstrate;
   };

   const getRegionValue = demonstrateHundler();

   const clearRequestParams = useCallback(() => {
      Object.values(clearAll).forEach((paramName) => {
         searchParams.delete(paramName);
      });
      setSearchParams(searchParams);
      setRegionValue('');
      setFilterHome('');
      setSortPapular('');
      setFilterByType('');
   }, [clearAll]);

   const deletePopularHandler = () => {
      const getPopularParam = 'popular-or-latest';
      if (getPopularParam === 'popular-or-latest') {
         searchParams.delete(getPopularParam);
      }
      setSearchParams(searchParams);
      setSortPapular('');
   };

   const deleteFilterHomeHandler = () => {
      const getPopularParam = 'filter-by-home-type';
      if (getPopularParam === 'filter-by-home-type') {
         searchParams.delete(getPopularParam);
      }
      setSearchParams(searchParams);
      setFilterHome('');
   };

   const getSort = searchParams.get('popular-or-latest');
   const getHousesRequestParams = useCallback(() => {
      const defaultParams = {
         page: Number(getPageIndex),
         pageSize: 16,
         userLatitude: 0,
         userLongitude: 0,
      };

      if (searchValue.trim().length > 0) {
         defaultParams.search = value;
      }
      if (getSort) {
         defaultParams.popularOrTheLatest = getSort;
      }
      if (regionValue) {
         defaultParams.region = regionValue;
      }
      if (filterByType) {
         defaultParams.price = filterByType;
      }
      if (filterByHome) {
         defaultParams.homeType = filterByHome;
      }
      return defaultParams;
   }, [
      getSort,
      value,
      getPageIndex,
      regionValue,
      filterByType,
      filterByHome,
      sortPapular,
   ]);

   useEffect(() => {
      const params = getHousesRequestParams();
      dispatch(getHouseSlice({ params }));
   }, [getHousesRequestParams]);

   return isLoading ? (
      <CatalogMagic />
   ) : (
      <Main>
         <AutoScroll />
         <Header searchValue={searchValue} setSearchValue={setSearchValue} />
         <Container style={{ maxWidth: '1400px' }}>
            <ContainerForIndent>
               <StyledBreadCrumbs paths={paths} lastPath={lastPAth} />
            </ContainerForIndent>
            <ContainerForSelects>
               <Typography variant="h5">
                  <span> {getRegionValue?.region} </span>
                  <span>({house?.paginationList?.length})</span>
               </Typography>
               <Select
                  label={getRegionValue.region}
                  title="sort by"
                  options={option}
                  value={regionValue}
                  onChange={(e) => regionFilter(e.target.value)}
               />
               <Select
                  title="sort by"
                  label={getRegionValue.sortFilter}
                  homeType={homeType}
                  value={sortPapular}
                  onChange={(e) => filterSort(e.target.value)}
               />
               <Select
                  label={getRegionValue.houses}
                  title="filter by home type:"
                  homeTypeSecond={homeTypeSecond}
                  value={filterByHome}
                  onChange={(e) => FilterHomeType(e.target.value)}
               />
               <Select
                  label={getRegionValue.filterType}
                  title="filter by type"
                  homePrice={homePrice}
                  value={filterByType}
                  onChange={(e) => filterTypeHandler(e.target.value)}
               />
            </ContainerForSelects>
            <ContainerForButton>
               {getRegionValue.sortFilter ? (
                  <PopularIconButton>
                     <p onClick={() => deletePopularHandler()}> X </p>
                     <p>{getRegionValue.sortFilter} </p>
                  </PopularIconButton>
               ) : (
                  getRegionValue.sortFilter
               )}

               {getRegionValue.houses ? (
                  <ApartmentButton>
                     <p onClick={() => deleteFilterHomeHandler()}> X </p>
                     <p>{getRegionValue.houses}</p>
                  </ApartmentButton>
               ) : (
                  getRegionValue.houses
               )}
               <ClearAll onClick={() => clearRequestParams()}>
                  Clear all
               </ClearAll>
            </ContainerForButton>
            <FlexWrapp>
               {house?.paginationList?.map((item) => (
                  <HomeCard
                     region={item.locationResponse.region}
                     key={item.id}
                     id={item.id}
                     estimation={item.houseRating}
                     descriptionOfListing={item.descriptionOfListing}
                     address={item.locationResponse.address}
                     locationResponse={item.locationResponse}
                     images={item.images}
                     price={item.price}
                     description={item.houseType}
                     guest={item.maxOfGuests}
                     isFavorite={item.isFavorite}
                     signIn={signIn}
                     maxOfGuests={item.maxOfGuests}
                  />
               ))}
            </FlexWrapp>

            <div style={{ padding: '250px 0px 100px 0px' }}>
               {house?.pageSize <= 1 ? null : (
                  <PagePagination count={house?.pageSize} />
               )}
            </div>
         </Container>
         <GoogleSignIn isMounted={OpenSignIn} handleClose={closeSignIn} />
      </Main>
   );
};

export default InnerRegionPage;

const ContainerForIndent = styled('div')(() => ({
   paddingTop: '40px',
}));

const Main = styled('main')(() => ({
   width: '100%',
   height: '100%',
   background: ' #E5E5E5',
}));

const StyledBreadCrumbs = styled(BreadCrumbs)(() => ({
   size: '14px',
}));

const ContainerForSelects = styled('section')(() => ({
   marginTop: '49px',
   display: 'flex',
   alignItems: 'center',
   gap: '25px',
}));

const ClearAll = styled('p')(() => ({
   color: '#828282',
   borderBottom: '2px solid #000000',
   fontSize: '16px',
   lineHeight: '19px',
   textAlign: 'center',
   cursor: 'pointer',
}));

const FlexWrapp = styled('div')(() => ({
   marginTop: '48px',
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   rowGap: '200px',
}));

const ContainerForButton = styled('div')(() => ({
   marginTop: '48px',
   marginLeft: '10px',
   display: 'flex',
   alignItems: 'center',
   gap: '15px',
}));

const ApartmentButton = styled(IconButton)(() => ({
   width: ' 121px',
   height: '35px',
   ':focus': {
      color: 'white',
      background: '#C4C4C4',
   },
}));

const PopularIconButton = styled(IconButton)(() => ({
   width: '98px',
   height: '35px',
   ':focus': {
      color: 'white',
      background: '#C4C4C4',
   },
}));
