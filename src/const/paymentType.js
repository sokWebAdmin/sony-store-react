const paymentType = {
  creditCard: {
    pgType: 'INICIS',
    payType: 'CREDIT_CARD',
    label: '신용카드',
  },
  virtualAccount: {
    pgType: 'INICIS',
    payType: 'VIRTUAL_ACCOUNT',
    label: '가상계좌',
  },
  nPay: {
    pgType: 'INICIS',
    payType: 'NAVER_EASY_PAY',
    label: '네이버페이',
  },
};

export default paymentType;