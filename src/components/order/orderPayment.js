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
  get clientReturnUrl () {
    return window.location.href;
  },
  setConfiguration (config) {
    this.NCPPay.setConfiguration(config || this.config);
  },
  post (requestBody) {
    this.NCPPay.reservation(requestBody);
  },
  order (requestBody, errorHandler) {
    this.NCPPay.requestNaverPayOrder({
      items: requestBody,
      clientReturnUrl: this.clientReturnUrl
    }, 
    () => errorHandler
    )
  },
  wish (productNo) {
    this.NCPPay.requestNaverPayWishList({
      productNo,
      clientReturnUrl: this.clientReturnUrl
    })
  },
  run (requestBody) {
    this.setConfiguration();
    this.post(requestBody);
  },
  naverPayOrder (requestBody, errorHandler) {
    const { confirmUrl, ...rest } = this.config;
    this.setConfiguration({ ...rest });
    this.order(requestBody, errorHandler)
  },
  naverPayWishList (productNo) {
    const { clientId, platform } = this.config;
    this.setConfiguration({ clientId, platform });
    this.wish(productNo);
  }
};

export default orderPayment;