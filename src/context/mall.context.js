import { createContext, useContext, useReducer } from "react";
import { getMallInfo } from "../api/admin";

const initialState = {};

function mallReducer(state, action) {
  switch (action.type) {
    case 'GET_MALL_INFO':
      return {
        ...state,
        ...action.data,
      }
    default:
      throw new Error('INVALID_MALL_ACTION_TYPE')
  }
}

  
const MallStateContext = createContext(null);
const MallDispatchContext = createContext(null);

export function MallProvider({ children }) {
  const [ state, dispatch ] = useReducer(mallReducer, initialState)
  return (
    <MallDispatchContext.Provider value={dispatch}>
      <MallStateContext.Provider value={state}>
        {children}
      </MallStateContext.Provider>
    </MallDispatchContext.Provider>
  )
}

export function useMallDispatch() {
  const context = useContext(MallDispatchContext);
  if (!context) throw new Error('INVALID_MallDispatchContext');
  return context
}

export function useMallState() {
  const context = useContext(MallStateContext);
  if (!context) throw new Error('INVALID_MallStateContext');
  return context
}

export async function fetchMallInfo(dispatch) {
  try {
    const response = await getMallInfo();
    dispatch({ type: 'GET_MALL_INFO', data: response.data });
  } catch(e) {
    console.error(e);
  }
}