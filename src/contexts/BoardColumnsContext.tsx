import { ReactNode, createContext, useContext, useReducer } from 'react';
import { BoardColumn, BoardColumnAction } from '../assets/shared/types';
import { getInitialBoardColumn } from '../assets/scripts/objectsGenerator';

interface Props {
  children?: ReactNode
}

const BoardColumnsContext = createContext<BoardColumn[] | null>(null);

const BoardColumnsDispatchContext = createContext<((action: BoardColumnAction) => void) | null>(null);

const intialBoardColumns = [getInitialBoardColumn()]
console.log(intialBoardColumns);

export function BoardColumnsProvider({ children }: Props) {
  const [boardColumns, dispatch] = useReducer(
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

export function useBoardColumnsDispatch(): ((action: BoardColumnAction) => void) | null {
  return useContext(BoardColumnsDispatchContext);
}

function boardColumnsReducer(boardColumns: BoardColumn[], action: BoardColumnAction) {
  switch (action.type) {
    case 'added': {
      return [...boardColumns, 
        getInitialBoardColumn()
      ];
    }
    case 'renamed': {
      return boardColumns.map(boardColumn => {
        if (boardColumn.id === action.boardColumn.id) {
          return action.boardColumn;
        } else {
          return boardColumn;
        }
      });
    }
    case 'deleted': {
      return boardColumns.filter(boardColumn => boardColumn.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + (action as any).type);
    }
  }
}