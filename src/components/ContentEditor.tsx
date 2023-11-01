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
import { faBars, faPen } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import LabelEditor, { LabelEditorMode } from './LabelEditor';
import { getInitialLabel } from '../assets/scripts/objectsGenerator';
import DeleteModal from './DeleteModal';
import AddElementButton from './AddElementButton';

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

const EditorHalf = styled.div`
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const EditorSection = styled.section`
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 8px;
  /* min-height: 200px; */
  padding: 12px;
`;
const SectionTitle = styled.div`
  color: ${(props) => props.theme.colors.titleTextSubtle};
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
  height: 32px;
  &:hover {
    background-color: #091e4224;
  }
  ${props => !props.$isActive && css`
    opacity: 0.5;
    pointer-events: none; 
  `};
`;
const DeleteButton = styled(GreyButton)`
  &:hover {
    color: #fff;
    background-color: #C9372C;
  }
`;
const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:not(:empty) {
    margin-bottom: 16px;
  }
`;
const LabelWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: stretch;
`;
const LabelContent = styled.div`
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
const LabelTitle = styled.button<LabelTitleProps>`
  flex: 1;
  background-color: ${props => props.$backgroundColor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #533f04;
  padding: 12px;
  &:hover {
    opacity: 0.9;
  }
`;
const LabelEditButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 4px;
  color: ${(props) => props.theme.colors.titleText};
  &:hover {
    background-color: #091e4224;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.titleTextSubtle};
`;

const EditorContent = styled.div`
  display: flex;
  column-gap: 16px;
`;
const EditorElements = styled.div`
  flex: 1;
`;
const EditorSidebar = styled.div`
  width: 200px;
`;
const EditorSidebarTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  margin-left: 2px;
  /* font-weight: 400; */
`;

export interface ContentEditorProps {
  column: BoardColumn;
  card: Card;
  isOpen: boolean;
  onClose: Function;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ column, card, ...props }) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const boardData = useBoardData();
  
  // useHotkeys('esc', () => props.onClose(), {enabled: !isAnyModalOpen()});

  // function isAnyModalOpen() {
  //   return isLabelEditorOpen || isDeleteModalOpen;
  //   return isLabelEditorOpen;
  // }

  return (
    <>
      <CardEditor 
        card={card} column={column} {...props}
      >
        <EditorContent>
          <EditorElements>
            
          </EditorElements>
          <EditorSidebar>
            <EditorSidebarTitle>Add a card element</EditorSidebarTitle>
            <AddElementButton 
              elementType='text' 
              boardColumn={column}
              card={card}
              customIcon={<FontAwesomeIcon icon={faBars} />}
            />
            <AddElementButton 
              elementType='checklist' 
              boardColumn={column}
              card={card}
              customIcon={<FontAwesomeIcon icon={faSquareCheck} />}
            />
          </EditorSidebar>
        </EditorContent>
      </CardEditor>
    </>
  );
};

export default ContentEditor;