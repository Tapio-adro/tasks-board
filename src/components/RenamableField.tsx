import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

const TextField = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
`;
const StyledInput = styled.input`
  width: 100%;
`;

export default function RenamableField({
  fieldValue,
  onFieldValueChange,
}: {
  fieldValue: string;
  onFieldValueChange: Function
}){
  const [showInput, setShowInput] = useState(false);
  const [localFieldValue, setLocalFieldValue] = useState<string>(fieldValue);
  
  const inputRef = useRef<HTMLInputElement>(null);

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
  
  if (showInput) {
    return (
      <OutsideClickHandler onOutsideClick={checkChange}>
        <StyledInput ref={inputRef} type="text" value={localFieldValue} onChange={handleLocalChange}/>
      </OutsideClickHandler>
    )
  } else {
    return (
      <TextField className='title' onClick={() => setShowInput(true)}>
        {fieldValue}
      </TextField>
    )
  }
}