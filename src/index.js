import React from 'react';
import reportWebVitals from './reportWebVitals';
import { render, hydrate } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import GlobalContext from "./context/global.context";
import GlobalProvider from "./provider/GlobalProvider";

import { ContextDevTool } from "react-context-devtool";

const rootElement = document.getElementById('root');

if (navigator.userAgent.indexOf("Trident") > 0) {
  window.location = 'microsoft-edge:' + window.location;
} else if (/MSIE \d |Trident.*rv:/.test(navigator.userAgent)) {
  window.location = 'microsoft-edge:' + window.location;
}

if (rootElement.hasChildNodes()) {
  hydrate(
    <GlobalProvider>
      <BrowserRouter>
        <React.StrictMode>
            <ContextDevTool context={GlobalContext} displayName="context Display Name" />
            <App />
        </React.StrictMode>
      </BrowserRouter>
    </GlobalProvider>,
    rootElement
  );
} else {
  render(
    <GlobalProvider>
      <BrowserRouter>
        <React.StrictMode>
            <ContextDevTool context={GlobalContext} displayName="context Display Name" />
            <App />
        </React.StrictMode>
      </BrowserRouter>
    </GlobalProvider>,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();