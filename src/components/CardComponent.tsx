import styled from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';


const StyledCard = styled.div`
  width: 100%;
  padding: 8px;
  padding-left: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-height: 36px;
  display: flex;
  align-items: center;
`;
const CardTitle = styled.div`
  color: #172B4D;
`;

interface CardComponentProps {
  column: BoardColumn;
  card: Card;
}
export default function CardComponent({column, card}: CardComponentProps) {
  
  
  return (
    <>
      <StyledCard>
        <CardTitle>{card.title}</CardTitle>
        
      </StyledCard>
    </>
  )
}