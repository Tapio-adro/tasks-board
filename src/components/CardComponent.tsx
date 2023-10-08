import styled from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenamableField, { RenamableFieldHandle } from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardContext';
import { useRef } from 'react';


const StyledCard = styled.div`
  width: 100%;
  padding: 8px;
  padding-left: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-height: 36px;
`;
const CardTitle = styled.div`
  color: ${(props) => props.theme.colors.titleText};
  display: flex;
  align-items: center;
  input, .title {
    padding: 4px;
    flex: 1;
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
  const dispatch = useBoardColumnsDispatch();
  const renamableFieldRef = useRef<RenamableFieldHandle>(null);
  
  function renameCard(newTitle: string) {
    dispatch({
      type: "renameCard",
      boardColumn: column,
      card,
      newTitle
    })
  }

  return (
    <>
      <StyledCard>
        <CardTitle>
          <RenamableField
            ref={renamableFieldRef}
            fieldValue={card.title}
            onFieldValueChange={renameCard}
            showOnClick={false}
          />
          <EditTitleButton 
            onClick={() => renamableFieldRef.current?.toggleTextInput()}
            onMouseOver={() => renamableFieldRef.current?.toggleOutsideClick(true)}
            onMouseOut={() => renamableFieldRef.current?.toggleOutsideClick(false)}
          >
            <FontAwesomeIcon icon={faPen} />
          </EditTitleButton>
        </CardTitle>
      </StyledCard>
    </>
  )
}