import { isMobile } from 'react-device-detect';
import { getAccessToken } from '../../utils/token';

const orderPayment = {
  get NCPPay () { // NCPPay context
    return window.NCPPay;
  },
  get config () {
    return {
      clientId: 'MzuMctQTZBXWmdTlujFy3Q==',
      accessToken: getAccessToken(),
      platform: isMobile ? 'MOBILE_WEB' : 'PC',
      confirmUrl: `${window.location.origin}/order/parse`,
    };
  },
  setConfiguration () {
    this.NCPPay.setConfiguration(this.config);
  },
  post (requestBody) {
    console.log(requestBody);
    this.NCPPay.reservation(requestBody);
  },
  run (requestBody) {
    this.setConfiguration();
    this.post(requestBody);
  },
};

export default orderPayment;