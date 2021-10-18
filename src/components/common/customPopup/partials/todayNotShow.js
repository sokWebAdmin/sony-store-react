import Cookies from 'js-cookie';

const NAME_SPACE = 'custom_popup_period_';

const todayNotShow = {
  getPeriod () {
    return Date.now() + (1000 * 60 * 60 * 24);
  },
  set (popupNo) {
    Cookies.set(NAME_SPACE + popupNo.toString(), this.getPeriod());
  },
  get (popupNo) {
    return Cookies.get(NAME_SPACE + popupNo.toString());
  },
};

export default todayNotShow;