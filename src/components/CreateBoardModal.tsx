import Modal from './Modal';
import styled from 'styled-components';
import { XMark } from '../assets/shared/sharedComponents';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEffect, useRef, useState } from 'react';


const StyledCreateBoardModal = styled.div`
  padding: 14px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: var(--ds-shadow-overlay, 0px 8px 12px #091e4226, 0px 0px 1px #091e424f);
`;
const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #44546f;
  text-align: center;
  flex: 1;
`;
const BoardTitleInput = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 4px;
  margin-bottom: 12px;
  font-size: 14px;
`;
const ConfirmButton = styled.button`
  color: #fff;
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 20px;
  font-weight: 500;
  background-color: #0C66E4;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #0055cc;
  }
`;

interface CreateBoardModalProps {
  headerText: string;
  isOpen: boolean;
  onClose: Function;
  onCreate: Function;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ isOpen, ...props }) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useHotkeys('esc', () => props.onClose());
  useHotkeys('enter', createBoard);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  function createBoard() {
    if (titleInputValue === '') {
      inputRef.current?.focus();
      return;
    }
    props.onCreate(titleInputValue);
    props.onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={props.onClose} isCentered={true}>
      <StyledCreateBoardModal>
        <TitleWrapper>
          <div></div>
          <Title>{props.headerText}</Title>
          <XMark onClick={() => props.onClose()} noMarginLeft={true}/>
        </TitleWrapper>
        <BoardTitleInput 
          type="text" 
          placeholder="Board title"
          value={titleInputValue}
          onChange={(e) => setTitleInputValue(e.target.value)}
          ref={inputRef}
        />
        <ConfirmButton onClick={() => createBoard()}>Create</ConfirmButton>
      </StyledCreateBoardModal>
    </Modal>
  );
}
export default CreateBoardModal;

