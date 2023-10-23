import React, { ReactNode, useEffect } from 'react';
import Modal from './Modal';
import styled, { css } from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';
import { useBoardData } from '../contexts/BoardDataContext';
import { useHotkeys } from 'react-hotkeys-hook';


const StyledEditor = styled.div`
  padding: 12px;
  width: 768px;
  cursor: auto;
`;
const EditorTitle = styled.div`
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

export interface EditorProps {
  children: ReactNode;
  column: BoardColumn;
  card: Card;
  isOpen: boolean;
  onClose: Function;
}

const Editor: React.FC<EditorProps> = ({ column, card, children, ...props }) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const boardData = useBoardData();
  
  useHotkeys('esc', () => props.onClose());

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
      <StyledEditor>
        <EditorTitle>
          <RenamableField
            fieldValue={card.title}
            onFieldValueChange={renameCard}
            />
          <XMark onClick={() => props.onClose()}/>
        </EditorTitle>
        {children}
      </StyledEditor>
    </Modal>
  );
};

export default Editor;