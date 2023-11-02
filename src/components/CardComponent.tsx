import styled, { css } from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import { faN, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenamableField, { RenamableFieldHandle } from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { useEffect, useRef, useState } from 'react';
import { useBoardData, useBoardDataDispatch } from '../contexts/BoardDataContext';
import AppearanceEditor from './AppearanceEditor';
import ContentEditor from './ContentEditor';
import { Editor } from 'react-draft-wysiwyg';


interface StyledCardProps {
  readonly $backgroundColor: string;
}
interface LabelProps {
  readonly $isExpanded: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  padding: 8px 12px;
  margin: 0 8px 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-height: 36px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:hover {
    box-shadow: inset 0 0 0 1.5px black;
  };
  background-color: ${props => props.$backgroundColor == '' ? '#fff' : props.$backgroundColor};
  ${props => props.$backgroundColor != '' && css`
    font-weight: bold;
  `};
`;
const CardTitle = styled.div<StyledCardProps>`
  color: ${(props) => props.theme.colors.titleText};
  display: flex;
  align-items: center;
  align-self: stretch;
  input,
  .title {
    font-size: 14px;
    padding: 4px;
    flex: 1;
    font-weight: 400;
    ${(props) =>
      props.$backgroundColor != '' &&
      css`
        font-weight: bold;
      `};
  }
  > div:not(.title) {
    flex: 1;
  }
`;
const EditTitleButton = styled.button<StyledCardProps>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  opacity: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGreyHoverBg};
  }
  ${StyledCard}:hover & {
    opacity: 1;
  }
  ${props => props.$backgroundColor != '' && css`
    background-color: #fff;
    &:hover {
      background-color: #f1f2f4;
    }
  `};
`;
const Labels = styled.div<StyledCardProps>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-bottom: 2px;
  &:empty {
    display: none;
  }
  ${props => props.$backgroundColor != '' && css`
    background-color: ${(props) => props.theme.colors.bgColor};
    padding: 3px;
    border-radius: 4px;
  `};
`;
const Label = styled.button<LabelProps>`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #000;
  &:hover {
    filter: saturate(85%) brightness(85%);
  }
  ${props => props.$isExpanded && css`
    width: auto;
    height: auto;
    padding: 4px;
    min-width: 25px;
  `};
`;  

interface CardComponentProps {
  column: BoardColumn;
  card: Card;
  provided: any;
  snapshot: any;
}

export default function CardComponent({column, card, ...props}: CardComponentProps) {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const renamableFieldRef = useRef<RenamableFieldHandle>(null);
  const [isAppearanceEditorOpen, setIsAppearanceEditorOpen] = useState(false);
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(true);
  const boardData = useBoardData();
  const boardDataDispatch = useBoardDataDispatch();

  useEffect(() => {
    // setIsAppearanceEditorOpen(true);
  }, [])
  
  function renameCard(newTitle: string) {
    boardColumnsDispatch({
      type: 'renameCard',
      boardColumn: column,
      card,
      newTitle,
    });
  }
  function handleCardContextMenu(event: React.MouseEvent) {
    event.preventDefault();
    setIsAppearanceEditorOpen(true);
  }
  function handleTitleButtonClick(event: React.MouseEvent) {
    event.stopPropagation();
    renamableFieldRef.current?.toggleTextInput();
  }
  function closeAppearanceEditor() {
    setIsAppearanceEditorOpen(false);
  }
  function handleLabelClick(e: React.MouseEvent) {
    e.stopPropagation();
    boardDataDispatch({
      type: 'toggleCardLabelsExpand',
    });
  }
  function handleCardClick() {
    setIsContentEditorOpen(true);
  }
  function closeContentEditor() {
    setIsContentEditorOpen(false);
  }

  const labels = card.labels.map((label) => {
    return (
      <Label
        key={label.id}
        style={{backgroundColor: label.color}}
        onClick={handleLabelClick}
        $isExpanded={boardData?.areCardLabelsExpanded ?? false}
      >
        {boardData?.areCardLabelsExpanded && label.title}
      </Label>
    );
  });

  return (
    <>
      <StyledCard
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
        $backgroundColor={card.backgroundColor}
        onContextMenu={handleCardContextMenu}
        onClick={handleCardClick}
      >
        <Labels
          $backgroundColor={card.backgroundColor}
        >
          {labels}
        </Labels>
        <CardTitle
          $backgroundColor={card.backgroundColor}
        >
          <RenamableField
            ref={renamableFieldRef}
            fieldValue={card.title}
            onFieldValueChange={renameCard}
            showOnClick={false}
          />
          <EditTitleButton
            $backgroundColor={card.backgroundColor}
            onClick={handleTitleButtonClick}
            onContextMenu={(e) => {e.preventDefault(); handleTitleButtonClick(e)}}
            onMouseOver={() => renamableFieldRef.current?.toggleOutsideClick(true)}
            onMouseOut={() => renamableFieldRef.current?.toggleOutsideClick(false)}
          >
            <FontAwesomeIcon icon={faPen} />
          </EditTitleButton>
        </CardTitle>
      </StyledCard>
      
      {isAppearanceEditorOpen && <AppearanceEditor
        card={card}
        column={column}
        isOpen={isAppearanceEditorOpen}
        onClose={closeAppearanceEditor}
      />}
      {isContentEditorOpen && <ContentEditor
        card={card}
        column={column}
        isOpen={isContentEditorOpen}
        onClose={closeContentEditor}
      />}
    </>
  )
}