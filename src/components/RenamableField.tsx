import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import OutsideClickHandler from 'react-outside-click-handler';
import styled, { css } from 'styled-components';


interface TextFieldProps {
  readonly $showOnClick: boolean;
}

const TextField = styled.div<TextFieldProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  ${props => !props.$showOnClick && css`
    /* cursor: auto; */
  `};
`;
const StyledInput = styled.input`
  width: 100%;
`;

export type RenamableFieldHandle = {
  toggleTextInput: () => void;
  toggleOutsideClick: (shouldDisable: boolean) => void;
};
type RenamableFieldProps = {
  fieldValue: string;
  onFieldValueChange: Function;
  showOnClick?: boolean;
};

const RenamableField = forwardRef<RenamableFieldHandle, RenamableFieldProps>((
    {fieldValue, onFieldValueChange, showOnClick = true}, ref
  ) => {
  const [showInput, setShowInput] = useState(false);
  const [outsideClickEnabled, setOutsideClickEnabled] = useState(true);
  const [localFieldValue, setLocalFieldValue] = useState<string>(fieldValue);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    toggleTextInput() {
      if (!showInput) {
        setShowInput(true);
      } else {
        checkChange();
      }
    },
    toggleOutsideClick
  }));

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.select();
    }
  }, [showInput])

  useHotkeys('enter', checkChange, {enableOnFormTags: true})
  useHotkeys('esc', CancelChange, {enableOnFormTags: true})


  function handleLocalChange(event: ChangeEvent<HTMLInputElement>) {
    setLocalFieldValue(event.target.value)
  }
  function ConfirmChange() {
    onFieldValueChange(localFieldValue)
  }
  function checkChange() {
    if (localFieldValue != '') {
      ConfirmChange()
      setShowInput(false)
    } else {
      CancelChange()
    }
  }
  function CancelChange() {
    setLocalFieldValue(fieldValue)
    setShowInput(false)
  }
  function showTextInput() {
    if (showOnClick) {
      setShowInput(true)
    }
  }
  function toggleOutsideClick(shouldDisable: boolean) {
    if (showOnClick) return;

    setOutsideClickEnabled(!shouldDisable) 
  }
  
  if (showInput) {
    return (
      <OutsideClickHandler 
        onOutsideClick={checkChange}
        disabled={!outsideClickEnabled}
      >
        <StyledInput ref={inputRef} type="text" value={localFieldValue} onChange={handleLocalChange}/>
      </OutsideClickHandler>
    )
  } else {
    return (
      <TextField
        $showOnClick={showOnClick}
        className="title"
        onClick={showTextInput}
      >
        {fieldValue}
      </TextField>
    );
  }
})
export default RenamableField