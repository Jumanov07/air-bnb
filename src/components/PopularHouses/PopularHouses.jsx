import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { Link as LinkView, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopularHouseItem from './PopularHouseItem';
import { getPapularHouses } from '../../redux/slices/papularSlice';
import NotFound from '../UI/NotFound';

function PopularHouse() {
   const { dataHouses } = useSelector((state) => state.getPapularHouses);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getPapularHouses());
   }, [dispatch]);

   const handlePopularClick = () => {
      navigate({
         search: 'popular-or-latest=Popular',
         pathname: 'region',
      });
   };
   return (
      <BoxContainer>
         <div>
            <Housename>
               <div>
                  <Popular>POPULAR HOUSE</Popular>
                  <Helping>
                     Helping you make the best decisions in buying, selling, &
                     renting your last minute locations.
                  </Helping>
               </div>
               <StyledLink />
               <StyledNavigate onClick={() => handlePopularClick()}>
                  View all
               </StyledNavigate>
            </Housename>
            <ContainerBox>
               {dataHouses.length > 0 ? (
                  dataHouses?.map((home) => {
                     return (
                        <PopularHouseItem
                           key={home.id}
                           {...home}
                           rating={home.rating}
                           url={home.images}
                           title={home.description}
                           locations={home.locationResponse.address}
                           price={home.price}
                        />
                     );
                  })
               ) : (
                  <NotFound />
               )}
            </ContainerBox>
         </div>
      </BoxContainer>
   );
}

export default PopularHouse;

const StyledLink = styled(LinkView)(() => ({}));

const StyledNavigate = styled('h4')(() => ({
   textDecoration: 'underline',
   color: '#363636',
   cursor: 'pointer',
}));

const Helping = styled('div')(() => ({
   fontSize: '16px',
   fontWeight: '400',
   color: '#363636',
}));

const Popular = styled('div')(() => ({
   fontSize: '20px',
   fontWeight: '500',
   marginBottom: '20px',
}));

const ContainerBox = styled(Box)(() => ({
   display: 'flex',
   gap: '20px',
}));

const BoxContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   width: '100%',
   marginTop: '170px',
   marginBottom: '170px',
}));

const Housename = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '50px',
}));
