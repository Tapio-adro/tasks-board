import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

interface BackgroundProps {
  readonly $isOpen: boolean;
  readonly $transparentBackground: boolean;
  readonly $isCentered: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: auto;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 0 50px;
  ${(props) =>
    props.$transparentBackground &&
    css`
      /* background-color: transparent; */
    `};
  ${(props) => props.$isCentered && css`
    align-items: center;
  `};
`;
const ModalContent = styled.div`
  /* overflow: visible; */
  /* position: fixed; */
  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
`;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: Function;
  transparentBackground?: boolean;
  isCentered?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  transparentBackground = false,
  isCentered = false,
}) => {
  return ReactDOM.createPortal(
    <Background
      $isCentered={isCentered}
      $isOpen={isOpen}
      onMouseDown={() => onClose()}
      $transparentBackground={transparentBackground}
    >
      <ModalContent onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Background>,
    document.getElementById('root') as HTMLElement
  );
};

export default Modal;
