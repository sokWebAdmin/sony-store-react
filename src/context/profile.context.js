import { createContext, useContext, useReducer } from "react";
import { getProfile } from "../api/member";


const initialState = {};

function profileReducer(state, action) {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        ...action.data,
      }
    default:
      throw new Error('INVALID_PROFILE_ACTION_TYPE')
  }
}

  
const ProfileStateContext = createContext(null);
const ProfileDispatchContext = createContext(null);

export function ProfileProvider({ children }) {
  const [ state, dispatch ] = useReducer(profileReducer, initialState)
  return (
    <ProfileDispatchContext.Provider value={dispatch}>
      <ProfileStateContext.Provider value={state}>
        {children}
      </ProfileStateContext.Provider>
    </ProfileDispatchContext.Provider>
  )
}

export function useProileDispatch() {
  const context = useContext(ProfileDispatchContext);
  if (!context) throw new Error('INVALID_ProfileDispatchContext');
  return context
}

export function useProfileState() {
  const context = useContext(ProfileStateContext);
  if (!context) throw new Error('INVALID_ProfileStateContext');
  return context
}

export async function fetchProfile(dispatch) {
  try {
    const response = await getProfile();
    dispatch({ type: 'GET_PROFILE', data: response.data });
  } catch(e) {
    console.error(e);
  }
}