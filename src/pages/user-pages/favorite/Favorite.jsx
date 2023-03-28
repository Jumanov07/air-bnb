import { Box, Container, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '../../../components/UI/BreadCrumbs';
import HomeCard from '../../../components/UI/HomeCard';
import { getAllFavorites } from '../../../redux/slices/announcements.slice';

const paths = [
   {
      name: 'main',
      path: '/',
   },
];
const lastPath = 'favorite';
function Favorite() {
   const { favorites } = useSelector((state) => state.announcements);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllFavorites());
   }, []);

   return (
      <MainContainer>
         <AlignContainer>
            <BreadCrumbs paths={paths} lastPath={lastPath} />
            <StyledFavorite>
               Favorite
               <Quantity>{`(${favorites.length})`}</Quantity>
            </StyledFavorite>
         </AlignContainer>
         <StyledContainer>
            {favorites.map((item) => (
               <Box>
                  {item.isFavorite === true ? (
                     <HomeCard key={item.id} {...item} />
                  ) : null}
               </Box>
            ))}
         </StyledContainer>
      </MainContainer>
   );
}

export default Favorite;

const MainContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: '100%',
   gap: '25px',
   padding: '20px',
}));

const AlignContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   paddingLeft: '80px',
}));

const StyledContainer = styled(Container)(() => ({
   maxWidth: '1400px !important',
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
   gap: '50px',
   rowGap: '200px',
   paddingBottom: '230px',
   // display: 'grid',
   // gridTemplateColumns: 'repeat(4, 1fr)',
   // gridTemplateRows: 'repeat(4, 1fr)',
   // gridColumnGap: '25px',
   // gridRowGap: '250px',
}));

const StyledFavorite = styled(Typography)(() => ({
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '24px',
   textTransform: 'uppercase',
   display: 'flex',
   gap: '5px',
}));

const Quantity = styled('span')(() => ({
   color: '#646464',
   fontSize: '18px',
}));
