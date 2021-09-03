import { createContext, useContext, useReducer } from "react";
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
      return {
        ...state,
        config: mapConfiguration(action.data, state.config),
      }
    case 'GET_BOARD_LIST':
      // @fixme: 더보기 기능 완료 후 재확인 필요
      return {
        ...state,
        [`${action.name}Board`]: {
          totalCount: action.data.totalCount,
          items: action.data.items,
        }
      }
    case 'SELECT_CATEGORY':
      return {
        ...state,
        faqBoard: { ...defaultData.board },
        isAll: !action.data.categoryNo,
        currentCategoryNo: action.data.categoryNo,
      }
    case 'SELECT_TAB':
      return {
        ...state,
        currentTab: action.data.currentTab,
      }
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

export async function fetchBoards(dispatch, data, name='faq') {
  try {
    const response = await getBoards(data);
    dispatch({ type: 'GET_BOARD_LIST', data: response.data, name })
  } catch (e) {
    console.error(e);
  }
} 