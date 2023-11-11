import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { Board, BoardColumn, BoardColumnsAction, Card, ChecklistElement, TextElement } from '../assets/shared/types';
import { getInitialBoardColumn, getInitialBoards, getInitialCard, getInitialChecklistElement, getInitialChecklistItem, getInitialTextElement } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';
import { useBoards, useBoardsDispatch } from './BoardsContext';

interface Props {
  children?: ReactNode
}

const BoardColumnsContext = createContext<BoardColumn[] | null>(null);
const BoardColumnsDispatchContext = createContext<Dispatch<BoardColumnsAction>>(() => {});
const initialBoardColumns = getBoardColumns();


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
    case "setBoardColumns": {
      return action.boardColumns;
    }
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
    case 'addCardTextElement': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const textElement = getInitialTextElement();
      textElement.title = action.title;
      card.elements.push(textElement);
      break;
    }
    case 'addCardChecklistElement': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const checklistElement = getInitialChecklistElement();
      checklistElement.title = action.title;
      card.elements.push(checklistElement);
      break;
    }
    case 'addChecklistItem': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const checklistElementIndex = getCardElementIndexById(card, action.checklistElement.id);
      const checklistElement = card.elements[checklistElementIndex];
      const checklistItem = getInitialChecklistItem();
      checklistItem.text = action.text;
      if (!isChecklistElement(checklistElement)) {
        return;
      }
      checklistElement.items.push(checklistItem);
      break;
    }
    case 'setChecklistItemText': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const checklistElementIndex = getCardElementIndexById(card, action.checklistElement.id);
      const checklistElement = card.elements[checklistElementIndex];
      if (!isChecklistElement(checklistElement)) {
        return;
      }
      const checklistItemIndex = getChecklistItemIndexById(checklistElement, action.checklistItem.id);
      const checklistItem = checklistElement.items[checklistItemIndex];
      checklistItem.text = action.newText;
      break;
    }
    case 'toggleChecklistItem': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const checklistElementIndex = getCardElementIndexById(card, action.checklistElement.id);
      const checklistElement = card.elements[checklistElementIndex];
      if (!isChecklistElement(checklistElement)) {
        return;
      }
      const checklistItemIndex = getChecklistItemIndexById(checklistElement, action.checklistItem.id);
      const checklistItem = checklistElement.items[checklistItemIndex];
      checklistItem.isChecked = !checklistItem.isChecked;
      break;
    }
    case 'moveChecklistItem': {
      const [columnIndex, cardIndex] = getColumnAndCardIndexesByElementId(draft, action.source.droppableId);
      const card = draft[columnIndex].cards[cardIndex];
      const sourceChecklistElementIndex = getCardElementIndexById(card, action.source.droppableId);
      const destinationChecklistElementIndex = getCardElementIndexById(card, action.destination.droppableId);
      const sourceChecklistElement = card.elements[sourceChecklistElementIndex];
      const destinationChecklistElement = card.elements[destinationChecklistElementIndex];
      if (!isChecklistElement(sourceChecklistElement) || !isChecklistElement(destinationChecklistElement)) {
        return;
      }
      const [removed] = sourceChecklistElement.items.splice(action.source.index, 1);
      destinationChecklistElement.items.splice(action.destination.index, 0, removed);
      break;
    }
    case 'deleteChecklistItem': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const checklistElementIndex = getCardElementIndexById(card, action.checklistElement.id);
      const checklistElement = card.elements[checklistElementIndex];
      if (!isChecklistElement(checklistElement)) {
        return;
      }
      const checklistItemIndex = getChecklistItemIndexById(checklistElement, action.checklistItem.id);
      checklistElement.items.splice(checklistItemIndex, 1);
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
    case 'setTextElementEditorActiveness': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const textElementIndex = getCardElementIndexById(card, action.textElement.id);
      const textElement = card.elements[textElementIndex];
      if (!isTextElement(textElement)) {
        return;
      }
      textElement.isEditorActive = action.isEditorActive;
      break;
    }
    case 'setTextElementText': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const textElementIndex = getCardElementIndexById(action.card, action.textElement.id);
      const textElement = draft[columnIndex].cards[cardIndex].elements[textElementIndex];
      if (!isTextElement(textElement)) {
        return;
      }
      textElement.text = action.newText;
      break;
    }
    case 'renameCardElement': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const elementIndex = getCardElementIndexById(action.card, action.element.id);
      const element = draft[columnIndex].cards[cardIndex].elements[elementIndex];
      element.title = action.newTitle;
      break;
    }
    case 'disableCardElementJustCreated': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const elementIndex = getCardElementIndexById(action.card, action.element.id);
      const element = draft[columnIndex].cards[cardIndex].elements[elementIndex];
      element.isJustCreated = false;
      break;
    }
    case 'deleteCardElement': {
      const columnIndex = getColumnIndexById(draft, action.boardColumn.id);
      const cardIndex = getCardIndexById(action.boardColumn, action.card.id);
      const card = draft[columnIndex].cards[cardIndex];
      const elementIndex = getCardElementIndexById(action.card, action.element.id);
      card.elements.splice(elementIndex, 1);
      break;
    }
  }
  // boardsDispatch({
  //   type: 'updateBoardColumns',
  //   newBoardColumns: draft
  // });
}

function getColumnIndexById(draft: BoardColumn[], id: string): number {
  return draft.findIndex((column) => column.id === id);
}
function getCardIndexById(column: BoardColumn, id: string): number {
  return column.cards.findIndex((card) => card.id === id);
}
function getCardElementIndexById(card: Card, id: string): number {
  return card.elements.findIndex((element) => element.id === id);
}
function getChecklistItemIndexById(checklistElement: ChecklistElement, id: string): number {
  return checklistElement.items.findIndex((item) => item.id === id);
}
function isTextElement(element: any): element is TextElement {
  return element.type === 'text';
}
function isChecklistElement(element: any): element is ChecklistElement {
  return element.type === 'checklist';
}
function getColumnAndCardIndexesByElementId(draft: BoardColumn[], id: string): [number, number] {
  for (let columnIndex = 0; columnIndex < draft.length; columnIndex++) {
    const column = draft[columnIndex];
    for (let cardIndex = 0; cardIndex < column.cards.length; cardIndex++) {
      const card = column.cards[cardIndex];
      const elementIndex = getCardElementIndexById(card, id);
      if (elementIndex !== -1) {
        return [columnIndex, cardIndex];
      }
    }
  }
  return [-1, -1];
}
function getColumnById(draft: BoardColumn[], id: string): BoardColumn {
  return draft[getColumnIndexById(draft, id)]
}

function getBoardColumns(): BoardColumn[] {
  const boards = localStorage.getItem('boards');
  if (!boards) {
    console.log('boards created');
    const initialBoards = getInitialBoards();
    localStorage.setItem('boards', JSON.stringify(initialBoards));
    localStorage.setItem('currentBoardId', initialBoards[0].data.id);
    return initialBoards[0].columns;
  } else {
    const currentBoardId = localStorage.getItem('currentBoardId');
    const currentBoard = JSON.parse(boards).find((board: Board) => board.data.id === currentBoardId);
    return currentBoard.columns;
  }
}