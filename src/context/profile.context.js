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

    if (response.status === 200) {
      dispatch({ type: 'GET_PROFILE', data: response.data });
      return;
    }

    if (response.data?.message?.includes('AccessToken')) {
      alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = "/"
    }
    
  } catch(e) {
    console.error(e);
  }
}

export async function fetchMyProfile(dispatch, query) {
  try {
    const response = await getMemberInfo(query);
    response.data.errorCode === '0000' &&
      dispatch({ type: 'GET_MY_PROFILE', data: response.data.body });
  } catch(e) {
    console.error(e);
  }
}

export function setProfile(dispatch, data) {
  dispatch({ type: 'GET_PROFILE', data })
}

export function resetProfile(dispatch) {
  dispatch({type: 'RESET_PROFILE'});
}