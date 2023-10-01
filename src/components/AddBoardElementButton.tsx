import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBoardColumnsDispatch } from '../contexts/BoardContext';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import OutsideClickHandler from 'react-outside-click-handler';
import { XMark } from '../assets/shared/sharedComponents';
import { BoardColumn, BoardElementType } from '../assets/shared/types';


interface AddElementWrapperProps {
  readonly $isActive: boolean;
  readonly $elementType: BoardElementType;
}
interface StyledAddBoardElementButtonProps {
  readonly $elementType: BoardElementType;
}
interface InputProps {
  readonly $elementType: BoardElementType;
}

const AddElementWrapper = styled.div<AddElementWrapperProps>`
  background-color: #6d6c6c39;
  height: 50px;
  backdrop-filter: blur(4px);
  font-size: 14px;
  transition: 0.25s;
  padding: 8px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  &:hover {
    background-color: #96969616;
  }
  ${props => {
    if (props.$elementType == 'card') {
      return css`
        padding: 0 8px;
        height: 30px;
        background-color: transparent;
        &:hover {
          background-color: #8d8d8d28;
        }
      `
    }
  }};
  ${props => {
    if (!props.$isActive) {
      return
    }
    if (props.$elementType == 'card') {
      return css`
        padding: 8px;
        height: 84px;
        background-color: white;
        box-shadow: var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f);
        &:hover {
          background-color: white;
        }
      `
    } else {
      return css`
        height: 84px;
        background-color: #f1f2f4;
        cursor: auto;
        &:hover {
          background-color: #f1f2f4;
        }
      `
    }

  }};
`;
const StyledAddBoardElementButton = styled.button<StyledAddBoardElementButtonProps>`
  top: 0;
  left: 0;
  position: absolute;
  padding-left: 16px;
  color: #fff;
  width: 100%;
  height: 50px;
  cursor: pointer;
  flex-grow: 1;
  ${props => props.$elementType == 'card' && css`
    padding-top: 3px;
    height: 30px;
    color: #44546f;
  `};
`;
const Input = styled.input<InputProps>`
  font-weight: bold;
  font-size: 14px;
  padding: 4px;
  color: #172b4d;
  width: 100%;
  ${props => props.$elementType == 'card' && css`
    font-weight: normal;
  `};
`;
const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;
const ConfirmButton = styled.button`
  min-height: 32px;
  background-color: #0C66E4;
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
  }
`;

interface AddBoardElementButtonProps {
  elementType: BoardElementType;
  boardColumn?: BoardColumn;
}

export default function AddBoardElementButton({elementType, boardColumn}: AddBoardElementButtonProps) {
  const dispatch = useBoardColumnsDispatch();

  const strings: {[id: string]: string} = elementType == 'boardColumn' ? {
    addElement: 'Add a column',
    elementTitle: 'Column title',
    buttonTitle: 'Add column'
  } : {
    addElement: 'Add a card',
    elementTitle: 'Card title',
    buttonTitle: 'Add card'
  }

  const [isActive, setIsActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useHotkeys('enter', confirmAddingElement, {enableOnFormTags: true})
  useHotkeys('esc', cancelAddingElement, {enableOnFormTags: true})

  function startAddingElement() {
    if (isActive) return;

    setIsActive(true)
  }
  function confirmAddingElement() {
    if (!isActive || inputRef.current == null || inputRef.current.value == '') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    
    switch (elementType) {
      case 'boardColumn':
        dispatch({
          type: 'addColumn',
          title: inputRef.current.value
        })
        break;
      case 'card':
        if (!boardColumn) {
          break;
        }
        dispatch({
          type: 'addCard',
          boardColumn: boardColumn,
          title: inputRef.current.value
        })
        break;
    }
      

    inputRef.current.value = ''
    inputRef.current.focus();
  }
  function cancelAddingElement() {
    if (!isActive) return;

    setIsActive(false)
  }

  

  const addElementButton = isActive ? null : (
    <StyledAddBoardElementButton
      onClick={startAddingElement}
      $elementType={elementType}
    >
      <FontAwesomeIcon icon={faPlus}/>&nbsp;
      {strings.addElement}
    </StyledAddBoardElementButton>
  )
  const addElementMenu = isActive ? (
    <>
      <Input
        ref={inputRef}
        type="text"
        placeholder={strings.elementTitle}
        $elementType={elementType}
      />
      <ButtonsContainer>
        <ConfirmButton onClick={confirmAddingElement}>
          {strings.buttonTitle}
        </ConfirmButton>
        <XMark onClick={cancelAddingElement} />
      </ButtonsContainer>
    </>
  ) : null;

  return (
    <OutsideClickHandler onOutsideClick={() => cancelAddingElement()}>
      <AddElementWrapper
        $isActive={isActive}
        $elementType={elementType}
      >
        {addElementButton}
        {addElementMenu}
      </AddElementWrapper>
    </OutsideClickHandler>
  )
}