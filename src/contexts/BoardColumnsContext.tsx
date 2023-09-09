import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { BoardColumn, BoardColumnAction } from '../assets/shared/types';
import { getInitialBoardColumn } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';

interface Props {
  children?: ReactNode
}

const BoardColumnsContext = createContext<BoardColumn[] | null>(null);
const BoardColumnsDispatchContext = createContext<Dispatch<BoardColumnAction>>(() => {});
const intialBoardColumns = [getInitialBoardColumn()]


export function BoardColumnsProvider({ children }: Props) {
  const [boardColumns, dispatch] = useImmerReducer(
    boardColumnsReducer,
    intialBoardColumns
  );

  return (
    <BoardColumnsContext.Provider value={boardColumns}>
      <BoardColumnsDispatchContext.Provider value={dispatch}>
        {children}
      </BoardColumnsDispatchContext.Provider>
    </BoardColumnsContext.Provider>
  );
}

export function useBoardColumns(): BoardColumn[] | null {
  return useContext(BoardColumnsContext);
}

export function useBoardColumnsDispatch(): ((action: BoardColumnAction) => void) {
  return useContext(BoardColumnsDispatchContext);
}

function boardColumnsReducer(draft: BoardColumn[], action: BoardColumnAction) {
  switch (action.type) {
    case 'added': {
      draft.push(getInitialBoardColumn());
      break;
    }
    case 'renamed': {
      const index = draft.findIndex((column) => column.id === action.boardColumn.id);
      draft[index] = action.boardColumn;
      break;
    }
    case 'deleted': {
      return draft.filter(boardColumn => boardColumn.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + (action as any).type);
    }
  }
}