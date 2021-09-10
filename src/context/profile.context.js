import React, { createContext, useContext, useReducer } from "react";
import { getProfile } from "../api/member";
import { getMemberInfo } from "../api/sony/member";

const initialState = {
  // customerId: '',
  profile: null,
  my: null,
};

function profileReducer(state, action) {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: { ...action.data }
      }
    case 'GET_MY_PROFILE':
      return {
        ...state,
        my: { ...action.data }
      }
    case 'RESET_PROFILE':
      return {
        profile: null,
        my: null,
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
    dispatch({ type: 'GET_PROFILE', data: response.data })
  } catch(e) {
    console.error(e);
  }
}

export async function fetchMyProfile(dispatch, query) {
  try {
    const response = await getMemberInfo(query);
    console.log(response.data);
    response.data.errorCode === '0000' &&
      dispatch({ type: 'GET_MY_PROFILE', data: response.data.body });
  } catch(e) {
    console.error(e);
  }
}

export function resetProfile(dispatch) {
  dispatch({type: 'RESET_PROFILE'});
}