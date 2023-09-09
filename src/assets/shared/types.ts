export type Board = {
  title: string;
  columns: BoardColumn[];
  id: string;
}
export type BoardColumn = {
  title: string;
  id: string;
}

export type BoardAction = 
  | { type: 'addColumn', title: string }
  | { type: 'renameColumn'; boardColumn: BoardColumn }
  | { type: 'deleteColumn'; id: string };