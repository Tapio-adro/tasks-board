import { rgba } from 'polished';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useBoardColumns } from '../contexts/BoardColumnsContext';
import AddBoardElementButton from './AddBoardElementButton';
import BoardColumnComponent from './BoardColumnComponent';
import RenamableField from './RenamableField';
import Modal from './Modal';
import AppearanceEditor from './AppearanceEditor';

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
  column-gap: 10px;
  align-items: flex-start;
  padding: 10px;
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
        <AddBoardElementButton elementType='boardColumn' />
      </ColumnsContainer>
    </>
  )
}

