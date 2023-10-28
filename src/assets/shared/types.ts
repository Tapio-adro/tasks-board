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
  | { type: 'deleteColumn'; id: string }
  | { type: 'addCard'; boardColumn: BoardColumn; title: string }
  | { type: 'renameCard'; boardColumn: BoardColumn; card: Card; newTitle: string }
  | { type: 'changeCardBackgroundColor'; boardColumn: BoardColumn; card: Card; newColor: string }


export type BoardData = {
  backgroundColors: string[];
  labels: Label[];
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
  | { type: 'deleteLabel'; id: string }


export type BoardElementType = 'boardColumn' | 'card'