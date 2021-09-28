import _, { add } from 'lodash';

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

export const getColorChipValues = value => {
   if (!value.includes('_#')) return []

   value = value.includes('|') 
            ? _.head(value.split('|')) 
            : value;
   
   const colors = value.split('_');

   const [label, code] = colors;

   const isBlack = label.includes('블랙') || label.includes('검정');
   if (isBlack && !code.includes('#000000')) {
      colors[1] = '#000000';
   };

   return colors;
};

export const colorsGroupByOptionNo = options => {
  return _.chain(options)
   .flatMap(({optionNo, value}) => ({ optionNo, value: getColorChipValues(value) }))
   .groupBy('optionNo')
   .value()
}

export const getColorChipInfo = (hasColor, productName, values, option) => {
   
   if (hasColor && values) {
      const [ label, code ] = values;
      return {
         label: `${productName}${ label ? ` / ${label}` : '' }`,
         background: code
      }
   } else {
      const { label, value } = option;
      const keys = label.split('|');
      const values = value.split('|');
      return {
         label: _.chain()
                 .range(keys.length)
                 .map(i => `${keys[i]}: ${values[i]}`)
                 .join(' | ')
                 .value()
      }
   }
}

export const getSaleStatus = (status, reservationDate) => {
   const { saleStatusType, soldout } = status;

   if (soldout) {
      return 'SOLDOUT';
   };

   if (reservationDate?.reservationStartYmdt) {
      const { reservationStartYmdt, reservationEndYmdt } = reservationDate;
      const reservStart = (new Date(reservationStartYmdt)).getTime();
      const reservEnd = (new Date(reservationEndYmdt)).getTime();
      const now = (new Date()).getTime();

      if (reservStart > now) {
         return 'READY_RESERVE';
      }

      if (reservEnd >= now) {
         return 'RESERVE';
      }
   }

   if (['ONSALE', 'FINISHED', 'STOP', 'PROHIBITION'].includes(saleStatusType)) {
      return '';
   }

   return 'READY';
};

export const getPricePerProduct = ({ salePrice, immediateDiscountAmt, additionDiscountAmt }) => {
   const discount = salePrice - immediateDiscountAmt - additionDiscountAmt;

   return salePrice !== discount ? { origin: salePrice, discount } : { discount }
}