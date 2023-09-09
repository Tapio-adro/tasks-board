import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBoardColumnsDispatch } from '../contexts/BoardContext';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import OutsideClickHandler from 'react-outside-click-handler';
import { XMark } from '../assets/shared/sharedComponents';


interface ButtonProps {
  readonly $isActive: boolean;
}

const AddColumnWrapper = styled.div<ButtonProps>`
  background-color: #6d6c6c39;
  height: 50px;
  backdrop-filter: blur(4px);
  font-size: 14px;
  transition: 0.25s;
  padding: 8px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  ${props => props.$isActive && css`
    height: 84px;
    background-color: #f1f2f4;
    cursor: auto;
  `};
  &:hover {
    background-color: ${props => props.$isActive ? '#f1f2f4' : '#96969616'};
  }
`;
const StyledAddColumnButton = styled.button`
  top: 0;
  left: 0;
  position: absolute;
  padding-left: 16px;
  color: #fff;
  width: 100%;
  height: 50px;
  cursor: pointer;
  flex-grow: 1;
`;
const Input = styled.input`
  font-weight: bold;
  font-size: 14px;
  padding: 4px;
  color: #172b4d;
  width: 100%;
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
const CancelButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #44546F;
  margin-left: 4px;
  border-radius: 4px;
  &:hover {
    background-color: #8d8d8d28;
  }
  svg {
    font-weight: normal;
    font-size: 18px;
  }
`;


export default function AddColumnButton() {
  const dispatch = useBoardColumnsDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useHotkeys('enter', confirmAddingColumn, {enableOnFormTags: true})
  useHotkeys('esc', cancelAddingColumn, {enableOnFormTags: true})

  function startAddingColumn() {
    if (isActive) return;

    setIsActive(true)
  }
  function confirmAddingColumn() {
    if (!isActive || inputRef.current == null || inputRef.current.value == '') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    
    dispatch({
      type: 'addColumn',
      title: inputRef.current.value
    })

    inputRef.current.value = ''
    inputRef.current.focus();
  }
  function cancelAddingColumn() {
    if (!isActive) return;

    setIsActive(false)
  }

  

  const addColumnButton = isActive ? null : (
    <StyledAddColumnButton
      onClick={startAddingColumn}
    >
      <FontAwesomeIcon icon={faPlus}/>&nbsp;
      Add a column
    </StyledAddColumnButton>
  )
  const addColumnMenu = isActive ? (
    <>
      <Input ref={inputRef} type="text" placeholder='Column title' />
      <ButtonsContainer>
        <ConfirmButton onClick={confirmAddingColumn}>Add column</ConfirmButton>
        <XMark onClick={cancelAddingColumn} />
      </ButtonsContainer>
    </>
  ) : null

  return (
    <OutsideClickHandler onOutsideClick={() => cancelAddingColumn()}>
      <AddColumnWrapper
        $isActive={isActive}
      >
        {addColumnButton}
        {addColumnMenu}
      </AddColumnWrapper>
    </OutsideClickHandler>
  )
}