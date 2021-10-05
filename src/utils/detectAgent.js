export const getAgent = () => {
  const { userAgent } = window.navigator;
  const isWeb = !userAgent.includes('osType');
  if (isWeb) {
    return {
      isApp: false,
    };
  }

  return userAgent;
};