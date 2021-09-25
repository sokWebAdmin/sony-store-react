import _ from 'lodash';

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

export const getColorChipValues = value => value.includes('_#') && value.split('_');

export const colorsGroupByOptionNo = options => {
  return _.chain(options)
   .flatMap(({optionNo, value}) => ({ optionNo, value: getColorChipValues(value) }))
   .groupBy('optionNo')
   .value()
}

export const getColorChipInfo = (hasColor, productName, values) => {
   if (hasColor && values) {
      const [ label, code ] = values;
      return {
         label: `${productName} (${label})`,
         background: code.includes('|') ? _.head(code.split('|')) : code
      }
   } else {
      return {
         label: productName
      }
   }
}