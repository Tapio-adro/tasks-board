export type Board = {
  title: string;
  columns: BoardColumn[];
  id: string;
}
export type BoardColumn = {
  title: string;
  id: string;
}

export type BoardColumnAction = 
  | { type: 'added' }
  | { type: 'renamed'; boardColumn: BoardColumn }
  | { type: 'deleted'; id: string };