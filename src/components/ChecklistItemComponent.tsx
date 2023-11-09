import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { BoardColumn, Card, ChecklistElement, ChecklistItem } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import TextareaAutosize from 'react-textarea-autosize';
import { useHotkeys } from 'react-hotkeys-hook';
import { XMark } from '../assets/shared/sharedComponents';
import OutsideClickHandler from 'react-outside-click-handler';


interface ChecklistItemTextProps {
  readonly $isChecked: boolean;
}

const StyledChecklistItem = styled.div`
  display: flex;
`;
const ChecklistItemContent = styled.div`
  display: flex;
  align-items: start;
  flex: 1;
`;
const ChecklistItemAdd = styled.div`
  width: 100%;
`;
const ChecklistItemEdit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  margin-right: 8px;
  background-color: #091e420f;
  padding: 8px;
  border-radius: 8px;
`;
const ChecklistItemText = styled.div<ChecklistItemTextProps>`
  font-size: 14px;
  color: ${(props) => props.theme.colors.titleText};
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  line-height: 20px;
  flex: 1;
  &:hover {
    background-color: #091e420f;
  }
  ${props => props.$isChecked && css`
    text-decoration: line-through;
    color: ${(props) => props.theme.colors.titleTextSubtle};
  `};
`;
const ChecklistItemCheckboxContainer = styled.button`
  min-width: 28px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ChecklistItemCheckbox = styled.input`
  width: 16px;
  cursor: pointer;
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
const AddButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
  margin-left: 1px;
`;
const EditButtonsWrapper = styled.div`
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

export type ChecklistItemMode = 'add' | 'view';

interface ChecklistItemComponentProps {
  column: BoardColumn;
  card: Card;
  checklistElement: ChecklistElement;
  checklistItem?: ChecklistItem;
  mode: ChecklistItemMode;
  setIsAddingItem?: Function;
  provided?: any;
  snapshot?: any;
}

const ChecklistItemComponent: React.FC<ChecklistItemComponentProps> = ({
  column,
  card,
  checklistElement,
  checklistItem,
  mode,
  ...props
}) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [nextItemText, setNextItemText] = useState('');
  const [editedItemText, setEditedItemText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useHotkeys('enter', e => handleEnterPress(e), {enableOnFormTags: true});
  useHotkeys('esc', handleEscapePress, {enableOnFormTags: true});

  function handleEnterPress(e: KeyboardEvent) {
    if (mode == 'add') {
      e.preventDefault();
      addChecklistItem();
    } else if (mode == 'view' && isEditing) {
      e.preventDefault();
      confirmEditing();
    }
  }
  function handleEscapePress() {
    if (mode == 'add') {
      stopAddingItem();
    } else if (mode == 'view' && isEditing) {
      cancelEditing();
    }
  }

  function addChecklistItem() {
    if (isTextEmpty(nextItemText)) {
      textareaRef.current?.focus();
      return;
    }

    boardColumnsDispatch({
      type: 'addChecklistItem',
      boardColumn: column,
      card: card,
      checklistElement: checklistElement,
      text: nextItemText,
    });

    setNextItemText('');
    textareaRef.current?.focus();
  }
  function setChecklistItemText(newText: string) {
    if (!checklistItem) return;
    boardColumnsDispatch({
      type: 'setChecklistItemText',
      boardColumn: column,
      card: card,
      checklistElement: checklistElement,
      checklistItem: checklistItem,
      newText: newText,
    });
  }
  function toggleChecklistItem() {
    if (!checklistItem) return;
    boardColumnsDispatch({
      type: 'toggleChecklistItem',
      boardColumn: column,
      card: card,
      checklistElement: checklistElement,
      checklistItem: checklistItem,
    });
  }
  function deleteChecklistItem() {
    if (!checklistItem) return;
    boardColumnsDispatch({
      type: 'deleteChecklistItem',
      boardColumn: column,
      card: card,
      checklistElement: checklistElement,
      checklistItem: checklistItem,
    });
  }

  function isTextEmpty(text: string) {
    return text.replaceAll(' ', '') === '';
  }
  function stopAddingItem() {
    if (props.setIsAddingItem) {
      props.setIsAddingItem(false);
    }
  }

  function startEditing() {
    if (!checklistItem) return;
    setEditedItemText(checklistItem.text);
    setIsEditing(true);
  }
  function confirmEditing() {
    if (!checklistItem) return;
    setChecklistItemText(editedItemText);
    setIsEditing(false);
  }
  function cancelEditing() {
    if (!checklistItem) return;
    setIsEditing(false);
  }

  function handleCheckboxChange() {
    if (!checklistItem) return;
    toggleChecklistItem();
  }

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.select();
    }
  }, [isEditing])

  const checklistItemAdd = mode == 'add' ? (
    <ChecklistItemAdd>
      <OutsideClickHandler
        onOutsideClick={stopAddingItem}
      >
        <TextareaAutosize
          value={nextItemText}
          onChange={(e) => setNextItemText(e.target.value)}
          rows={2}
          autoFocus
          placeholder='Add an item'
          ref={textareaRef}
        />
        <AddButtonsWrapper>
          <ConfirmButton onClick={addChecklistItem}>Add</ConfirmButton>
          <CancelButton onClick={stopAddingItem}>Cancel</CancelButton>
        </AddButtonsWrapper>
      </OutsideClickHandler>
    </ChecklistItemAdd>
  ) : null;
  const checklistItemContent = checklistItem ? (isEditing ? (
    <ChecklistItemEdit>
      <OutsideClickHandler
        onOutsideClick={confirmEditing}
      >
        <TextareaAutosize 
          value={editedItemText} 
          onChange={(e) => setEditedItemText(e.target.value)}
          ref={textareaRef}
        />
        <EditButtonsWrapper>
          <ConfirmButton onClick={confirmEditing}>Save</ConfirmButton>
          <CancelButton onClick={cancelEditing}>Cancel</CancelButton>
        </EditButtonsWrapper>
      </OutsideClickHandler>
    </ChecklistItemEdit>
    ) : (
      <ChecklistItemText
        $isChecked={checklistItem.isChecked}
        onClick={startEditing}
        {...props.provided.dragHandleProps}
      >{checklistItem.text}</ChecklistItemText>
    )
  ) : null;

  return (
    <StyledChecklistItem>
      {checklistItemAdd}
      {(mode == 'view') && <ChecklistItemContent
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
      >
        <ChecklistItemCheckboxContainer
          // onClick={toggleChecklistItem}
        >
          <ChecklistItemCheckbox type='checkbox'
            checked={checklistItem?.isChecked}
            onChange={handleCheckboxChange}
          />
        </ChecklistItemCheckboxContainer>
        {checklistItemContent}
        {!isEditing && (<XMark 
          onClick={deleteChecklistItem}
          noMarginLeft={true}
          lowerOpacity={true}
        />)}
      </ChecklistItemContent>}
    </StyledChecklistItem>
  );
};

export default ChecklistItemComponent;