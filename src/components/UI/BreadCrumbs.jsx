import React from 'react';
import { Breadcrumbs, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const BreadCrumbs = ({ paths, lastPath }) => {
   return (
      <Breadcrumbs aria-label="breadcrumbs" separator=" / ">
         {paths?.map((path) => {
            return (
               <StyledFlex key={path.path}>
                  <Link key={path.path} to={path.path}>
                     <PathName>{path.name}</PathName>
                  </Link>
                  <Link key={path.prevPath} to={path.prevPath}>
                     <PathName>
                        {/* <StyledSlesh>/</StyledSlesh> */}
                        <Span>{path.prevName}</Span>
                     </PathName>
                  </Link>
               </StyledFlex>
            );
         })}
         {lastPath && <LastPath>{lastPath}</LastPath>}
      </Breadcrumbs>
   );
};
export default BreadCrumbs;

const Link = styled(NavLink)`
   color: ${({ color }) => color || '#C4C4C4'};
   text-decoration: none;
   font-weight: 400;
   font-size: 14px;
   line-height: 17px;
   cursor: pointer;
`;
const LastPath = styled('p')(() => ({
   textTransform: 'capitalize',
   color: '#363636',
}));
const PathName = styled('p')(() => ({
   textTransform: 'capitalize',
}));

const StyledFlex = styled('div')(() => ({
   display: 'flex',
   gap: '5px',
}));

// const StyledSlesh = styled('span')(() => ({
//    color: '#C4C4C4',
// }));

const Span = styled('span')(() => ({
   marginLeft: '5px',
}));
