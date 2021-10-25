const openIos = url => {
  const encodedParam = fixedEncodeURIComponent("||" + url);
  console.log('ios push : ', url)
  window.location="sonyapp://openbrowser"+encodedParam;
}

const openAndroid = url => {
  console.log('android push : ', url)
  window.location="sonyapp://openbrowser||"+url;
}

export const openBrowser = (agent, event) => {
  if (!agent.isApp) return;
  event.preventDefault();
  const { href } = event.currentTarget;
  if (!href) return;
  agent.device === 'ios' ? openIos(href) : openAndroid(href)
}

function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

}