import React, { ReactNode } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { BoardColumn, Card } from '../assets/shared/types';

const StyledEditor = styled.div`
  padding: 20px;
  width: 768px;
`;

export interface AppearanceEditorProps {
  boardColumn: BoardColumn;
  card: Card;
  showModal: boolean;
  onClose: Function;
}

const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ boardColumn, card }) => {
  return (
    <Modal>
      <StyledEditor>
        {card.title}
      </StyledEditor>
    </Modal>
  );
};

export default AppearanceEditor;