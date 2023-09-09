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
  | { type: 'added', title: string }
  | { type: 'renamed'; boardColumn: BoardColumn }
  | { type: 'deleted'; id: string };