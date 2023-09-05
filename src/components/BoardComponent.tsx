import React, { useState } from 'react';
import { Board, BoardColumn } from '../assets/shared/types';
import { getBoardObject } from '../assets/scripts/objectsGenerator';
import { styled } from 'styled-components';
import { rgba } from 'polished';

const BoardTitle = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${() => rgba('grey', 0.5)};
  padding-left: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
`;


export function BoardComponent () {
  const [board, setBoard] = useState<Board>(getBoardObject)

  return (
    <>
      <BoardTitle>{board.title}</BoardTitle>
    </>
  )
}