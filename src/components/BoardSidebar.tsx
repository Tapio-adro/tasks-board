import React, { useState } from 'react';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";


interface StyledBoardSidebarProps {
  readonly $isSidebarOpen: boolean;
}
interface BoardItemProps {
  readonly $isActive: boolean;
}

const StyledBoardSidebar = styled.div<StyledBoardSidebarProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  backdrop-filter: blur(6px);
  color: #fff;
  transform: translateX(-230px);
  ${(props) => props.$isSidebarOpen && css`
    transform: translateX(0);
  `};
  transition: transform 0.3s ease-in-out;
  display: flex;
`;
const ToggleArrow = styled.button<StyledBoardSidebarProps>`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  transform: scaleX(1);
  background-color: hsla(218,24.2%,38.8%,0.9);
  ${(props) => props.$isSidebarOpen && css`
    transform: scaleX(-1);
  `};
  &:hover {
    background-color: hsla(218,24.2%,33.8%,0.9);
  }
`;
const SidebarContent = styled.div`
  background-color: hsla(218,24.2%,38.8%,0.9);
  width: 230px;
  padding-top: 8px;
`;
const BoardsSection = styled.section`
  
`;
const BoardsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 4px;
`;
const BoardsTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const AddBoardButton = styled.button`
  color: #fff;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #A6C5E229;
  }
  border-radius: 4px;
  font-size: 14px;
`;
const BoardsContainer = styled.div`
  
`;
const BoardItem = styled.div<BoardItemProps>`
  font-size: 14px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.16);
  }
  ${(props) => props.$isActive && css`
    background-color: hsla(0, 0%, 100%, 0.3);
  `};
`;
const BoardTitle = styled.div`
  
`;
const RemoveBoardButton = styled(AddBoardButton)`
  &:hover {
    background-color: #a6c5e258;
  }
`;

// interface BoardSidebarProps {
//   column: BoardColumn;
//   card: Card;
//   checklistElement: ChecklistElement;
// }

const BoardSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (checklistElement.isJustCreated) {
  //     // startEditing();
  //     // editorRef.current?.focusEditor();

  //     boardColumnsDispatch({
  //       type: 'disableCardElementJustCreated',
  //       boardColumn: column,
  //       card: card,
  //       element: checklistElement,
  //     });
  //   }
  // }, [])

  return (
    <StyledBoardSidebar $isSidebarOpen={isSidebarOpen}>
      <SidebarContent>
        <BoardsSection>
          <BoardsTitleWrapper>
            <BoardsTitle>Boards</BoardsTitle>
            <AddBoardButton>
              <FontAwesomeIcon icon={faPlus} />
            </AddBoardButton>
          </BoardsTitleWrapper>
          <BoardsContainer>
            <BoardItem>
              <BoardTitle>Board 1</BoardTitle>
              <RemoveBoardButton>
                <FontAwesomeIcon icon={faXmark}/>
              </RemoveBoardButton>
            </BoardItem>
            <BoardItem>
              <BoardTitle>Board 2</BoardTitle>
              <RemoveBoardButton>
                <FontAwesomeIcon icon={faXmark}/>
              </RemoveBoardButton>
            </BoardItem>
            <BoardItem>
              <BoardTitle>Board 3</BoardTitle>
              <RemoveBoardButton>
                <FontAwesomeIcon icon={faXmark}/>
              </RemoveBoardButton>
            </BoardItem>
          </BoardsContainer>
        </BoardsSection>
      </SidebarContent>
      <ToggleArrow
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        $isSidebarOpen={isSidebarOpen}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ToggleArrow>
    </StyledBoardSidebar>
  );
};

export default BoardSidebar;