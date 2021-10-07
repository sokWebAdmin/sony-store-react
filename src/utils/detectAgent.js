// osType : '01' | '02'
const osTypeReferee = () => {
  const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

  if ( varUA.indexOf('android') > -1) {
    //안드로이드
    return "android";
  } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "other";
  }
};

/*
 * return {
 *   isApp: boolean,
 *   device: 'android'|'ios'|'unknown'
 * }
 */
export const getAgent = () => {
  const { userAgent } = window.navigator;
  const isWeb = !userAgent.includes('osType');
  if (isWeb) {
    return {
      isApp: false,
    };
  }

  const osTypeIndex = userAgent.indexOf('osType/');
  if (osTypeIndex) {
    return {
      isApp: true,
      device: osTypeReferee(),
    };
  }

  return null;
};