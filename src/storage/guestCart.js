import { getWithExpire } from '../utils/storage';

const name = 'SHOPBYPRO_CART_GUEST_INFO';

const gc = {
  data: null,
  fetch () {
    const data = getWithExpire(name);
    this.data = data ? data : null;
  },
};

if (process.env.NODE_ENV === 'development') {
  window['gc'] = gc;
}

export default gc;