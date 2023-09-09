import styled from 'styled-components';
import { BoardColumn, BoardColumnAction } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import RenamableField from './RenamableField';
import { Dispatch } from 'react';


const StyledBoardColumn = styled.div`
  width: 100%;
  background-color: #f1f2f4;
  /* padding: 8px; */
  box-shadow: var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f);
`;
const BoardColumnTitle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: 600;
  color: #172b4d;
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

export default function BoardColumnComponent(props: BoardColumn) {
  const dispatch = useBoardColumnsDispatch();
  
  function handleRenameBoardColumn(newTitle: string) {
    dispatch({
      type: "renamed",
      boardColumn: {
        ...props,
        title: newTitle != '' ? newTitle : props.title
      }
    })
  }
  
  return (
    <>
      <StyledBoardColumn>
        <BoardColumnTitle>
          <RenamableField
            fieldValue={props.title}
            onFieldValueChange={handleRenameBoardColumn}
          />
        </BoardColumnTitle>
        
      </StyledBoardColumn>
    </>
  )
}