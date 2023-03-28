import { useEffect } from 'react';

function AutoScroll() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return null;
}

export default AutoScroll;
