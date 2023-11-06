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
import TextElementComponent from './TextElementComponent';
import ChecklistComponent from './ChecklistComponent';


const EditorContent = styled.div`
  display: flex;
  column-gap: 16px;
  min-height: 300px;
`;
const EditorElements = styled.div`
  flex: 1;
  padding-left: 8px;
`;
const EditorSidebar = styled.div`
  width: 200px;
`;
const EditorSidebarTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  margin-left: 2px;
  font-size: 14px;
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
  
  useHotkeys('esc', () => props.onClose(), {enabled: !isAnyModalOpen()});

  function isAnyModalOpen() {
    // return isLabelEditorOpen || isDeleteModalOpen;
    // return isLabelEditorOpen;
    return false;
  }
  function addTextElement(title: string) {
    
  }

  const elementsList = card.elements.map((element, index) => {
    if (element.type === 'text') {
      return (
        <TextElementComponent 
          column={column}
          card={card}
          textElement={element}
          key={index}
        />
      );
    }
    if (element.type === 'checklist') {
      return (
        <ChecklistComponent 
          column={column}
          card={card}
          checklistElement={element}
          key={index}
        />
      );
    }
  });

  return (
    <>
      <CardEditor 
        card={card} column={column} {...props}
      >
        <EditorContent>
          <EditorElements>
            {elementsList}
          </EditorElements>
          <EditorSidebar>
            <EditorSidebarTitle>Add a card element</EditorSidebarTitle>
            <AddElementButton 
              elementType='text' 
              boardColumn={column}
              card={card}
              customIcon={<FontAwesomeIcon icon={faBars} />}
              closeOnConfirm={true}
            />
            <AddElementButton 
              elementType='checklist' 
              boardColumn={column}
              card={card}
              customIcon={<FontAwesomeIcon icon={faSquareCheck} />}
              closeOnConfirm={true}
            />
          </EditorSidebar>
        </EditorContent>
      </CardEditor>
    </>
  );
};

export default ContentEditor;