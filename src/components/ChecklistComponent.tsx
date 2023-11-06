import React, { useEffect, useRef, useState } from 'react';
import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import { BoardColumn, Card, ChecklistElement, TextElement } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import OutsideClickHandler from 'react-outside-click-handler';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import RenamableField from './RenamableField';
import draftToMarkdown from 'draftjs-to-markdown';
import ChecklistItemComponent from './ChecklistItemComponent';


const StyledChecklistElement = styled.div`
  margin-bottom: 24px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  height: 32px;
  gap: 8px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.colors.titleText};
  width: 100%;
  input, .title {
    font-weight: 500;
    font-size: 18px;
    padding: 4px;
    flex: 1;
  }
  >div:not(.title) {
    flex: 1;
  }
`;
const GreyButton = styled.button`
  color: ${(props) => props.theme.colors.titleText};
  background-color: #091e420f;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    background-color: #091e4224;
  }
`;
const BottomButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  margin-left: 1px;
`;
const ConfirmButton = styled(GreyButton)`
  background-color: #0C66E4;
  font-size: 14px;
  color: #fff;  
  &:hover {
    background-color: #0055cc;
  }
`;
const CancelButton = styled(GreyButton)`
  background-color: transparent;
  font-weight: 600;
`;
const ChecklistItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 8px; */
  margin-bottom: 8px;
`;

interface ChecklistComponentProps {
  column: BoardColumn;
  card: Card;
  checklistElement: ChecklistElement;
}

const ChecklistComponent: React.FC<ChecklistComponentProps> = ({column, card, checklistElement}) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();

  useEffect(() => {
    if (checklistElement.isJustCreated) {
      // startEditing();
      // editorRef.current?.focusEditor();

      boardColumnsDispatch({
        type: 'disableCardElementJustCreated',
        boardColumn: column,
        card: card,
        element: checklistElement,
      });
    }
  }, [])

  // function startEditing() {
  //   setEditorActiveness(true);
  // }
  // function confirmEditing() {
  //   const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        
  //   boardColumnsDispatch({
  //     type: 'setTextElementText',
  //     boardColumn: column,
  //     card: card,
  //     textElement: textElement,
  //     newText: text,
  //   });
  //   setEditorActiveness(false);
  // }
  // function cancelEditing() {
  //   const contentBlocks = htmlToDraft(textElement.text).contentBlocks;
  //   const contentState = ContentState.createFromBlockArray(contentBlocks)
  //   setEditorState(EditorState.createWithContent(contentState));
  //   setEditorActiveness(false);
  // }
  function renameElement(newTitle: string) {
    boardColumnsDispatch({
      type: 'renameCardElement',
      boardColumn: column,
      card: card,
      element: checklistElement,
      newTitle: newTitle,
    });
  }
  function deleteElement() {
    boardColumnsDispatch({
      type: 'deleteCardElement',
      boardColumn: column,
      card: card,
      element: checklistElement,
    });
  }

  const checklistItemsList = checklistElement.items.map((item) => {
    return (
      <ChecklistItemComponent 
        column={column}
        card={card}
        checklistElement={checklistElement}
        checklistItem={item}
        mode='view'
      />
    );
  });

  return (
    <StyledChecklistElement>
      <TitleWrapper>
        <Title>
          <RenamableField 
            fieldValue={checklistElement.title}
            onFieldValueChange={renameElement}
          />
        </Title>
        <GreyButton onClick={deleteElement}>Delete</GreyButton>
      </TitleWrapper>
      <ChecklistItemsContainer>
        {checklistItemsList}
      </ChecklistItemsContainer>
      <GreyButton>Add an item</GreyButton>
    </StyledChecklistElement>
  );
};

export default ChecklistComponent;