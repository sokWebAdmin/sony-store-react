// ncpPay, neverPay module importer
const paymentModule = {
  payScripts: {
    real: [
      'https://shop-api.e-ncp.com/payments/ncp_pay.js',
      'https://pay.kcp.co.kr/plugin/payplus_web.jsp',
      'https://xpayvvip.uplus.co.kr/xpay/js/xpay_crossplatform.js',
    ],
    alpha: [
      'https://alpha-shop-api.e-ncp.com/payments/ncp_pay_alpha.js',
      'https://testpay.kcp.co.kr/plugin/payplus_web.jsp',
      'https://pretest.uplus.co.kr:9443/xpay/js/xpay_crossplatform.js',
    ],
  },
  importScripts () {
    const scripts = process?.NODE_ENV === 'production'
      ? paymentModule.payScripts.real
      : paymentModule.payScripts.alpha;

    scripts.forEach(src => {
      document.write(`<script type='text/javascript' src=${src}></script>`);
    });
  },
};

export default paymentModule;
