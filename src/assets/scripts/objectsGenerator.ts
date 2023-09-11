import { BoardColumn, Card } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';

export function getInitialBoardColumn(): BoardColumn {
  return {
    title: 'Column',
    id: uuidv4(),
    cards: []
  }
}
export function getInitialCard(): Card {
  return {
    title: 'Card',
    id: uuidv4()
  }
}