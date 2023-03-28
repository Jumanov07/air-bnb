import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { styled, Select as MuiSelect, Typography } from '@mui/material';
import { ArrowToDown } from '../../assets/icons/index';

function Select(props) {
   return (
      <StyledSelect
         value={props.value}
         onChange={props.onChange}
         displayEmpty
         title={props.title}
         IconComponent={ArrowToDown}
         renderValue={() => {
            return (
               <StyledLabel>
                  <StyledTypography>{props.title}</StyledTypography>
                  <Typography component="div">
                     {props.label || 'All'}
                  </Typography>
               </StyledLabel>
            );
         }}
      >
         {props.options?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.homeType?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.homeTypeSecond?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.homePrice?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {/* ============================================================ */}
         {props.filterByArr?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.sortByArr?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.FilterByHomeType?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
         {props.FilterByPrice?.map((option) => {
            return (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
      </StyledSelect>
   );
}
export default Select;

const StyledMenuItem = styled(MenuItem)(() => ({
   width: '343px',
}));

const StyledLabel = styled('div')`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;
`;

const StyledSelect = styled(MuiSelect)(() => ({
   minWidth: '271px ',
   borderRadius: '2px',
   height: '42px',
   border: '1px solid #C4C4C4',
   '& .MuiSelect-icon': {
      top: '50%',
      transform: 'translateY(-50%)',
   },
   '& .MuiSelect-iconOpen': {
      transform: 'translateY(-50%) rotate(180deg)',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '& .focused': {
      background: 'red',
   },
}));
const StyledTypography = styled(Typography)(() => ({
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '19px',
   color: '#828282',
}));
