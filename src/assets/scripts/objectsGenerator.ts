import { BoardColumn, BoardData, Card } from '../shared/types';
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

export function getInitialBoardData(): BoardData {
  return {
    backgroundColors: [
      '#4BCE97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', 
      '#579dff', '#60c6d2', '#6DECA9', '#e774bb', '#8590a2'
    ],
    labels: [],
  }
}