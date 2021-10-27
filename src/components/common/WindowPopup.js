import React from 'react';

let browser = window;
let popup = null;

const WindowOpener = (props) => {
  const { children, width, height, className, bridge } = props;
  const opts = `dependent=${1}, alwaysOnTop=${1}, alwaysRaised=${1}, alwaysRaised=${1}, width=${width || 300}, height=${height || 400}`;
  browser = window.self;
  browser.onSuccess = (res) => {
    bridge(null, res);
  };

  browser.onError = (error) => {
    bridge(error);
  };

  browser.onOpen = (message) => {
    bridge(null, message);
  };

  browser.onClose = (message) => {
    bridge(null, message);
  };

  const onClickHandler = () => {
    const { url, name } = props;
    if (popup && !popup.closed) {
      popup.focus();
      return;
    }
    popup = browser.open(url, name, opts);
  };

  return <div className={className} onClick={onClickHandler}>{children}</div>;
};

export default WindowOpener;