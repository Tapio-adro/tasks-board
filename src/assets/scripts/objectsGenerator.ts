import { Board, BoardColumn, BoardData, Card, ChecklistElement, ChecklistItem, Label, TextElement } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';
import exampleBoard from './exampleBoard';

export function getInitialBoardColumn(): BoardColumn {
  return {
    title: 'Column',
    id: uuidv4(),
    cards: []
  }
}
export function getInitialCard(): Card {
  const textElement = getInitialTextElement();
  textElement.isJustCreated = false;
  return {
    title: 'Card',
    id: uuidv4(),
    backgroundColor: '',
    labelIds: [],
    elements: [textElement],
  }
}
export function getInitialLabel(): Label {
  return {
    title: '',
    color: '',
    id: uuidv4(),
  }
}
export function getInitialTextElement(): TextElement {
  return {
    title: 'Description',
    id: uuidv4(),
    type: 'text',
    isEditorActive: false,
    text: '',
    isJustCreated: true,
  }
}
export function getInitialChecklistElement(): ChecklistElement {
  return {
    title: 'Checklist',
    id: uuidv4(),
    type: 'checklist',
    isJustCreated: true,
    items: [],
  }
}
export function getInitialChecklistItem(): ChecklistItem {
  return {
    id: uuidv4(),
    text: 'Checklist item',
    isChecked: false,
  }
}
export function getInitialBoardData(): BoardData {
  return {
    title: 'Board',
    backgroundColors: [
      '#4BCE97', '#F5CD47', '#faa53d', '#f87462', '#9f8fef', 
      '#579dff', '#60c6d2', '#94C748', '#e774bb', '#8590a2'
    ],
    labels: [{title: 'Label', id: uuidv4(), color: '#f87462'}],
    areCardLabelsExpanded: false,
    id: uuidv4(),
  }
}
export function getInitialBoards(): Board[] {
  return [
    exampleBoard
  ];
}