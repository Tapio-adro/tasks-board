import styled from 'styled-components';
import { BoardColumn, BoardColumnsAction } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import RenamableField from './RenamableField';
import { XMark } from '../assets/shared/sharedComponents';
import CardComponent from './CardComponent';
import AddBoardElementButton from './AddBoardElementButton';
import { useState } from 'react';
import DeleteModal from './DeleteModal';


const StyledBoardColumn = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bgColor};
  /* padding: 8px; */
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: pointer;
  margin: 0 5px;
`;
const BoardColumnTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: ${(props) => props.theme.colors.titleText};
  input, .title {
    font-weight: bold;
    font-size: 14px;
    padding: 4px;
    flex: 1;
  }
  >div:not(.title) {
    flex: 1;
  }
`;
const CardsContainer = styled.div`
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;


interface Props {
  column: BoardColumn;
  provided: any;
  snapshot: any;
}

export default function BoardColumnComponent({column, ...props}: Props) {
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  function renameBoardColumn(newTitle: string) {
    boardColumnsDispatch({
      type: "renameColumn",
      boardColumn: column,
      newTitle
    })
  }
  function removeBoardColumn(id: string) {
    boardColumnsDispatch({
      type: 'deleteColumn',
      boardColumn: column
    })
  }

  const cardsList = column.cards?.map((card) => {
    return (<CardComponent key={card.id} {...{column, card}} />)
  });
  
  return (
    <>
      <StyledBoardColumn
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
      >
        <BoardColumnTitle>
          <RenamableField
            fieldValue={column.title}
            onFieldValueChange={renameBoardColumn}
          />
          <XMark onClick={() => setIsDeleteModalOpen(true)}/>
        </BoardColumnTitle>
        <CardsContainer>
          {cardsList}
          <AddBoardElementButton elementType='card' boardColumn={column} />
        </CardsContainer>
      </StyledBoardColumn>
      
     <DeleteModal
        headerText='Delete column'
        descriptionText='Confirm deletion of this column'
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => removeBoardColumn(column.id)}
      />
    </>
  )
}