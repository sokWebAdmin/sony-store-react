const openIos = (url, schemaName = 'openbrowser') => {
  const encodedParam = fixedEncodeURIComponent('||' + url);
  window.location = `sonyapp://${schemaName}${encodedParam}`;
};

const openAndroid = (url, schemaName = 'openbrowser') => {
  console.log(`sonyapp://${schemaName}||${url}`);
  window.location = `sonyapp://${schemaName}||${url}`;
};

export const openBrowser = (agent, event) => {
  if (!agent.isApp) return;
  event.preventDefault();
  const { href } = event.currentTarget;
  if (!href) return;
  agent.device === 'ios' ? openIos(href) : openAndroid(href);
};

export const openWindow = (agent, url, target = '', features = '', schemaName = 'openbrowser') => {
  if (!agent.isApp) {
    window.open(url, target, features);
    return;
  }
  agent.device === 'ios' ? openIos(url, schemaName) : openAndroid(url, schemaName);
};

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
}