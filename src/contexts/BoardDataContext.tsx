import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { BoardData, BoardDataAction } from '../assets/shared/types';
import { getInitialBoardData, getInitialLabel } from '../assets/scripts/objectsGenerator';
import { useImmerReducer } from 'use-immer';

interface Props {
  children?: ReactNode
}

const BoardDataContext = createContext<BoardData | null>(null);
const BoardDataDispatchContext = createContext<Dispatch<BoardDataAction>>(() => {});
const initialBoardData = getInitialBoardData();


export function BoardDataProvider({ children }: Props) {
  const [boardData, dispatch] = useImmerReducer(
    boardDataReducer,
    initialBoardData
  );

  return (
    <BoardDataContext.Provider value={boardData}>
      <BoardDataDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDataDispatchContext.Provider>
    </BoardDataContext.Provider>
  );
}

export function useBoardData(): BoardData | null {
  return useContext(BoardDataContext);
}

export function useBoardDataDispatch(): ((action: BoardDataAction) => void) {
  return useContext(BoardDataDispatchContext);
}

// writer label actions which names have camelCase format and are defined in src/assets/shared/types.ts
// actions should be written in the same way as for the card editor and are defined in BoardColumnsContext.tsx
// there should be such actions as: addLabel, renameLabel, changeLabelColor, deleteLabel
// use immer to update state
// action type is BoardDataAction
// the action should be written in the same way as for the card editor and are defined in BoardColumnsContext.tsx
// actions properties are defined in src/assets/shared/types.ts in BoardDataAction interface
// write actions similar to the ones in BoardColumnsContext.tsx
function boardDataReducer(draft: BoardData, action: BoardDataAction) {
  switch (action.type) {
    case "addLabel": {
      const label = getInitialLabel();
      label.title = action.title;
      label.color = action.color;
      draft.labels.push(label);
      break;
    }
    case "renameLabel": {
      const labelIndex = getLabelIndexById(draft, action.label.id);
      let newTitle = action.newTitle != "" ? action.newTitle : action.label.title;
      draft.labels[labelIndex].title = newTitle;
      break;
    }
    case "changeLabelColor": {
      const labelIndex = getLabelIndexById(draft, action.label.id);
      draft.labels[labelIndex].color = action.newColor;
      break;
    }
    case "deleteLabel": {
      draft.labels.filter((label) => label.id !== action.id);
      return draft;
    }
  }
}
function getLabelIndexById(draft: BoardData, id: string) {
  return draft.labels.findIndex((label) => label.id === id);
}
