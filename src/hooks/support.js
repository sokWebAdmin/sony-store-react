import { useState } from 'react';
import { getTerms, getTermsByTermNo, getTermsHistory } from '../api/manage';
import { getStrDate, isSameOrAfter } from '../utils/dateFormat';

const initialTerms = {
  used: false,
  contents: '',
  enforcementDate: '',
};

export const useTerms = (termsTypes) => {
  const [activeTerms, setActiveTerms] = useState({ ...initialTerms });
  const [prevTerms, setPrevTerms] = useState({ ...initialTerms });
  const [prevEnforcementDate, setPrevEnforcementDate] = useState('');

  const [historyVisible, setHistoryVisible] = useState(false);

  const fetchTerms = async () => {
    try {
      const { data } = await getTerms({ termsTypes });
      Object.values(data)?.length > 0 && setActiveTerms(Object.values(data)[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTermsByTermsNo = async (termsNo, setTerms) => {
    try {
      const { data } = await getTermsByTermNo({ termsNo });
      setTerms(data);
    } catch (e) {
      console.error(e);
    }
  };

  const setTermsNo = (histories) => {
    const filtered = histories.filter(({ enforcementDate }) => isSameOrAfter('', getStrDate(enforcementDate)));
    if (filtered.length > 1) {
      fetchTermsByTermsNo(filtered[filtered.length - 1].termsNo, setPrevTerms);
      setPrevEnforcementDate(() => filtered[filtered.length - 2]?.enforcementDate || '2018-04-16');
    } else {
      setPrevEnforcementDate(() => '2018-04-16');
    }
    // if (filtered.length > 2) {
    //   setPrevEnforcementDate(filtered[2].enforcementDate);
    // }
  };

  const fetchTermsHistory = async () => {
    try {
      const { data } = await getTermsHistory({ termsType: termsTypes });
      data?.length > 0 && setTermsNo(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleHistory = (e) => {
    e.preventDefault();
    if (prevEnforcementDate === '2018-04-16') {
      window.openWindow('https://store.sony.co.kr/handler/Common-PageView?pageName=jsp/footer/CF-termsTransfer.jsp ');
      return;
    }
    setHistoryVisible((prev) => !prev);
    document.querySelector('.contents').scrollIntoView();
  };

  return {
    activeTerms,
    prevTerms,
    prevEnforcementDate,
    historyVisible,
    fetchTerms,
    fetchTermsHistory,
    handleHistory,
  };
};
