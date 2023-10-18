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
  // parts: 
}

export type BoardColumnsAction =
  | { type: 'addColumn'; title: string }
  | { type: 'renameColumn'; boardColumn: BoardColumn; newTitle: string }
  | { type: 'deleteColumn'; id: string }
  | { type: 'addCard'; boardColumn: BoardColumn; title: string }
  | { type: 'renameCard'; boardColumn: BoardColumn; card: Card; newTitle: string }


export type BoardData = {
  backgroundColors: string[];
  labels: Label[];
}
export type CustomBackgroundColor = {
  value: string;
  id: string;
}
export type Label = {
  title: string;
  color: string;
  id: string;
}

export type BoardDataAction = {}
  // | { type: 'addColumn'; title: string }
  // | { type: 'renameColumn'; boardColumn: BoardColumn; newTitle: string }
  // | { type: 'deleteColumn'; id: string }
  // | { type: 'addCard'; boardColumn: BoardColumn; title: string }
  // | { type: 'renameCard'; boardColumn: BoardColumn; card: Card; newTitle: string }


export type BoardElementType = 'boardColumn' | 'card'