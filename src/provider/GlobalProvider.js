/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { BoardProvider } from '../context/board.context';
import GlobalContext from '../context/global.context';
import { MallProvider } from '../context/mall.context';
import { ProfileProvider } from '../context/profile.context';
import { HeaderProvider } from '../context/header.context';
import { getAccessToken } from '../utils/token';
import { CategoryProvider } from '../context/category.context';

const GlobalProvider = ({ children }) => {
  const onChangeGlobal = (values) => {
    console.log(values);
    setOption({
      ...option,
      ...values,
    });
  };
  const initialState = {
    onChangeGlobal,
    isLogin: !!(getAccessToken() && getAccessToken() !== ''),
    profile: {},
  };
  const [option, setOption] = useState(initialState);

  return (
    <GlobalContext.Provider value={option}>
      <ProfileProvider>
        <MallProvider>
          <CategoryProvider>
            <BoardProvider>
              <HeaderProvider>{children}</HeaderProvider>
            </BoardProvider>
          </CategoryProvider>
        </MallProvider>
      </ProfileProvider>
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
