import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { BoardData, BoardDataAction } from '../assets/shared/types';
import { getInitialBoardData } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';

interface Props {
  children?: ReactNode
}

const BoardDataContext = createContext<BoardData | null>(null);
const BoardDataDispatchContext = createContext<Dispatch<BoardDataAction>>(() => {});
const initialBoardData = getInitialBoardData();


export function BoardDataProvider({ children }: Props) {
  const [boardData, dispatch] = useImmerReducer(
    boardDataReducer,
    initialBoardData
  );

  return (
    <BoardDataContext.Provider value={boardData}>
      <BoardDataDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDataDispatchContext.Provider>
    </BoardDataContext.Provider>
  );
}

export function useBoardData(): BoardData | null {
  return useContext(BoardDataContext);
}

export function useBoardDataDispatch(): ((action: BoardDataAction) => void) {
  return useContext(BoardDataDispatchContext);
}

function boardDataReducer(draft: BoardData, action: BoardDataAction) {
  // switch (action.type) {
  //   case 'addColumn': {
  //     const boardColumn = getInitialBoardColumn()
  //     boardColumn.title = action.title
  //     draft.push(boardColumn);
  //     break;
  //   }
  //   case 'renameColumn': {
  //     const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
  //     let newTitle = action.newTitle != '' ? action.newTitle : action.boardColumn.title;
  //     draft[columnIndex].title = newTitle;
  //     break;
  //   }
  //   case 'deleteColumn': {
  //     return draft.filter(boardColumn => boardColumn.id !== action.id);
  //   }
  //   case 'addCard': {
  //     const column = action.boardColumn
  //     const card = getInitialCard()
  //     card.title = action.title
  //     const columnIndex = getColumnIndexById(draft, column.id)
  //     draft[columnIndex].cards.push(card);
  //     break;
  //   }
  //   case 'renameCard': {
  //     const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
  //     const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
  //     let newTitle = action.newTitle != '' ? action.newTitle : action.card.title;
  //     draft[columnIndex].cards[cardIndex].title = newTitle;
  //     break;
  //   }
  //   default: {
  //     throw Error('Unknown action: ' + (action as any).type);
  //   }
  // }
}

// function getColumnIndexById(draft: BoardColumn[], id: string): number {
//   return draft.findIndex((column) => column.id === id);
// }
// function getCardIndexById(column: BoardColumn, id: string): number {
//   return column.cards.findIndex((card) => card.id === id);
// }
// function getColumnById(draft: BoardColumn[], id: string): BoardColumn {
//   return draft[getColumnIndexById(draft, id)]
// }