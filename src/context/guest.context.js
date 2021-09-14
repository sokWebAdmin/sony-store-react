import { createContext, useContext, useReducer } from 'react';

/**
 * spec
 *
 * 1. guest.orderAgree context 체크
 * 2. guest.orderAgree context 셋
 */
const initialState = {
  orderAgree: false,
};

function GuestReducer (state, action) {
  switch (action.type) {
    case 'SET_ORDER_AGREE':
      return {
        ...state,
        ...action.data, // type, data
      };
    default:
      throw new Error('INVALID_Guest_ACTION_TYPE');
  }
}

const GuestStateContext = createContext(null);
const GuestDispatchContext = createContext(null);

export function GuestProvider ({ children }) {
  const [state, dispatch] = useReducer(GuestReducer, initialState);
  return (
    <GuestStateContext.Provider value={dispatch}>
      <GuestDispatchContext.Provider value={state}>
        {children}
      </GuestDispatchContext.Provider>
    </GuestStateContext.Provider>
  );
}

export function setOrderAgree (dispatch) {
  console.log(dispatch);
}

export function useGuestDispatch () {
  const context = useContext(GuestDispatchContext);
  console.log(context);
  if (!context) {
    throw new Error('INVALID_GuestDispatchContext');
  }
  return context;
}

export function useGuestState () {
  const context = useContext(GuestStateContext);
  if (!context) {
    throw new Error('INVALID_GuestStateContext');
  }
  return context
}