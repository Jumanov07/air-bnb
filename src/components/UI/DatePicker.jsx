/* eslint-disable import/no-extraneous-dependencies */
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { InputAdornment, styled } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';

import { DateIcon } from '../../assets/icons';

export default function DatePicker({ date, onChange }) {
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);

   const openCalendar = (e) => {
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };

   return (
      <LocalizationProvider dateAdapter={DateFnsUtils} locale={ru}>
         <StyledDateRangePicker
            calendars={1}
            value={date}
            minDate={new Date()}
            startText="Select date"
            endText="Select date"
            LeftArrowButton
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onChange={onChange}
            PaperProps={{ classes: { root: 'paper' } }}
            renderInput={(startProps, endProps) => (
               <>
                  <TextField
                     {...startProps}
                     onFocus={openCalendar}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="start">
                              <DateIcon />
                           </InputAdornment>
                        ),
                     }}
                  />
                  <TextField
                     onFocus={openCalendar}
                     {...endProps}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="start">
                              <DateIcon />
                           </InputAdornment>
                        ),
                     }}
                  />
               </>
            )}
            PopperProps={{
               anchorEl,
            }}
         />
      </LocalizationProvider>
   );
}

const StyledDateRangePicker = styled(DateRangePicker)(() => ({
   fontFamily: 'Roboto',
   marginTop: '30px',

   '& .MuiFormControl-root.MuiTextField-root': {
      width: '217px ',
   },
   '& .MuiFormControl-root': {
      marginLeft: '20px',
   },
   '& .MuiTypography-subtitle1': {
      textTransform: 'capitalize',
   },
   '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
      background: '#DD8A08',
   },
   '& .MuiDateRangePickerDay-root.MuiDateRangePickerDay-rangeIntervalDayHighlight':
      {
         background: 'transparent',
      },
   '& .MuiDateRangePickerDay-root.MuiDateRangePickerDay-rangeIntervalDayHighlight:not(.MuiDateRangePickerDay-rangeIntervalDayHighlightEnd):not(.MuiDateRangePickerDay-rangeIntervalDayHighlightStart)':
      {
         textDecoration: 'line-through',
         textDecorationColor: '#C4C4C4',
      },
   '& .MuiDateRangePickerDay-root.MuiDateRangePickerDay-rangeIntervalDayHighlight.MuiDateRangePickerDay-rangeIntervalDayHighlightEnd':
      {
         opacity: 1,
      },
   '& .MuiDateRangePickerDay-root.MuiDateRangePickerDay-rangeIntervalDayHighlight.MuiDateRangePickerDay-rangeIntervalDayHighlightStart':
      {
         opacity: 1,
      },
   '& .MuiButtonBase-root.MuiPickersDay-root.MuiDateRangePickerDay-day.MuiDateRangePickerDay-notSelectedDate.MuiDateRangePickerDay-dayInsideRangeInterval':
      {
         color: '#C4C4C4',
      },
   '& .MuiInputBase-input.MuiOutlinedInput-input ': {
      height: '15px',
      width: '220px',
   },
}));
