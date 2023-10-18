import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

interface BackgroundProps {
  readonly $isOpen: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F1F2F4;
  border-radius: 8px;
`;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: Function;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Background $isOpen={isOpen} onClick={() => onClose()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Background>
  );
};

export default Modal;
