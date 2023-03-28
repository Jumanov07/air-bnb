import { Box, styled, Modal as MuiModal, Typography } from '@mui/material';

function Modal({ open, handleClose, children, ...props }) {
   return (
      <MuiModal onClose={handleClose} open={open}>
         <BoxModal {...props}>
            <Typography component="div">{children}</Typography>
         </BoxModal>
      </MuiModal>
   );
}

export default Modal;

const BoxModal = styled(Box)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   background: '#FFFFFF',
   outline: 'none',
   borderRadius: '2px',
   width: '322px',
   height: '262px',
}));
