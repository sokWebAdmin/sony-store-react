import { isMobile } from 'react-device-detect';
import { getAccessToken } from '../../utils/token';
import { getAgent } from '../../utils/detectAgent';

const agent = getAgent();

const orderPayment = {
  get NCPPay () { // NCPPay context
    return window.NCPPay;
  },
  get platform () {
    if (!agent.isApp) {
      return isMobile ? 'MOBILE_WEB' : 'PC';
    }
    // ios 아닌경우 android 로 판단. android 특정 기기에서 이슈있다면 이곳 확인할것
    return agent.device === 'ios' ? 'IOS' : 'AOS';
  },
  get config () {
    return {
      clientId: 'MzuMctQTZBXWmdTlujFy3Q==',
      accessToken: getAccessToken(),
      platform: this.platform,
      confirmUrl: `${window.location.origin}/order/parse`,
    };
  },
  setConfiguration () {
    this.NCPPay.setConfiguration(this.config);
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