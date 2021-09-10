import paymentModule from '../../module/payment';

const orderPayment = {
  get hasModule () {
    return !!window?.NCPPay;
  },
  get NCPPay () {
    return window?.NCPPay;
  },
  init () {
    paymentModule.importScript();
    console.log(window.NCPPay);
  },
};

export default orderPayment;