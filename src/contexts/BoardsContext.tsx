import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { Board, BoardsAction } from '../assets/shared/types';
import { getInitialBoardData, getInitialBoards } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';
import { useBoardColumnsDispatch } from './BoardColumnsContext';
import { useBoardDataDispatch } from './BoardDataContext';


interface Props {
  children?: ReactNode
}

const BoardsContext = createContext<Board[] | null>(null);
const BoardsDispatchContext = createContext<Dispatch<BoardsAction>>(() => {});
const initialBoards = getBoards();


export function BoardsProvider({ children }: Props) {
  const [boards, dispatch] = useImmerReducer(
    boardsReducer,
    initialBoards
  );

  return (
    <BoardsContext.Provider value={boards}>
      <BoardsDispatchContext.Provider value={dispatch}>
        {children}
      </BoardsDispatchContext.Provider>
    </BoardsContext.Provider>
  );
}

export function useBoards(): Board[] | null {
  return useContext(BoardsContext);
}

export function useBoardsDispatch(): ((action: BoardsAction) => void) {
  return useContext(BoardsDispatchContext);
}

function boardsReducer(draft: Board[], action: BoardsAction) {
  switch (action.type) {
    case 'createBoard': {
      draft.push(action.board);
      break;
    }
    case 'updateBoardData': {
      const boardId = localStorage.getItem('currentBoardId');
      const boardIndex = draft.findIndex(board => board.data.id === boardId);
      draft[boardIndex].data = action.newBoardData;
      break;
    }
    case 'updateBoardColumns': {
      const boardId = localStorage.getItem('currentBoardId');
      const boardIndex = draft.findIndex(board => board.data.id === boardId);
      draft[boardIndex].columns = action.newBoardColumns;
      break;
    }
    case 'deleteBoard': {
      const boardIndex = draft.findIndex(board => board.data.id === action.board.data.id);
      draft.splice(boardIndex, 1);
      break;
    }
  }
  localStorage.setItem('boards', JSON.stringify(draft));
}


function getBoards(): Board[] {
  const boards = localStorage.getItem('boards');
  
  if (!boards) {
    return getInitialBoards();
  };

  return JSON.parse(boards);
}
