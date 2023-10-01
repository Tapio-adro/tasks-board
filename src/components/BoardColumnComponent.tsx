import styled from 'styled-components';
import { BoardColumn, BoardAction } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardContext';
import RenamableField from './RenamableField';
import { Dispatch } from 'react';
import { XMark } from '../assets/shared/sharedComponents';
import CardComponent from './CardComponent';
import AddBoardElementButton from './AddBoardElementButton';


const StyledBoardColumn = styled.div`
  width: 100%;
  background-color: #f1f2f4;
  /* padding: 8px; */
  box-shadow: var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f);
`;
const BoardColumnTitle = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  padding: 11px 15px;
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
const CardsContainer = styled.div`
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export default function BoardColumnComponent(column: BoardColumn) {
  const dispatch = useBoardColumnsDispatch();
  
  function renameBoardColumn(newTitle: string) {
    dispatch({
      type: "renameColumn",
      boardColumn: {
        ...column,
        title: newTitle != '' ? newTitle : column.title
      }
    })
  }
  function removeBoardColumn(id: string) {
    dispatch({
      type: 'deleteColumn',
      id: id
    })
  }

  const cardsList = column.cards?.map((card) => {
    return (<CardComponent key={card.id} {...{column, card}} />)
  });
  
  return (
    <>
      <StyledBoardColumn>
        <BoardColumnTitle>
          <RenamableField
            fieldValue={column.title}
            onFieldValueChange={renameBoardColumn}
          />
          <XMark onClick={() => removeBoardColumn(column.id)}/>
        </BoardColumnTitle>
        <CardsContainer>
          {cardsList}
          <AddBoardElementButton elementType='card' boardColumn={column} />
        </CardsContainer>
      </StyledBoardColumn>
    </>
  )
}