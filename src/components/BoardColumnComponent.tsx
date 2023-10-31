import styled from 'styled-components';
import { BoardColumn, BoardColumnsAction } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import RenamableField from './RenamableField';
import { XMark } from '../assets/shared/sharedComponents';
import CardComponent from './CardComponent';
import AddBoardElementButton from './AddBoardElementButton';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const StyledBoardColumn = styled.div`
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: hidden;
  min-width: 300px;
  align-self: stretch;
`;
const BoardColumnTitle = styled.div`
  background-color: ${(props) => props.theme.colors.bgColor};
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
const CardsWrapper = styled.div`
  flex: 1;
`;
const CardsContainer = styled.div`
  padding: 0 0 8px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.bgColor};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
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
  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    // boardColumnsDispatch({
    //   type: 'moveCard',
    //   startColumn: column,
    //   endColumn: 
    //   startIndex: result.source.index,
    //   endIndex: result.destination.index
    // });
  };

  const cardsList = column.cards?.map((card, index) => {
    return (
      <Draggable
        key={card.id}
        draggableId={card.id}
        index={index}
      >
        {(provided, snapshot) => (
          <CardComponent 
            column={column} 
            card={card}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Draggable>  
    )
  });
  
  return (
    <>
      <StyledBoardColumn
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
      >
        <BoardColumnTitle
          {...props.provided.dragHandleProps}
        >
          <RenamableField
            fieldValue={column.title}
            onFieldValueChange={renameBoardColumn}
          />
          <XMark onClick={() => setIsDeleteModalOpen(true)}/>
        </BoardColumnTitle>
        <Droppable droppableId={column.id} type='CARD' direction='vertical'>
          {(provided, snapshot) => (
            <CardsWrapper
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <CardsContainer>
                {cardsList}
                {provided.placeholder}
                <AddBoardElementButton elementType='card' boardColumn={column} />
              </CardsContainer>
            </CardsWrapper>
          )}
        </Droppable>
        {/* <CardsContainer>
          {cardsList}
          <AddBoardElementButton elementType='card' boardColumn={column} />
        </CardsContainer> */}
      </StyledBoardColumn>
      
      {isDeleteModalOpen &&
        <DeleteModal
          headerText='Delete column'
          descriptionText='Confirm deletion of this column'
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => removeBoardColumn(column.id)}
        />
      }
    </>
  )
}