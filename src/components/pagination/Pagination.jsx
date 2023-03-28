import { Pagination, PaginationItem, Stack, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

const PAGE_INDEX = 'page-index';
function PagePagination({ count }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const pageParams = searchParams.get(PAGE_INDEX);
   const [pageIndex, setPage] = useState(Number(pageParams));

   useEffect(() => {
      if (!pageIndex) {
         setPage(1);
         searchParams.set(PAGE_INDEX, 1);
         setSearchParams(searchParams);
      }
   }, [pageIndex]);

   const changeHandler = (_, index) => {
      setPage(index);
      searchParams.set(PAGE_INDEX, index);
      setSearchParams(searchParams);
   };

   return (
      <Stack spacing={2}>
         <StyledPagination
            page={pageIndex}
            onChange={changeHandler}
            count={count}
            renderItem={(item) => (
               <PaginationItem classes={{ selected: 'selected' }} {...item} />
            )}
         />
      </Stack>
   );
}

export default PagePagination;

const StyledPagination = styled(Pagination)(() => ({
   margin: 'auto',
   '&.MuiPagination-root:focus': {
      color: '#DD8A08',
      borderRadius: 'none',
   },

   '&.MuiPagination-root': {
      borderRadius: 'none',
   },
   '& .MuiSvgIcon-root.MuiPaginationItem-icon ': {
      fill: '#DD8A08',
   },
   '& .selected': {
      color: '#DD8A08',
   },
}));
