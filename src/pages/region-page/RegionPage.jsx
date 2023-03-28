import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled, Typography } from '@mui/material';
import { itemData } from '../../utils/constants/general';

function srcset(image, size, rows, cols) {
   return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
         size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
   };
}

function RegionPage() {
   const navigate = useNavigate();
   return (
      <StyledImageList data-aos="fade-left">
         <StyledTypography>REGION IN KYRGYSTAN </StyledTypography>
         <Text>
            You can visit the site any day and be sure that you will find
            everything for a great vacation.
         </Text>
         <ImageList
            sx={{ width: '100%', height: 1000 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
         >
            {itemData.map((item) => (
               <ImageListItem
                  data-aos="fade-right"
                  onClick={() =>
                     navigate({
                        search: `region=${item.path}`,
                        pathname: 'region',
                     })
                  }
                  key={item.img}
                  cols={item.cols}
                  rows={item.rows}
               >
                  <img
                     {...srcset(item.img, item.rows, item.cols)}
                     alt={item.title}
                     title={item.description}
                     loading="lazy"
                  />
                  <RegionStyled data-aos="fade-left">
                     {item.region}
                  </RegionStyled>
               </ImageListItem>
            ))}
         </ImageList>
      </StyledImageList>
   );
}
export default RegionPage;

const RegionStyled = styled('p')(() => ({
   position: 'relative',
   top: '-30px',
   left: '10px',
   zIndex: '20',
   color: 'white',
   width: '200px',
   textTransform: 'uppercase',
}));
const StyledImageList = styled('div')(() => ({
   margin: '170px 100px 170px 100px',
   cursor: 'pointer',
}));

const StyledTypography = styled(Typography)(() => ({
   fontSize: '20px',
   lineHeight: '24px',
   color: '#363636',
   width: '241px',
   height: ' 24px',
}));

const Text = styled(Typography)(() => ({
   width: '684px',
   height: '19px',
   fontSize: '16px',
   lineHeight: '19px',
   color: '#363636',
   marginBottom: '40px',
}));
