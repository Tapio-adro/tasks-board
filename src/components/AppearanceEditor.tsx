import React, { ReactNode, useEffect } from 'react';
import Modal from './Modal';
import styled, { css } from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';
import { useBoardData } from '../contexts/BoardDataContext';


interface ColorButtonProps {
  readonly $color: string;
  readonly $isActive: boolean;
}
interface ResetButtonProps {
  readonly $isActive: boolean;
}

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
  /* min-height: 200px; */
  padding: 12px;
`;
const SectionTitle = styled.div`
  color: ${(props) => props.theme.colors.buttonGrayText};
  text-align: center;
  font-size: 16px;
  padding: 4px 0px 12px;
`;
const ColorButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;
const ColorButton = styled.button<ColorButtonProps>`
  background-color: ${props => props.$color};
  height: 35px;
  border-radius: 4px;
  &:hover {
    filter: saturate(85%) brightness(85%);
  }
  ${props => props.$isActive && css`
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #388bff;
  `};
`;
const ResetButton = styled.button<ResetButtonProps>`
  border-radius: 4px;
  background-color: #091E420F;
  color: ${(props) => props.theme.colors.titleText};
  width: 100%;
  padding: 8px;
  margin-top: 16px;
  text-align: center;
  font-weight: bold;
  &:hover {
    background-color: #091e4224;
  }
  ${props => !props.$isActive && css`
    opacity: 0.5;
    pointer-events: none; 
  `};
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
    });
  }
  function changeCardBackgroundColor(color: string) {
    boardColumnsDispatch({
      type: 'changeCardBackgroundColor',
      boardColumn: column,
      card,
      newColor: color
    });
  }

  const colorButtons = boardData?.backgroundColors.map((color) => {
    return (
      <ColorButton
        key={color}
        $color={color}
        $isActive={card.backgroundColor == color}
        onClick={() => changeCardBackgroundColor(color)}
      />
    );
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
              <ColorButtonsContainer>
                {colorButtons}
              </ColorButtonsContainer>
              <ResetButton 
                $isActive={card.backgroundColor != ''}
                onClick={() => changeCardBackgroundColor('')}
              >Reset color</ResetButton>
            </EditorSection>
          </EditorHalf>
          <EditorHalf></EditorHalf>
        </EditorContent>
      </StyledEditor>
    </Modal>
  );
};

export default AppearanceEditor;