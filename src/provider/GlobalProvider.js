/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { BoardProvider } from '../context/board.context';
import GlobalContext from '../context/global.context';

const GlobalProvider = ({ children }) => {
  const onChangeGlobal = values => {
    setOption({
      ...option,
      ...values,
    });
  };
  const initialState = {
    onChangeGlobal,
    shopByToken:'',
  };
  const [option, setOption] = useState(initialState);

  return (
    <GlobalContext.Provider value={option}>
      <BoardProvider>
        {children}
      </BoardProvider>
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;