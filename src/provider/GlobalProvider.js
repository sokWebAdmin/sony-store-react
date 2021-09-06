/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { BoardProvider } from '../context/board.context';
import GlobalContext from '../context/global.context';
import { MallProvider } from '../context/mall.context';
import { getAccessToken } from '../utils/token';

const GlobalProvider = ({ children }) => {
  const onChangeGlobal = values => {
    setOption({
      ...option,
      ...values,
    });
  };
  const initialState = {
    onChangeGlobal,
    isLogin: !!(getAccessToken() && getAccessToken() !== ''),
  };
  const [option, setOption] = useState(initialState);

  return (
    <GlobalContext.Provider value={option}>
      <MallProvider>
        <BoardProvider>
          {children}
        </BoardProvider>
      </MallProvider>
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;