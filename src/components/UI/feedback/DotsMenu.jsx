import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState } from 'react';

function DotsMenu() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   return (
      <div>
         <IconButton
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
         >
            <MoreVertIcon />
         </IconButton>
         <Menu
            id="long-menu"
            aria-labelledby="long-menu"
            MenuListProps={{
               'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
         </Menu>
      </div>
   );
}

export default DotsMenu;
