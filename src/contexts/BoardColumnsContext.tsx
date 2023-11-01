import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { BoardColumn, BoardColumnsAction } from '../assets/shared/types';
import { getInitialBoardColumn, getInitialCard } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';

interface Props {
  children?: ReactNode
}

const BoardColumnsContext = createContext<BoardColumn[] | null>(null);
const BoardColumnsDispatchContext = createContext<Dispatch<BoardColumnsAction>>(() => {});
const initialBoardColumn = getInitialBoardColumn();
initialBoardColumn.cards.push(getInitialCard());
const initialBoardColumns = [initialBoardColumn];


export function BoardColumnsProvider({ children }: Props) {
  const [boardColumns, dispatch] = useImmerReducer(
    boardColumnsReducer,
    initialBoardColumns
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

export function useBoardColumnsDispatch(): ((action: BoardColumnsAction) => void) {
  return useContext(BoardColumnsDispatchContext);
}

function boardColumnsReducer(draft: BoardColumn[], action: BoardColumnsAction) {
  switch (action.type) {
    case 'addColumn': {
      const boardColumn = getInitialBoardColumn()
      boardColumn.title = action.title
      draft.push(boardColumn);
      break;
    }
    case 'renameColumn': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      let newTitle = action.newTitle != '' ? action.newTitle : action.boardColumn.title;
      draft[columnIndex].title = newTitle;
      break;
    }
    case 'moveColumn': {
      const [removed] = draft.splice(action.startIndex, 1);
      draft.splice(action.endIndex, 0, removed);
      break;
    }
    case 'deleteColumn': {
      return draft.filter((column) => column.id !== action.boardColumn.id);
    }
    case 'addCard': {
      const column = action.boardColumn
      const card = getInitialCard()
      card.title = action.title
      const columnIndex = getColumnIndexById(draft, column.id)
      draft[columnIndex].cards.push(card);
      break;
    }
    case 'renameCard': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      let newTitle = action.newTitle != '' ? action.newTitle : action.card.title;
      draft[columnIndex].cards[cardIndex].title = newTitle;
      break;
    }
    case 'changeCardBackgroundColor': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      let newColor = action.newColor == action.card.backgroundColor ? '' : action.newColor;
      draft[columnIndex].cards[cardIndex].backgroundColor = newColor;
      break;
    }
    case 'moveCard': {
      const sourceColumnIndex = getColumnIndexById(draft, action.source.droppableId);
      const destinationColumnIndex = getColumnIndexById(draft, action.destination.droppableId);
      const [removed] = draft[sourceColumnIndex].cards.splice(action.source.index, 1);
      draft[destinationColumnIndex].cards.splice(action.destination.index, 0, removed);
      break;
    }
    case 'deleteCard': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      draft[columnIndex].cards.splice(cardIndex, 1);
      break;
    }
    case 'toggleCardLabel': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const labelIndex = card.labels.findIndex((label) => label.id === action.label.id);
      if (labelIndex === -1) {
        card.labels.push(action.label);
      } else {
        card.labels.splice(labelIndex, 1);
      }
      break;
    }
    case 'removeLabelFromAllCards': {
      draft.forEach((column) => {
        column.cards.forEach((card) => {
          const labelIndex = card.labels.findIndex((label) => label.id === action.label.id);
          if (labelIndex !== -1) {
            card.labels.splice(labelIndex, 1);
          }
        });
      });
      break;
    }
  }
}

function getColumnIndexById(draft: BoardColumn[], id: string): number {
  return draft.findIndex((column) => column.id === id);
}
function getCardIndexById(column: BoardColumn, id: string): number {
  return column.cards.findIndex((card) => card.id === id);
}
function getColumnById(draft: BoardColumn[], id: string): BoardColumn {
  return draft[getColumnIndexById(draft, id)]
}