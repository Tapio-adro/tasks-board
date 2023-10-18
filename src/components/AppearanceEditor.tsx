import React, { ReactNode } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';
import { useBoardData } from '../contexts/BoardDataContext';


interface ColorButtonProps {
  readonly $color: string;
}

const StyledEditor = styled.div`
  padding: 12px;
  width: 768px;
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
const EditorContent = styled.div`
  display: flex;
  column-gap: 12px;
`;
const EditorHalf = styled.div`
  flex: 1;
  min-height: 100px;
`;
const EditorSection = styled.section`
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 8px;
  min-height: 200px;
  padding: 8px;
`;
const SectionTitle = styled.div`
  color: ${(props) => props.theme.colors.buttonGrayText};
  text-align: center;
  padding: 4px;
`;
const ColorButton = styled.button<ColorButtonProps>`
  background-color: ${props => props.$color};
`;

export interface AppearanceEditorProps {
  column: BoardColumn;
  card: Card;
  isOpen: boolean;
  onClose: Function;
}

const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ column, card, ...props }) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const boardData = useBoardData();

  function renameCard(newTitle: string) {
    boardColumnsDispatch({
      type: "renameCard",
      boardColumn: column,
      card,
      newTitle
    })
  }

  const colorButtons = boardData?.backgroundColors.map((color) => {
    
  });

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
        <EditorContent>
          <EditorHalf>
            <EditorSection>
              <SectionTitle>Background color</SectionTitle>
            </EditorSection>
          </EditorHalf>
          <EditorHalf></EditorHalf>
        </EditorContent>
      </StyledEditor>
    </Modal>
  );
};

export default AppearanceEditor;