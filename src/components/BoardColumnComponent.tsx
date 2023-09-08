import styled from 'styled-components';
import { BoardColumn } from '../assets/shared/types';
import RenamableField from './RenamableField';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';


const StyledBoardColumn = styled.div`
  width: 100%;
  background-color: #f1f2f4;
  /* padding: 8px; */
  border-radius: 12px;
  box-shadow: var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f);
`;
const BoardColumnTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
  font-size: 14px;
  color: #172b4d;
`;

export default function BoardColumnComponent(props: BoardColumn) {
  var dispatch = useBoardColumnsDispatch();
  
  function handleRenameBoardColumn(newTitle: string) {
    dispatch!({
      type: "renamed",
      boardColumn: {
        ...props,
        title: newTitle
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