import styled, { css } from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import { faN, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenamableField, { RenamableFieldHandle } from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import { useEffect, useRef, useState } from 'react';
import { useBoardData } from '../contexts/BoardDataContext';
import AppearanceEditor from './AppearanceEditor';


interface StyledCardProps {
  readonly $backgroundColor: string;
}

const StyledCard = styled.div<StyledCardProps>`
  width: 100%;
  padding: 8px;
  padding-left: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-height: 36px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
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
  input, .title {
    padding: 4px;
    flex: 1;
    ${props => props.$backgroundColor != '' && css`
      font-weight: bold;
    `};
  }
  >div:not(.title) {
    flex: 1;
  }
`;
const EditTitleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.buttonGrayText};
  opacity: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGrayHoverBg};
  }
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

interface CardComponentProps {
  column: BoardColumn;
  card: Card;
}

export default function CardComponent({column, card}: CardComponentProps) {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const renamableFieldRef = useRef<RenamableFieldHandle>(null);
  const [isAppearanceEditorOpen, setIsAppearanceEditorOpen] = useState(false);

  // useEffect(() => {
  //   openAppearanceEditor({column, card});
  // }, [])
  
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

  return (
    <>
      <StyledCard
        $backgroundColor={card.backgroundColor}
        onContextMenu={handleCardContextMenu}
      >
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
            onClick={handleTitleButtonClick}
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
    </>
  )
}