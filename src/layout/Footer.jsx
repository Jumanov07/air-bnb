import { styled, Toolbar } from '@mui/material';
import logoFooter from '../assets/icons/LogoFooter.svg';
import instagram from '../assets/icons/instagram.svg';
import telegram from '../assets/icons/telegram.svg';
import whatsApp from '../assets/icons/whatsApp.svg';

const icons = [{ icon: instagram }, { icon: telegram }, { icon: whatsApp }];

function Footer() {
   return (
      <ToolbarFooterBox>
         <div className="container">
            <div className="textFooter">
               <p className="region"> Regions</p>
               <p className="textLive">leave an ad</p>
            </div>
            <div>
               <img src={logoFooter} alt="" />
            </div>
            <div className="icons">
               {icons.map((el) => {
                  return (
                     <div key={el.icon} className="boxIcons">
                        <img src={el.icon} alt="" />
                     </div>
                  );
               })}
            </div>
         </div>
         <div>
            <p className="textDown">
               © Copyright PeakSoft. All Rights Reserved
            </p>
         </div>
      </ToolbarFooterBox>
   );
}
const ToolbarFooterBox = styled(Toolbar)(() => ({
   background: '#1C2E20',
   width: 'auto',
   height: '222px',
   display: 'flex',
   flexDirection: 'column',
   margin: 'auto',
   justifyContent: 'space-around',
   '& .container': {
      marginTop: '60px',
      marginBottom: '20px',
      width: '1132px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   '& .textFooter': {
      display: 'flex',
      gap: '40px',
   },
   '& .region': {
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
      cursor: 'pointer',
   },
   '& .textLive': {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFBE58',
      cursor: 'pointer',
   },

   '& .icons': {
      display: 'flex',
      gap: '16px',

      '& .boxIcons': {
         background: 'rgba(255, 255, 255, 0.12)',
         borderRadius: '2px',
         width: '40px',
         height: '40px',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         cursor: 'pointer',
         '& img': {
            width: '20px',
            height: '20px',
         },
      },
   },
   '& .textDown': {
      color: '#859589',
   },
}));

export default Footer;
