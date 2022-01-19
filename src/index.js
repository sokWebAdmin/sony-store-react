import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextDevTool } from 'react-context-devtool';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalContext from './context/global.context';
import GlobalProvider from './provider/GlobalProvider';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
    hydrate(
        <GlobalProvider>
            <BrowserRouter>
                <React.StrictMode>
                    <HelmetProvider>
                        <ContextDevTool
                            context={GlobalContext}
                            displayName='context Display Name'
                        />
                        <App />
                    </HelmetProvider>
                </React.StrictMode>
            </BrowserRouter>
        </GlobalProvider>,
        rootElement,
    );
} else {
    render(
        <GlobalProvider>
            <BrowserRouter>
                <React.StrictMode>
                    <HelmetProvider>
                        <ContextDevTool
                            context={GlobalContext}
                            displayName='context Display Name'
                        />
                        <App />
                    </HelmetProvider>
                </React.StrictMode>
            </BrowserRouter>
        </GlobalProvider>,
        rootElement,
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
