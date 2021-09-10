// import paymentModule from '../../module/payment';
import { isMobile } from 'react-device-detect';
import { getAccessToken } from '../../utils/token';

const orderPayment = {
  get NCPPay () { // NCPPay context
    return window.NCPPay;
  },
  get config () {
    return {
      clientId: 'MzuMctQTZBXWmdTlujFy3Q==', // TODO
      accessToken: getAccessToken(),
      platform: isMobile ? 'MOBILE_WEB' : 'PC',
      confirmUrl: `${window.location.origin}/order/complete`,
    };
  },
  // init () {
  //   paymentModule.importScripts();
  // },
  setConfiguration () {
    this.NCPPay.setConfiguration(this.config);
    console.log('set config : ', this.config);
  },
  post (requestBody) {
    this.NCPPay.reservation(requestBody);
  },
  run (requestBody) {
    this.setConfiguration();
    this.post(requestBody);
  },
};

export default orderPayment;