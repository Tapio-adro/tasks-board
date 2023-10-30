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
  // parts: 
}

export type BoardColumnsAction =
  | { type: 'addColumn'; title: string }
  | { type: 'renameColumn'; boardColumn: BoardColumn; newTitle: string }
  | { type: 'reorderColumns'; startIndex: number; endIndex: number }
  | { type: 'deleteColumn'; boardColumn: BoardColumn }
  | { type: 'addCard'; boardColumn: BoardColumn; title: string }
  | { type: 'renameCard'; boardColumn: BoardColumn; card: Card; newTitle: string }
  | { type: 'changeCardBackgroundColor'; boardColumn: BoardColumn; card: Card; newColor: string }
  | { type: 'deleteCard'; boardColumn: BoardColumn; card: Card }
  | { type: 'toggleCardLabel'; boardColumn: BoardColumn; card: Card; label: Label }
  | { type: 'removeLabelFromAllCards'; label: Label }

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


export type BoardElementType = 'boardColumn' | 'card'