import { useState } from 'react';

const useDrawer = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return {
      anchorEl,
      open,
      handleClick,
      handleClose,
      openModal,
      setOpenModal,
      setAnchorEl,
   };
};

export default useDrawer;
