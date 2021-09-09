import { createContext, useContext, useReducer } from 'react';

const initialState = {
  isSiderbarOpen: false,
};

function headerReducer(state, action) {
  switch (action.type) {
    case 'OPEN_SIDE_BAR':
      return {
        isSiderbarOpen: true,
      };

    case 'CLOSE_SIDE_BAR':
      return {
        isSiderbarOpen: false,
      };

    default:
      throw new Error('INVALID_HEADER_ACTION_TYPE');
  }
}

const HeaderStateContext = createContext(null);
const HeaderDispatchContext = createContext(null);

export function HeaderProvider({ children }) {
  const [state, dispatch] = useReducer(headerReducer, initialState);
  return (
    <HeaderDispatchContext.Provider value={dispatch}>
      <HeaderStateContext.Provider value={state}>
        {children}
      </HeaderStateContext.Provider>
    </HeaderDispatchContext.Provider>
  );
}

export function useHeaderDispatch() {
  const context = useContext(HeaderDispatchContext);
  if (!context) throw new Error('INVALID_HeaderDispatchContext');
  return context;
}

export function useHeaderState() {
  const context = useContext(HeaderStateContext);
  if (!context) throw new Error('INVALID_HeaderStateContext');
  return context;
}

export function openSideBar(dispatch) {
  dispatch({ type: 'OPEN_SIDE_BAR' });
}

export function closeSideBar(dispatch) {
  dispatch({ type: 'CLOSE_SIDE_BAR' });
}
