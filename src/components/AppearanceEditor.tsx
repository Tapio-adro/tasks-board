import React, { ReactNode } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';

const StyledEditor = styled.div`
  padding: 12px;
  width: 768px;
`;
const EditorTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.titleText};
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

export interface AppearanceEditorProps {
  column: BoardColumn;
  card: Card;
  isOpen: boolean;
  onClose: Function;
}

const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ column, card, ...props }) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();

  function renameCard(newTitle: string) {
    boardColumnsDispatch({
      type: "renameCard",
      boardColumn: column,
      card,
      newTitle
    })
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
      </StyledEditor>
    </Modal>
  );
};

export default AppearanceEditor;