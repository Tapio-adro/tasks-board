import React, { useState } from 'react';
import { Board, BoardColumn } from '../assets/shared/types';
import { getDefaultBoard } from '../assets/scripts/objectsGenerator';
import { styled } from 'styled-components';
import { rgba } from 'polished';
import RenamableField from './RenamableField';

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
    </>
  )
}