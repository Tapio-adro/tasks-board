import { rgba } from 'polished';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import AddElementButton from './AddElementButton';
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
  /* : stretch; */
  
  padding: 10px 5px;
  overflow-x: auto;
  height: calc(100vh - 50px);
`;


export default function BoardComponent () {
  const [boardTitle, setBoardTitle] = useState<string>('Board');
  const boardColumns = useBoardColumns();
  const boardColumnsDispatch = useBoardColumnsDispatch();


  function onDragEnd(result: any) {
    console.log(result.type);
    console.log(result);
    if (!result.destination) {
      return;
    }

    if (result.type === 'COLUMN') {
      boardColumnsDispatch({
        type: 'moveColumn',
        startIndex: result.source.index,
        endIndex: result.destination.index
      });
    } else {
      boardColumnsDispatch({
        type: 'moveCard',
        source: result.source,
        destination: result.destination
      });
    }
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
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided, snapshot) => (
            <ColumnsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardColumnsList}
              {provided.placeholder}
              <AddElementButton elementType="boardColumn" />
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

