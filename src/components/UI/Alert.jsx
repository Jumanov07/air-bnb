import { Alert as AlertMui, Snackbar, styled } from '@mui/material';

function Alerts({
   open,
   vertical,
   horizontal,
   handleClose,
   errorMessage,
   closedTamer,
   title,
   variant,
   anchorOrigin,
   ...props
}) {
   return (
      <div>
         <Snackbar
            autoHideDuration={closedTamer}
            {...props}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
         >
            <StyledAlert icon={false} onClose={handleClose}>
               <strong>{errorMessage}</strong>
               <div>{title}</div>
            </StyledAlert>
         </Snackbar>
      </div>
   );
}
export default Alerts;

const StyledAlert = styled(AlertMui)(() => ({
   background: '#FFF1F0',
   width: '612px',
   height: '100px',
   '& strong': {
      color: '#000000',
      fontWeight: '500',
      fontSize: '16px',
      padding: '12px 0px 0px 22px',
   },
   '& div': {
      color: '#646464',
      fontWeight: '400',
      fontSize: '14px',
      padding: '6px 0px 0px 22px',
   },
}));
