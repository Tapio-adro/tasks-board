import React, { useState } from 'react';
import { Board, BoardColumn } from '../assets/shared/types';
import { getDefaultBoard } from '../assets/scripts/objectsGenerator';
import { styled } from 'styled-components';
import { rgba } from 'polished';
import RenamableField from './RenamableField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BoardTitle = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${() => rgba('grey', 0.5)};
  padding-left: 20px;
  display: flex;
  align-items: center;
  input, .title {
    font-weight: bold;
    font-size: 20px;
    padding: 4px;
    border: 2px solid rgba(0, 0, 0, 0);
  }
  .title {
    color: #fff;
    border: 2px solid rgba(0, 0, 0, 0);
  }
`;
const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  height: calc(100vh - 50px);
  div {
    flex: 0 0 auto;
    width: 300px;
  }
`;

export default function BoardComponent () {
  const [board, setBoard] = useState<Board>(getDefaultBoard)

  function setBoardTitle(newTitle: string) {
    setBoard({
      ...board,
      title: newTitle
    })
  }

  return (
    <>
      <BoardTitle>       
        <RenamableField
          fieldValue={board.title}
          onFieldValueChange={setBoardTitle}
        />
      </BoardTitle>
      <ColumnsContainer>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </ColumnsContainer>
    </>
  )
}