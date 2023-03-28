import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { notFoundImage } from '../../assets/images';

function PreviewSlider({ imgs }) {
   const [wordData, setWordData] = useState(imgs);
   const [value, setValue] = useState(0);
   useEffect(() => {
      setWordData(imgs);
      setValue(0);
   }, [imgs]);
   const handleClick = (index) => {
      const wordSlider = imgs[index];
      setWordData(wordSlider);
      setValue(index);
   };
   return (
      <Div>
         <Img src={wordData} alt="" />
         <FlexRow>
            {imgs?.length === 0 || null ? (
               <Img2 src={notFoundImage} alt="home" />
            ) : (
               imgs?.map((data, index) => (
                  <div key={data}>
                     {value !== index && (
                        <Thumbnail>
                           <Img2
                              src={data}
                              onClick={() => handleClick(index)}
                              alt="home"
                           />
                        </Thumbnail>
                     )}
                  </div>
               ))
            )}
         </FlexRow>
      </Div>
   );
}
export default PreviewSlider;
const Img = styled('img')(() => ({
   width: '100%',
   height: '507px',
}));
const Img2 = styled('img')(() => ({
   height: '137px',
   width: '196px',
}));
const Div = styled('div')(() => ({
   // marginTop: '30px',
   width: '630px',
   // paddingLeft: '20px',
}));
const FlexRow = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-start',
   paddingTop: '20px',
}));
const Thumbnail = styled('div')(() => ({
   marginRight: '7px',
}));
