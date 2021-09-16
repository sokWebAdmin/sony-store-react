import { getWithExpire, setWithExpire } from '../utils/storage';

const name = 'SHOPBYPRO_CART_GUEST_INFO';

const gc = {
  data: [],
  fetch () {
    const data = getWithExpire(name);
    gc.data = data ? data : [];
  },
  set (item) {
    gc.fetch();

    gc.data.push(item);
    setWithExpire(name, gc.data);
  },
  get items () {
    return gc.data;
  },
};

if (process.env.NODE_ENV === 'development') {
  window['gc'] = gc;

  // test code...
  gc.fetch();
  gc.set({ item: '😅' });
}

export default gc;