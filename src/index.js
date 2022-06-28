import React from 'react';
import reportWebVitals from './reportWebVitals';
import { render, hydrate } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import GlobalContext from './context/global.context';
import GlobalProvider from './provider/GlobalProvider';

import { ContextDevTool } from 'react-context-devtool';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');

function guid() {
    function _s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    const uuid = _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();

    setCookie("GA_TRACKING",uuid, "1");
}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=value + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

guid();

if (rootElement.hasChildNodes()) {
    hydrate(
        <HelmetProvider>
            <GlobalProvider>
                <BrowserRouter>
                    <React.StrictMode>
                        <ContextDevTool
                            context={GlobalContext}
                            displayName='context Display Name'
                        />
                        <App />
                    </React.StrictMode>
                </BrowserRouter>
            </GlobalProvider>
        </HelmetProvider>,
        rootElement,
    );
} else {
    render(
        <HelmetProvider>
            <GlobalProvider>
                <BrowserRouter>
                    <React.StrictMode>
                        <ContextDevTool
                            context={GlobalContext}
                            displayName='context Display Name'
                        />
                        <App />
                    </React.StrictMode>
                </BrowserRouter>
            </GlobalProvider>
        </HelmetProvider>,
        rootElement,
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
