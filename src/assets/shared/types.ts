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

export type BoardAction =
  | { type: 'addColumn'; title: string }
  | { type: 'renameColumn'; boardColumn: BoardColumn }
  | { type: 'deleteColumn'; id: string }
  | { type: 'addCard'; boardColumn: BoardColumn; title: string };

export type BoardElementType = 'boardColumn' | 'card'