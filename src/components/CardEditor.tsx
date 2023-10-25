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

const StyledCardEditor = styled.div`
  padding: 12px;
  width: 768px;
  cursor: auto;
`;
const CardEditorTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.titleText};
  margin-bottom: 12px;
  input, .title {
    font-weight: bold;
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
      <ColoredBar $backgroundColor={card.backgroundColor} />
      <StyledCardEditor>
        <CardEditorTitle>
          <RenamableField
            fieldValue={card.title}
            onFieldValueChange={renameCard}
            />
          <XMark onClick={() => props.onClose()}/>
        </CardEditorTitle>
        {children}
      </StyledCardEditor>
      <ColoredBar $backgroundColor={card.backgroundColor} />
    </Modal>
  );
};

export default CardEditor;