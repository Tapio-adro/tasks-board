import Modal from './Modal';
import styled from 'styled-components';
import { XMark } from '../assets/shared/sharedComponents';
import { useHotkeys } from 'react-hotkeys-hook';


const StyledDeleteModal = styled.div`
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
const Text = styled.div`
  color: #172b4d;
  font-weight: 400;
  margin: 12px 0px 12px;
`;
const DeleteButton = styled.button`
  color: #fff;
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 20px;
  font-weight: 500;
  background-color: #C9372C;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #ae2a19;
  }
`;

interface DeleteModalProps {
  headerText: string;
  descriptionText: string;
  isOpen: boolean;
  onClose: Function;
  onDelete: Function;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, ...props }) => {
  useHotkeys('esc', () => props.onClose());
  useHotkeys('enter', () => props.onDelete());

  return (
    <Modal isOpen={isOpen} onClose={props.onClose} isCentered={true}>
      <StyledDeleteModal>
        <TitleWrapper>
          <div></div>
          <Title>{props.headerText}</Title>
          <XMark onClick={() => props.onClose()} noMarginLeft={true}/>
        </TitleWrapper>
        <Text>{props.descriptionText}</Text>
        <DeleteButton onClick={() => props.onDelete()}>Delete</DeleteButton>
      </StyledDeleteModal>
    </Modal>
  );
}
export default DeleteModal;

