// osType : '01' | '02'
const osTypeReferee = osType => {
  if (osType === '01') {
    return 'android';
  }
  if (osType === '02') {
    return 'ios';
  }
  return 'unknown';
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
      device: osTypeReferee(userAgent.substr(osTypeIndex + 7, 2)),
    };
  }

  return {
    isApp: true,
    device: 'unknown',
  };
};