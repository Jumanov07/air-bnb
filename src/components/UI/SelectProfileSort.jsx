import MenuItem from '@mui/material/MenuItem';
import {
   styled,
   Select as MuiSelect,
   Checkbox,
   Radio,
   FormControlLabel,
   RadioGroup,
   OutlinedInput,
   InputLabel,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { ArrowToDown, IxtIcon } from '../../assets/icons/index';
import { getProjects } from '../../redux/slices/profilePageSlice';

function SelectProfileSort({
   value,
   onChange,
   options = [],
   label,
   setSortValue,
   sortValue,
   setRating,
   open,
   valueTabs,
   ...rest
}) {
   const [textList, setTextList] = useState([]);
   const [valueRadio, setValueRadio] = useState([]);
   const dispatch = useDispatch();

   const handleClick = (option) => {
      if (textList.includes(option)) {
         setTextList((prev) => prev.filter((list) => list.id !== option.id));
         setSortValue((prev) => prev.filter((label) => label !== option.label));
         setRating((prev) => prev.filter((label) => label !== option.label));
      } else {
         setTextList((prev) => [...prev, option]);
         setSortValue((prev) => [...prev, option.label]);
         setRating((prev) => [...prev, option.label]);
      }
   };

   const getRequestDate = useCallback(() => {
      const getParams = {
         mainInUserProfile: valueTabs,
         sortingHousesByValue: valueRadio,
         size: 20,
         page: 1,
      };
      return getParams;
   }, [valueTabs, valueRadio]);

   useEffect(() => {
      const params = getRequestDate();
      dispatch(getProjects({ ...params }));
   }, [getRequestDate, getProjects]);

   const handlerRemove = () => {
      setTextList([]);
      setSortValue([]);
      setRating([]);
      onChange([]);
   };
   return (
      <div>
         <FormControl>
            <InputLabel style={{ paddingLeft: '30px', paddingTop: '10px' }}>
               Sort
            </InputLabel>
            <StyledSelect
               {...rest}
               value={value}
               onChange={onChange}
               labelId="demo-multiple-chip-label"
               id="demo-multiple-chip"
               multiple
               input={<OutlinedInput />}
               IconComponent={ArrowToDown}
               renderValue={(selected) => {
                  return textList
                     .filter((list) => selected.includes(list.label))
                     .map((list) => list.label)
                     .join(', ');
               }}
            >
               {options.map((option) => (
                  <StyledMenuItem
                     key={option.id}
                     value={option.label}
                     onClick={() => handleClick(option)}
                  >
                     {option.label === 'In wish list' ||
                     option.label === 'Apartment' ||
                     option.label === 'House' ? (
                        <Checkbox
                           checked={sortValue.indexOf(option.label) > -1}
                        />
                     ) : null}

                     {option.label}
                  </StyledMenuItem>
               ))}
               {open ? <Title>Price</Title> : null}
               {open ? (
                  <RadioGroup
                     onChange={(e) => setValueRadio(e.target.value)}
                     value={valueRadio}
                  >
                     <BoxContinerStyled>
                        <FormControlLabel
                           className="hoverStyled"
                           value="Low to high"
                           control={<Radio />}
                           label="Low to high"
                        />
                        <FormControlLabel
                           className="hoverRadio"
                           value="High to low"
                           control={<Radio />}
                           label="High to low"
                        />
                     </BoxContinerStyled>
                  </RadioGroup>
               ) : null}
            </StyledSelect>
         </FormControl>
         <div style={{ display: 'flex', width: '200px', gap: '10px' }}>
            {textList.map((list) => {
               return (
                  <div key={list.id}>
                     <Container>
                        <IxtIcon
                           style={{ marginTop: '15px', marginLeft: '10px' }}
                        />
                        <ListStyeld onClick={() => handleClick(list)}>
                           {list.label}
                        </ListStyeld>
                     </Container>
                  </div>
               );
            })}
            <div>
               {textList.length > 0 ? (
                  <div>
                     <ClearStyled onClick={handlerRemove}>
                        Clear all
                     </ClearStyled>
                     <BorderStyled />
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
}

export default SelectProfileSort;
const BorderStyled = styled('div')(() => ({
   border: '1px solid #828282',
   width: '60px',
}));
const ClearStyled = styled('div')(() => ({
   width: '100px',
   marginTop: '24px',
   color: '#828282',
   cursor: 'pointer',
}));
const Title = styled('p')(() => ({
   marginLeft: '17px',
}));
const BoxContinerStyled = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '30px',
   '.hoverStyled': {
      '&:hover': {
         width: '300px',
         background: 'rgba(0, 0, 0, 0.04)',
      },
   },
   '.hoverRadio': {
      '&:hover': {
         width: '300px',
         background: 'rgba(0, 0, 0, 0.04)',
      },
   },
}));
const Container = styled('div')(() => ({
   backgroundColor: '#F3F3F3',
   display: 'flex',
   marginTop: '20px',
}));
const ListStyeld = styled('button')(() => ({
   color: '#828282',
   width: '130px',
   height: '35px',
   border: 'none',
}));
const StyledMenuItem = styled(MenuItem)(() => ({
   width: '343px',
}));

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
