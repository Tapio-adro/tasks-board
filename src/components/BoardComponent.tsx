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
  >div {
    /* flex: 0 0 auto; */
    width: 300px;
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
      </ColumnsContainer>
    </>
  )
}