const heightStyle = (height, headerHeight) => {
   const marginTop = headerHeight > 0 ? (headerHeight / 2) *- 1 : 0;

   if (height - headerHeight < 500) {
      return ({
            height: '500px',
            marginTop,
      })
   };

   return ({
      height: `${ height }px`,
      marginTop,
   })
}

export const getMainSliderStyle = ({ width, height }, headerHeight) => {
   return width > 1280 
      ? heightStyle(height, headerHeight) 
      : { display: 'block' };
}