import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

interface BackgroundProps {
  readonly $isOpen: boolean;
  readonly $transparentBackground: boolean;
  readonly $isCentered: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: flex;
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
  return (
    <Background
      $isCentered={isCentered}
      $isOpen={isOpen}
      onClick={() => onClose()}
      $transparentBackground={transparentBackground}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Background>
  );
};

export default Modal;
