import { useState, useEffect } from 'react';

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function wonComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function emptyCheck(value) {
  let result = false;
  if (value === undefined || value === '') {
    result = true;
  }
  return result;
}

export const timeFormat = (time) => {
  const m = Math.floor(time / 60).toString();
  let s = (time % 60).toString();
  if (s.length === 1) s = `0${s}`;
  return `${m}:${s}`;
};

/**
 * n자리 랜덤 문자열 생성기
 *
 * @param maxLength - default: 6자리
 * @returns {string}
 */
export const generateRandomString = (maxLength = 6) => {
  const availableChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(Array(maxLength).keys()).reduce((prev) => {
    return prev + availableChar.charAt(Math.floor(Math.random() * availableChar.length));
  }, '');
};

/**
 * 전화번호에 '-' 삽입
 *
 * @param {string} phoneNo
 * @returns {string} ex) 010-0000-0000
 */
export const addHyphenToPhoneNo = (phoneNo) => {
  return phoneNo
    .replace(/[^0-9]/g, '')
    .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
    .replace('--', '-');
};
