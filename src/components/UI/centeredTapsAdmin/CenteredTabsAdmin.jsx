import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from '@mui/material';

function TabPanel({ label, children, status, ...other }) {
   const [searchParam] = useSearchParams();
   const contentStatus = searchParam.get(status) === label;
   if (contentStatus) {
      return <div {...other}>{children}</div>;
   }
}

function CenteredTabsAdmin({ TAB_ITEM, setValueTabs, valueTabs }) {
   const [searchParam, setSearchParam] = useSearchParams();

   useEffect(() => {
      setValueTabs(TAB_ITEM[0].param);
   }, []);

   const handleChange = (_, newValue) => {
      setValueTabs(newValue);
      searchParam.set('status', newValue);
      setSearchParam(searchParam);
   };

   return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
         <StyledTabs
            value={valueTabs}
            onChange={handleChange}
            centered
            classes={{ indicator: 'indicator' }}
         >
            {TAB_ITEM?.map((item) => {
               return (
                  <StyledTab
                     classes={{ selected: 'selected' }}
                     label={item.label}
                     key={item.id}
                     value={item.param}
                  />
               );
            })}
         </StyledTabs>
         {TAB_ITEM.map((item) => {
            return (
               <TabPanel key={item.id} label={item.param} status="status">
                  {item.Component}
               </TabPanel>
            );
         })}
      </Box>
   );
}

export default CenteredTabsAdmin;

const StyledTabs = styled(Tabs)((props) => ({
   borderBottom: props.borderBottom || 'solid 1px',
   width: props.width || '820px',
   color: '#6C6C6C',
   fontSize: '18px',
   '& .indicator': {
      backgroundColor: '#363636',
   },
}));

const StyledTab = styled(Tab)(() => ({
   '&.selected': {
      color: '#363636',
   },
}));
