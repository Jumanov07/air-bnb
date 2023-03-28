import React from 'react';
import { styled } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { CameraIcon } from '../../assets';

function ImagePicker({ setImage }) {
   const onDrop = (file) => {
      setImage(file[0]);
   };

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
   });

   return (
      <ContainerDrop {...getRootProps()}>
         <input {...getInputProps()} />
         <CameraIcon />
      </ContainerDrop>
   );
}

const ContainerDrop = styled('div')`
   width: 100px;
   height: 100px;
   background-color: #f3f3f3;
   display: flex;
   justify-content: center;
   align-items: center;
   :hover {
      border: 1px solid #c4c4c4;
   }
`;

export default ImagePicker;
