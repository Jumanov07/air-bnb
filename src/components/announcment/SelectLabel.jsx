import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { styled, Select as MuiSelect, Typography } from '@mui/material';
import { ArrowToDown } from '../../assets/icons/index';

function SelectLabel({ value, onChange, options = [], title, label, ...rest }) {
   return (
      <StyledSelect
         {...rest}
         value={value}
         onChange={onChange}
         displayEmpty
         title={title}
         IconComponent={ArrowToDown}
         renderValue={(selected) => {
            return (
               <StyledLabel>
                  <StyledTypography>{title}</StyledTypography>
                  <Typography>{selected || label}</Typography>
               </StyledLabel>
            );
         }}
      >
         {options.map((option) => {
            return (
               <StyledMenuItem key={option.id} value={option.label}>
                  {option.label}
               </StyledMenuItem>
            );
         })}
      </StyledSelect>
   );
}
export default SelectLabel;

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
