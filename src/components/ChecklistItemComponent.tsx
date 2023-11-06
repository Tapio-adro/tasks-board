import React, { useState } from 'react';
import styled from 'styled-components';
import { BoardColumn, Card, ChecklistElement, ChecklistItem } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import TextareaAutosize from 'react-textarea-autosize';


const StyledChecklistItem = styled.div`
  display: flex;
  align-items: center;
`;
const ChecklistItemContent = styled.div`

`;
const ChecklistItemText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.titleText};
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  line-height: 20px;
  &:hover {
    background-color: #091e420f;
  }
`;
const ChecklistItemCheckbox = styled.input`
  width: 16px;
  margin-right: 6px;
  margin-left: 4px;
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
const ButtonsWrapper = styled.div`
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
  checklistItem: ChecklistItem;
  mode: ChecklistItemMode;
}

const ChecklistItemComponent: React.FC<ChecklistItemComponentProps> = ({
  column,
  card,
  checklistElement,
  checklistItem,
  mode,
}) => {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const checklistItemContent = mode == 'add' ? (
    <ButtonsWrapper>
      <ConfirmButton onClick={() => {}}>Add</ConfirmButton>
      <CancelButton onClick={() => {}}>Cancel</CancelButton>
    </ButtonsWrapper>
  ) : (
    isEditing ? (
      <>
        <TextareaAutosize value={checklistItem.text} />
        <ButtonsWrapper>
          <ConfirmButton onClick={() => {}}>Save</ConfirmButton>
          <CancelButton onClick={() => {}}>Cancel</CancelButton>
        </ButtonsWrapper>
      </>
      ) : (
      <ChecklistItemText>{checklistItem.text}</ChecklistItemText>
    )
  );

  return (
    <StyledChecklistItem>
      <ChecklistItemCheckbox type='checkbox'
        // checked={card.labels.some((cardLabel) => cardLabel.id === label.id)}
        // onChange={() => handleLabelClick(label)}
      />
      <ChecklistItemContent>
        {checklistItemContent}
      </ChecklistItemContent>
    </StyledChecklistItem>
  );
};

export default ChecklistItemComponent;