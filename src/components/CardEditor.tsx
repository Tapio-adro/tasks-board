import React, { ReactNode, useEffect } from 'react';
import Modal from './Modal';
import styled, { css } from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';
import { useBoardData } from '../contexts/BoardDataContext';
import { useHotkeys } from 'react-hotkeys-hook';


interface ColoredBarProps {
  readonly $backgroundColor: string;
}

const CardEditorWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;
const StyledCardEditor = styled.div`
  background-color: #F1F2F4;
  padding: 12px;
  width: 768px;
  cursor: auto;
`;
const CardEditorTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.titleText};
  input, .title {
    font-weight: 600;
    font-size: 20px;
    padding: 4px;
    flex: 1;
  }
  >div:not(.title) {
    flex: 1;
  }
`;
const ColoredBar = styled.div<ColoredBarProps>`
  background-color: ${props => props.$backgroundColor};
  height: 0;
  ${props => props.$backgroundColor != '' && css`
    height: 50px;
  `}; 
`;
const ColumnInfo = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  margin-left: 6px;
  margin-bottom: 16px;
  span {
    text-decoration: underline;
  }
`;

export interface CardEditorProps {
  children: ReactNode;
  column: BoardColumn;
  card: Card;
  isOpen: boolean;
  onClose: Function;
}

const CardEditor: React.FC<CardEditorProps> = ({ column, card, children, ...props }) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const boardData = useBoardData();
  
  function renameCard(newTitle: string) {
    boardColumnsDispatch({
      type: "renameCard",
      boardColumn: column,
      card,
      newTitle
    });
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <CardEditorWrapper>
        <ColoredBar $backgroundColor={card.backgroundColor} />
        <StyledCardEditor>
          <CardEditorTitle>
            <RenamableField
              fieldValue={card.title}
              onFieldValueChange={renameCard}
              />
            <XMark onClick={() => props.onClose()}/>
          </CardEditorTitle>
          <ColumnInfo>in column <span>{column.title}</span></ColumnInfo>
          {children}
        </StyledCardEditor>
        <ColoredBar $backgroundColor={card.backgroundColor} />
      </CardEditorWrapper>
    </Modal>
  );
};

export default CardEditor;