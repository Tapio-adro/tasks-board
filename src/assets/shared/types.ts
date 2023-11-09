import { ContentState } from 'react-draft-wysiwyg';

export type Board = {
  title: string;
  columns: BoardColumn[];
  id: string;
}
export type BoardColumn = {
  title: string;
  id: string;
  cards: Card[];
}
export type Card = {
  title: string;
  id: string;
  backgroundColor: string;
  labels: Label[];
  elements: CardElement[];
}

export type CardElement = TextElement | ChecklistElement

type CommonElementProps = {
  title: string;
  id: string;
  isJustCreated: boolean;
}

export type TextElement = CommonElementProps & {
  type: 'text';
  text: string;
  isEditorActive: boolean;
}

export type ChecklistElement = CommonElementProps & {
  type: 'checklist';
  items: ChecklistItem[];
}
export type ChecklistItem = {
  id: string;
  text: string;
  isChecked: boolean;
}

export type BoardColumnsAction =
  | { type: 'addColumn'; title: string }
  | { type: 'renameColumn'; boardColumn: BoardColumn; newTitle: string }
  | { type: 'moveColumn'; startIndex: number; endIndex: number }
  | { type: 'deleteColumn'; boardColumn: BoardColumn }
  | { type: 'addCard'; boardColumn: BoardColumn; title: string }
  | { type: 'renameCard'; boardColumn: BoardColumn; card: Card; newTitle: string }
  | { type: 'changeCardBackgroundColor'; boardColumn: BoardColumn; card: Card; newColor: string }
  | { type: 'moveCard'; source: any; destination: any }
  | { type: 'addCardTextElement'; boardColumn: BoardColumn; card: Card; title: string }
  | { type: 'addCardChecklistElement'; boardColumn: BoardColumn; card: Card; title: string }
  | { type: 'addChecklistItem'; boardColumn: BoardColumn; card: Card; checklistElement: ChecklistElement; text: string }
  | { type: 'setChecklistItemText'; boardColumn: BoardColumn; card: Card; checklistElement: ChecklistElement; checklistItem: ChecklistItem; newText: string }
  | { type: 'toggleChecklistItem'; boardColumn: BoardColumn; card: Card; checklistElement: ChecklistElement; checklistItem: ChecklistItem }
  | { type: 'moveChecklistItem'; source: any; destination: any }
  | { type: 'deleteChecklistItem'; boardColumn: BoardColumn; card: Card; checklistElement: ChecklistElement; checklistItem: ChecklistItem }
  | { type: 'deleteCard'; boardColumn: BoardColumn; card: Card }
  | { type: 'toggleCardLabel'; boardColumn: BoardColumn; card: Card; label: Label }
  | { type: 'removeLabelFromAllCards'; label: Label }
  | { type: 'setTextElementEditorActiveness'; boardColumn: BoardColumn; card: Card; textElement: TextElement; isEditorActive: boolean }
  | { type: 'setTextElementText'; boardColumn: BoardColumn; card: Card; textElement: TextElement; newText: string }
  | { type: 'renameCardElement'; boardColumn: BoardColumn; card: Card; element: CardElement; newTitle: string }
  | { type: 'disableCardElementJustCreated'; boardColumn: BoardColumn; card: Card; element: CardElement }
  | { type: 'deleteCardElement'; boardColumn: BoardColumn; card: Card; element: CardElement }
  

export type BoardData = {
  backgroundColors: string[];
  labels: Label[];
  areCardLabelsExpanded: boolean;
}
export type Label = {
  title: string;
  color: string;
  id: string;
}


export type BoardDataAction = 
  | { type: 'createLabel'; title: string; color: string }
  | { type: 'renameLabel'; label: Label; newTitle: string }
  | { type: 'changeLabelColor'; label: Label; newColor: string }
  | { type: 'deleteLabel'; label: Label }
  | { type: 'toggleCardLabelsExpand' }
  // | { type: '' }


export type ElementType = 'boardColumn' | 'card' | 'text' | 'checklist'