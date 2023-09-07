import { ChangeEvent, useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

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
      <>
      <OutsideClickHandler onOutsideClick={() => setShowInput(false)}>
        <input ref={inputRef} type="text" value={fieldValue} onChange={handleInputChange}/>
      </OutsideClickHandler>
      </>
    )
  } else {
    return (<div className='title' onClick={() => setShowInput(true)}>{fieldValue}</div>)
  }
}