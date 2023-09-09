import React, { useEffect, useState } from 'react';
import { Board, BoardColumn } from '../assets/shared/types';
import { getInitialBoardColumn } from '../assets/scripts/objectsGenerator';
import { styled } from 'styled-components';
import { rgba } from 'polished';
import RenamableField from './RenamableField';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BoardColumnComponent from './BoardColumnComponent';
import { BoardColumnsProvider, useBoardColumns, useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';

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
    border: 2px solid rgba(0, 0, 0, 0);
  }
`;
const ColumnsContainer = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: flex-start;
  padding: 10px;
  overflow-x: auto;
  height: calc(100vh - 50px);
  >div, >button {
    flex: 0 0 auto;
    width: 300px;
    border-radius: 12px;
  }
`;
const StyledAddColumn = styled.button`
  background-color: #96969639;
  height: 50px;
  color: #fff;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;
  cursor: pointer;
  &:hover {
    background-color: #96969616;
  }
`;

export default function BoardComponent () {
  const [boardTitle, setBoardTitle] = useState<string>('Board');
  const boardColumns = useBoardColumns();


  useEffect(() => {
    // setBoard({
    //   ...board,
    //   columns: [
    //     ...board.columns,
    //     getDefaultBoardColumn()
    //   ]
      
    // })

    // return () => {
    //   board.columns = []
    // }
}, [])



  // function setBoardTitle(newTitle: string) {
  //   setBoard({
  //     ...board,
  //     title: newTitle
  //   })
  // }

  const boardColumnsList = boardColumns?.map((column) => {
    return (<BoardColumnComponent key={column.id} {...column} />)
  });

  return (
    <>
      <BoardTitle>       
        <RenamableField
          fieldValue={boardTitle}
          onFieldValueChange={setBoardTitle}
        />
      </BoardTitle>
      <ColumnsContainer>
        {boardColumnsList}
        <AddColumn />
      </ColumnsContainer>
    </>
  )
}

function AddColumn() {
  const dispatch = useBoardColumnsDispatch();

  function addColumn() {
    dispatch({
      type: 'added'
    })
  }

  return (
    <StyledAddColumn onClick={addColumn}>
      <FontAwesomeIcon icon={faPlus}/>&nbsp;
      Add a column
    </StyledAddColumn>
  )
}