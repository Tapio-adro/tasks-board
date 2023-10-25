import React, { ReactNode, useEffect, useState } from 'react';
import Modal from './Modal';
import styled, { css } from 'styled-components';
import { BoardColumn, Card, Label } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { XMark } from '../assets/shared/sharedComponents';
import { useBoardData } from '../contexts/BoardDataContext';
import { useHotkeys } from 'react-hotkeys-hook';
import CardEditor from './CardEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import LabelEditor from './LabelEditor';
import { getInitialLabel } from '../assets/scripts/objectsGenerator';

interface ColorButtonProps {
  readonly $color: string;
  readonly $isActive: boolean;
}
interface GreyButtonProps {
  readonly $isActive: boolean;
}
interface LabelTitleProps {
  readonly $backgroundColor: string;
}

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
  padding: 4px 0px 4px;
  margin-bottom: 8px;
`;
const ColorButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
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
const GreyButton = styled.button<GreyButtonProps>`
  border-radius: 4px;
  background-color: #091E420F;
  color: ${(props) => props.theme.colors.titleText};
  width: 100%;
  padding: 8px;
  text-align: center;
  font-weight: 500;
  &:hover {
    background-color: #091e4224;
  }
  ${props => !props.$isActive && css`
    opacity: 0.5;
    pointer-events: none; 
  `};
`;
const LabelsContainer = styled.div`
  &:not(:empty) {
    margin-bottom: 16px;
  }
`;
const LabelWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: stretch;
`;
const LabelContent = styled.button`
  display: flex;
  align-items: stretch;
  flex: 1;
`;
const LabelCheckbox = styled.input`
  width: 16px;
  margin-right: 10px;
  margin-left: 2px;
  cursor: pointer;
`;
const LabelTitle = styled.div<LabelTitleProps>`
  flex: 1;
  background-color: ${props => props.$backgroundColor};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #533f04;
`;
const LabelEditButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.titleText};
  &:hover {
    background-color: #091e4224;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.buttonGrayText};
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
  const [isLabelEditorOpen, setIsLabelEditorOpen] = useState(true);
  const [currentLabel, setCurrentLabel] = useState<Label>(getInitialLabel());
  
  function changeCardBackgroundColor(color: string) {
    boardColumnsDispatch({
      type: 'changeCardBackgroundColor',
      boardColumn: column,
      card,
      newColor: color
    });
  }

  useHotkeys('esc', () => props.onClose(), {enabled: !isLabelEditorOpen});

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
  const labels = boardData?.labels.map((label) => {
    return (
      <LabelWrapper key={label.id}>
        <LabelContent>
          <LabelCheckbox type='checkbox' />
          <LabelTitle $backgroundColor={label.color}>{label.title}</LabelTitle>
          <LabelEditButton>
            <FontAwesomeIcon icon={faPen} />
          </LabelEditButton>
        </LabelContent>
      </LabelWrapper>
    );
  });

  return (
    <>
      <CardEditor 
        card={card} column={column} {...props}
      >
        <EditorContent>
          <EditorHalf>
            <EditorSection>
              <SectionTitle>Background color</SectionTitle>
              <ColorButtonsContainer>{colorButtons}</ColorButtonsContainer>
              <GreyButton
                $isActive={card.backgroundColor != ''}
                onClick={() => changeCardBackgroundColor('')}
              >
                Reset color
              </GreyButton>
            </EditorSection>
          </EditorHalf>
          <EditorHalf>
            <EditorSection>
              <SectionTitle>Labels</SectionTitle>
              <LabelsContainer>{labels}</LabelsContainer>
              <GreyButton $isActive={true}>Create a new label</GreyButton>
            </EditorSection>
          </EditorHalf>
        </EditorContent>

      </CardEditor>
      {isLabelEditorOpen && (
        <LabelEditor
          mode="create"
          isOpen={isLabelEditorOpen}
          onClose={() => setIsLabelEditorOpen(false)}
          label={currentLabel}
        />
      )}
    </>
  );
};

export default AppearanceEditor;