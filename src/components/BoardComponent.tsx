import { rgba } from 'polished';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import AddBoardElementButton from './AddBoardElementButton';
import BoardColumnComponent from './BoardColumnComponent';
import RenamableField from './RenamableField';
import Modal from './Modal';
import AppearanceEditor from './AppearanceEditor';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const BoardTitle = styled.div`
  backdrop-filter: blur(8px);
  height: 50px;
  background-color: ${() => rgba('grey', 0.5)};
  padding-left: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  input, .title {
    font-weight: bold;
    font-size: 20px;
    padding: 4px;
  }
`;
const ColumnsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 5px;
  overflow-x: auto;
  height: calc(100vh - 50px);
  >div {
    flex: 0 0 auto;
    width: 300px;
    border-radius: 12px;
  }
`;


export default function BoardComponent () {
  const [boardTitle, setBoardTitle] = useState<string>('Board');
  const boardColumns = useBoardColumns();
  const boardColumnsDispatch = useBoardColumnsDispatch();

  function reorderColumns<BoardColumn>(
    list: BoardColumn[],
    startIndex: number,
    endIndex: number
  ): BoardColumn[] {
    const result: BoardColumn[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }
  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    boardColumnsDispatch({
      type: 'reorderColumns',
      startIndex: result.source.index,
      endIndex: result.destination.index
    });
  };
  

  const boardColumnsList = boardColumns?.map((column, index) => {
    return (
      <Draggable 
        key={column.id}
        draggableId={column.id}
        index={index}
      >
        {(provided, snapshot) => (
          <BoardColumnComponent 
            column={column}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Draggable>
    )
  });

  return (
    <>
      <BoardTitle>
        <RenamableField
          fieldValue={boardTitle}
          onFieldValueChange={setBoardTitle}
        />
      </BoardTitle>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <ColumnsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardColumnsList}
              {provided.placeholder}
              <AddBoardElementButton elementType="boardColumn" />
            </ColumnsContainer>
          )}
        </Droppable>
      </DragDropContext>
      {/* <ColumnsContainer>
        {boardColumnsList}
      </ColumnsContainer> */}
    </>
  );
}

