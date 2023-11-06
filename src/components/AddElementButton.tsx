import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import OutsideClickHandler from 'react-outside-click-handler';
import { XMark } from '../assets/shared/sharedComponents';
import { BoardColumn, Card, ElementType } from '../assets/shared/types';


interface AddElementWrapperProps {
  readonly $isActive: boolean;
  readonly $elementType: ElementType;
}
interface StyledAddElementButtonProps {
  readonly $elementType: ElementType;
}
interface InputProps {
  readonly $elementType: ElementType;
}
interface ButtonsContainerProps {
  readonly $elementType: ElementType;
}

const AddElementWrapper = styled.div<AddElementWrapperProps>`
  border-radius: 8px;
  font-size: 14px;
  transition: 0.25s;
  position: relative;
  overflow: hidden;
  
  ${props => { if (props.$elementType == 'boardColumn') { return css`
    width: 300px;
    height: 50px;
    margin: 0 5px;
    padding: 8px;
    background-color: #6d6c6c39;
    backdrop-filter: blur(4px);
    &:hover {
      background-color: #96969616;
    }
  `}}};
  ${props => { if (props.$elementType == 'card') { return css`
    width: auto;
    height: 30px;
    margin: 0 8px;
    padding: 0 8px;
    background-color: transparent;
    &:hover {
      background-color: #8d8d8d28;
    }
  `}}};
  ${props => { if (props.$elementType == 'text' || props.$elementType == 'checklist') { return css`
    height: 32px;
    background-color: #091e420f;
    border-radius: 4px;
    margin-top: 8px;
    padding: 0 8px;
    &:hover {
      background-color: #091e4224;
    }
  `}}};

  ${props => {
    if (!props.$isActive) {
      return
    }
    if (props.$elementType == 'boardColumn') { return css`
      height: 84px;
      background-color: ${(props) => props.theme.colors.bgColor};
      cursor: auto;
      box-shadow: ${(props) => props.theme.boxShadow};
      &:hover {
        background-color: ${(props) => props.theme.colors.bgColor};
      }
    `;}
    if (props.$elementType == 'card') { return css`
      padding: 8px;
      height: 84px;
      background-color: white;
      box-shadow: ${(props) => props.theme.boxShadow};
      &:hover {
        background-color: white;
      }
    `;}
    if (props.$elementType == 'text' || props.$elementType == 'checklist') { return css`
      height: 84px;
      padding: 8px;
      background-color: #fff;
      cursor: auto;
      &:hover {
        background-color: white;
      }
    `;}
  }};
`;
const StyledAddElementButton = styled.button<StyledAddElementButtonProps>`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  cursor: pointer;
  flex-grow: 1;
  font-size: 14px;

  ${props => props.$elementType == 'boardColumn' && css`
    color: #fff;
    height: 50px;
    padding-left: 16px;
  `};
  ${props => props.$elementType == 'card' && css`
    color: ${(props) => props.theme.colors.titleTextSubtle};
    height: 30px;
    padding-left: 12px;
    padding-top: 2px;
  `};
  ${props => (props.$elementType == 'text' || props.$elementType == 'checklist') && css`
    color: ${(props) => props.theme.colors.titleText};
    font-weight: 500;
    height: 32px;
    padding-left: 12px;
  `};
`;
const Input = styled.input<InputProps>`
  font-weight: bold;
  font-size: 14px;
  padding: 4px;
  color: ${(props) => props.theme.colors.titleText};
  width: 100%;
  ${props => props.$elementType == 'card' && css`
    font-weight: normal;
  `};
`;
const ButtonsContainer = styled.div<ButtonsContainerProps>`
  display: flex;
  margin-top: 8px;
  ${props => (props.$elementType == 'text' || props.$elementType == 'checklist') && css`
    justify-content: space-between;
  `};
`;
const ConfirmButton = styled.button`
  min-height: 32px;
  background-color: #0C66E4;
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
`;

interface AddElementButtonProps {
  elementType: ElementType;
  boardColumn?: BoardColumn;
  card?: Card;
  customIcon?: JSX.Element;
  closeOnConfirm?: boolean;
}

export default function AddElementButton({
  elementType,
  boardColumn,
  card,
  ...props
}: AddElementButtonProps) {
  const dispatch = useBoardColumnsDispatch();

  const strings: { [id: string]: string } = {
    boardColumn: {
      addElement: 'Add a column',
      elementTitle: 'Column title',
      buttonTitle: 'Add column',
    },
    card: {
      addElement: 'Add a card',
      elementTitle: 'Card title',
      buttonTitle: 'Add card',
    },
    text: {
      addElement: 'Text',
      elementTitle: 'Text title',
      buttonTitle: 'Add text attachment',
    },
    checklist: {
      addElement: 'Checklist',
      elementTitle: 'Checklist title',
      buttonTitle: 'Add checklist',
    },
  }[elementType];

  const [isActive, setIsActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useHotkeys('enter', confirmAddingElement, { enableOnFormTags: true });
  useHotkeys('esc', cancelAddingElement, { enableOnFormTags: true });

  function startAddingElement() {
    if (isActive) return;

    setIsActive(true);
  }
  function confirmAddingElement() {
    if (!isActive || inputRef.current == null || inputRef.current.value == '') {
      inputRef.current?.focus();
      return;
    }

    switch (elementType) {
      case 'boardColumn':
        dispatch({
          type: 'addColumn',
          title: inputRef.current.value,
        });
        break;
      case 'card':
        if (!boardColumn) {
          break;
        }
        dispatch({
          type: 'addCard',
          boardColumn: boardColumn,
          title: inputRef.current.value,
        });
        break;
      case 'text':
        if (!boardColumn || !card) {
          break;
        }
        dispatch({
          type: 'addCardTextElement',
          boardColumn: boardColumn,
          card: card,
          title: inputRef.current.value,
        });
        break;
      case 'checklist':
        if (!boardColumn || !card) {
          break;
        }
        dispatch({
          type: 'addCardChecklistElement',
          boardColumn: boardColumn,
          card: card,
          title: inputRef.current.value,
        });
        break;
    }

    if (props.closeOnConfirm) {
      setIsActive(false);
    }

    inputRef.current.value = '';
    inputRef.current.focus();
  }
  function cancelAddingElement() {
    if (!isActive) return;

    setIsActive(false);
  }

  const icon = props.customIcon ? (props.customIcon) : (
    <FontAwesomeIcon icon={faPlus} />
  );
  const addElementButton = isActive ? null : (
    <StyledAddElementButton
      onClick={startAddingElement}
      $elementType={elementType}
    >
      {icon}&nbsp;&nbsp;
      {strings.addElement}
    </StyledAddElementButton>
  );
  const addElementMenu = isActive ? (
    <>
      <Input
        ref={inputRef}
        type="text"
        placeholder={strings.elementTitle}
        $elementType={elementType}
      />
      <ButtonsContainer $elementType={elementType}>
        <ConfirmButton onClick={confirmAddingElement}>
          {strings.buttonTitle}
        </ConfirmButton>
        <XMark onClick={cancelAddingElement} />
      </ButtonsContainer>
    </>
  ) : null;

  return (
    <OutsideClickHandler onOutsideClick={() => cancelAddingElement()}>
      <AddElementWrapper $isActive={isActive} $elementType={elementType}>
        {addElementButton}
        {addElementMenu}
      </AddElementWrapper>
    </OutsideClickHandler>
  );
}