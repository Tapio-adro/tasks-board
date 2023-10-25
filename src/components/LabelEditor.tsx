import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useBoardData, useBoardDataDispatch } from '../contexts/BoardDataContext';
import { Label } from '../assets/shared/types';
import Modal from './Modal';
import { getInitialLabel } from '../assets/scripts/objectsGenerator';
import { useHotkeys } from 'react-hotkeys-hook';


interface ColorButtonProps {
  readonly $color: string;
  readonly $isActive: boolean;
}

const StyledLabelEditor = styled.div`
  padding: 14px;
  width: 300px;
`;
const EditorTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleText};
  text-align: center;
`;
const ColorButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;
const ColorButton = styled.button<ColorButtonProps>`
  background-color: ${props => props.$color};
  height: 35px;
  border-radius: 4px;
  &:hover {
    filter: saturate(85%) brightness(85%);
  }
  ${props => props.$isActive && css`
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #388bff;
  `};
`;


export interface LabelEditorProps {
  mode: 'create' | 'edit';
  label: Label;
  isOpen: boolean;
  onClose: Function;
};


const LabelEditor: React.FC<LabelEditorProps> = ({
  mode,
  label,
  isOpen,
  ...props
}) => {  
  const [title, setTitle] = useState(label?.title || '');
  const [color, setColor] = useState(label?.color || '');
  const [colors] = useState([
    '#4BCE97', '#F5CD47', '#faa53d', '#f87462', '#9f8fef', 
    '#579dff', '#60c6d2', '#94C748', '#e774bb', '#8590a2',
  ]);

  const boardData = useBoardData();
  const dispatch = useBoardDataDispatch();
  
  useHotkeys('esc', () => props.onClose());

  return (
    <Modal 
      onClose={props.onClose}
      isOpen={isOpen}
    >
      <StyledLabelEditor>
        <EditorTitle>
          {mode === 'create' ? 'Create Label' : 'Edit Label'}
        </EditorTitle>
      </StyledLabelEditor>
    </Modal>
  );
};

export default LabelEditor;



