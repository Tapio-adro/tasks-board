import { BoardColumn } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';

// export function getInitialBoard (): Board {
//   return {
//     title: 'Board',
//     columns: [],
//     id: uuidv4(),
//   }
// }
export function getInitialBoardColumn (): BoardColumn {
  return {
    title: 'Column',
    id: uuidv4(),
  }
}