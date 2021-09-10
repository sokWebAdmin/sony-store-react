// ncpPay, neverPay module importer
const paymentModule = {
  scriptURL: {
    alpha: 'https://alpha-shop-api.e-ncp.com/payments/ncp_pay_alpha.js',
    real: 'https://shop-api.e-ncp.com/payments/ncp_pay.js',
  },
  importScript () {
    const src = process?.NODE_ENV === 'production'
      ? paymentModule.scriptURL.real
      : paymentModule.scriptURL.alpha;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.append(script);
  },
};

export default paymentModule;
