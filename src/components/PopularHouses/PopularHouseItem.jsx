import React from 'react';
import { CardMedia, styled } from '@mui/material';
import { Location, StarIcon } from '../../assets/icons';

function PopularHouseItem({ rating, url, title, locations, price }) {
   return (
      <div data-aos="zoom-in">
         <RatingHouse>
            <Above>
               {rating ? (
                  <Rating>
                     <StarImg />
                     <RatingSpan>{rating}</RatingSpan>
                  </Rating>
               ) : (
                  ''
               )}
            </Above>
         </RatingHouse>
         <CoverImage image={url.toString()} alt={title} />
         <NameHome>
            {title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            nam in doloribus reiciendis velit, exercitationem numquam dolore
            ipsum animi corrupti, voluptatibus, placeat repellat hic odit illum
            veniam eius maxime dignissimos!
         </NameHome>
         <HomeLocations>
            {price ? <Location /> : ''}

            {locations}
         </HomeLocations>
         {price ? (
            <div>
               ${price} / <Day>day</Day>
            </div>
         ) : (
            ''
         )}
      </div>
   );
}

export default PopularHouseItem;
const CoverImage = styled(CardMedia)(() => ({
   width: '400px',
   height: '484px',
   objectFit: 'cover',
}));
const Day = styled('span')(() => ({
   color: '#757575',
   fontWeight: '500',
   fontSize: '16px',
}));

const RatingSpan = styled('span')(() => ({
   color: ' #FFFFFF',
   paddingLeft: '10px',
   paddingTop: '5px',
   width: '22px',
   height: '17px',
}));

const StarImg = styled(StarIcon)(() => ({
   width: '35px',
   paddingLeft: '14px',
}));

const Rating = styled('div')(() => ({
   display: 'flex',
   borderRadius: '2px',
   background: ' rgba(52, 52, 52, 0.5)',
   width: '82px',
   height: '30px',
}));

const RatingHouse = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}));

const Above = styled('div')(() => ({
   position: 'relative',
   top: '50px',
   right: '30px',
}));

const HomeLocations = styled('div')(() => ({
   fontSize: '16.94px',
   fontWeight: '400',
   color: '#757575',
   display: 'flex',
   gap: '10px',
   marginTop: '5px',
   marginBottom: '10px',
}));

const NameHome = styled('div')(() => ({
   fontSize: '18px',
   fontWeight: '400',
   marginTop: '5px',
   width: '100px',
   textOverflow: 'ellipsis',
   overflow: 'hidden',
   whiteSpace: 'nowrap',
   // skvfn
}));
