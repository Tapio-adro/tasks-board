import { ChangeEvent, useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

const TextField = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
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
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.select();
    }
  }, [showInput])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldValueChange(event.target.value)
  }
  
  if (showInput) {
    return (
      <OutsideClickHandler onOutsideClick={() => setShowInput(false)}>
        <StyledInput ref={inputRef} type="text" value={fieldValue} onChange={handleInputChange}/>
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