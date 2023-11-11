import React, { useState } from 'react';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateBoardModal from './CreateBoardModal';
import { useBoards, useBoardsDispatch } from '../contexts/BoardsContext';
import { useBoardData, useBoardDataDispatch } from '../contexts/BoardDataContext';
import { Board } from '../assets/shared/types';
import { getInitialBoardData } from '../assets/scripts/objectsGenerator';
import OutsideClickHandler from 'react-outside-click-handler';


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
    background-color: hsla(218,24.2%,33.8%,0.9);
    &:hover {
      opacity: 0.95;
    }
  `};
  &:hover {
    background-color: hsla(218,24.2%,33.8%,0.9);
  }
`;
const SidebarContent = styled.div`
  background-color: hsla(218,24.2%,38.8%,0.9);
  width: 230px;
  padding-top: 4px;
`;
const BoardsSection = styled.section`
  
`;
const BoardsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 4px;
  padding-right: 4px;
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
  ${(props) => props.$isActive && css`
    background-color: hsla(0, 0%, 100%, 0.3);
  `};
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.16);
  }
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
  const boards = useBoards();
  const boardsDispatch = useBoardsDispatch();
  const boardData = useBoardData();
  const boardDataDispatch = useBoardDataDispatch();
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  function createBoard(title: string) {
    console.log('createBoard', title);
    const board: Board = {
      data: getInitialBoardData(),
      columns: [],
    };
    board.data.title = title;
    boardsDispatch({
      type: 'createBoard',
      board
    });
    setBoard(board);
  }
  function setBoard(board: Board) {
    if (board.data.id === boardData?.id) return;
    boardDataDispatch({
      type: 'setBoardData',
      boardData: board.data
    });
    boardColumnsDispatch({
      type: 'setBoardColumns',
      boardColumns: board.columns
    });
    localStorage.setItem('currentBoardId', board.data.id);
  }
  function deleteBoard(e: MouseEvent, board: Board) {
    e.stopPropagation();
    if (board.data.id === boardData?.id) return;
    boardsDispatch({
      type: 'deleteBoard',
      board
    });
  }

  const boardsList = boards?.map((board) => {
    return (
      <BoardItem 
        key={board.data.id} 
        $isActive={board.data.id == boardData?.id}
        onClick={() => setBoard(board)}
      >
        <BoardTitle>{board.data.title}</BoardTitle>
        <RemoveBoardButton
          onClick={(e) => deleteBoard(e, board)}
        >
          <FontAwesomeIcon icon={faXmark}/>
        </RemoveBoardButton>
      </BoardItem>
    );
  });
  
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => setIsSidebarOpen(false)}
        disabled={isCreateModalOpen}
      >
        <StyledBoardSidebar $isSidebarOpen={isSidebarOpen}>
            <SidebarContent>
              <BoardsSection>
                <BoardsTitleWrapper>
                  <BoardsTitle>Boards</BoardsTitle>
                  <AddBoardButton
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </AddBoardButton>
                </BoardsTitleWrapper>
                <BoardsContainer>
                  {boardsList}
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
      </OutsideClickHandler>
      {isCreateModalOpen && (
        <CreateBoardModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={createBoard}
          headerText="Create board"    
        />
      )}
    </>
  );
};

export default BoardSidebar;