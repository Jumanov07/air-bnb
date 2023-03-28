import React from 'react';
import RegionPage from '../../region-page/RegionPage';
import PopularHouse from '../../../components/PopularHouses/PopularHouses';
import WelcomePage from '../../welcome-page/WelcomePage';
import SlideApartments from '../../welcome-page/SlideApartments';

function MainPage() {
   return (
      <>
         <WelcomePage />
         <RegionPage />
         <SlideApartments />
         <PopularHouse />
         <SlideApartments lastest="true" />
      </>
   );
}

export default MainPage;
