import { createContext, useContext, useReducer } from "react";
import produce from "immer";
import { getBoardConfiguration, getBoards } from "../api/manage";

const defaultData = {
  config: {
    boardNo: 0,
    categories: [
      {
        categoryNo: 0,
        label: '전체',
      }
    ]
  },
  board: {
    totalCount: 0,
    items: [],
  }
};

const initialState = {
  config: {
    faq: { ...defaultData.config },
    notice: { ...defaultData.config },
  },
  faqBoard: { ...defaultData.board },
  noticeBoard: { ...defaultData.board },
  isAll: false,
  currentCategoryNo: 0,
  currentTab: 'faq'
};

function mapConfiguration(data, originData) {
  return data.boardConfigs.reduce((state, {
    boardNo,
    categories,
    categoryUsed,
    name,
    order,
    used,
  }) => {
    const label = name === 'FAQ' ? 'faq' : 'notice';
    return {
      ...state,
      [label]: {
        boardNo,
        categories: originData[label].categories.concat(categories),
        categoryUsed,
        name,
        order,
        used,
      }
    }
  }, {});
}

function boardReducer(state, action) {
  switch (action.type) {
    case 'SET_CONFIGURATION':
      return produce(state, draft => {
        draft.config = mapConfiguration(action.data, state.config)
      });
    case 'GET_BOARD_LIST':
      return produce(state, draft => {
        draft[`${action.name}Board`] = {
          totalCount: action.data.totalCount,
          items: action.reset 
            ? action.data.items 
            : draft[`${action.name}Board`].items.concat(action.data.items),
        }
      })
    case 'SELECT_CATEGORY':
      return produce(state, draft => {
        draft.faqBoard = { ...defaultData.board };
        draft.isAll = !action.data.categoryNo;
        draft.currentCategoryNo = action.data.categoryNo;
      })
    case 'SELECT_TAB':
      return produce(state, draft => {
        draft.currentTab = action.data.currentTab;
        draft.faqBoard = { ...defaultData.board };
        draft.noticeBoard = { ...defaultData.board };
      });
    default:
      throw new Error('INVALID_BOARD_ACTION_TYPE');
  }
}

const BoardStateContext = createContext(null);
const BoardDispatchContext = createContext(null);

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  return (
    <BoardDispatchContext.Provider value={dispatch}>
      <BoardStateContext.Provider value={state}>
        {children}
      </BoardStateContext.Provider>
    </BoardDispatchContext.Provider>
  )
}

export function useBoardDispatch() {
  const context = useContext(BoardDispatchContext);
  if (!context) throw new Error('INVALID_BoardDispatchContext');
  return context
}

export function useBoardState() {
  const context = useContext(BoardStateContext);
  if (!context) throw new Error('INVALID_BoardStateContext');
  return context
}

// api

export async function fetchBoardConfig(dispatch, boardNo) {
  if (boardNo > 0) return;
  try {
    const response = await getBoardConfiguration();
    dispatch({ type: 'SET_CONFIGURATION', data: response.data });
  } catch (e) {
    console.error(e);
  }
}

export async function fetchBoards(dispatch, data, name='faq', reset = false) {
  try {
    const response = await getBoards(data);
    dispatch({ type: 'GET_BOARD_LIST', data: response.data, name, reset })
  } catch (e) {
    console.error(e);
  }
} 