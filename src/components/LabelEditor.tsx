import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBoardData, useBoardDataDispatch } from '../contexts/BoardDataContext';
import { Label } from '../assets/shared/types';
import Modal from './Modal';
import { getInitialLabel } from '../assets/scripts/objectsGenerator';
import { useHotkeys } from 'react-hotkeys-hook';
import { IconButton, XMark } from '../assets/shared/sharedComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';



interface ColorButtonProps {
  readonly $color: string;
  readonly $isActive: boolean;
}

const StyledLabelEditor = styled.div`
  padding: 14px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: var(--ds-shadow-overlay, 0px 8px 12px #091e4226, 0px 0px 1px #091e424f);
`;
const EditorTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
`;
const EditorTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #44546f;
  text-align: center;
  flex: 1;
`;
const LabelTitleInput = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 4px;
  margin-bottom: 12px;
`;
const ColorButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 8px;
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
const BottomButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ConfirmButton = styled.button`
  color: #fff;
  background-color: #0C66E4;
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 20px;
  font-weight: 500;
  &:hover {
    background-color: #0055cc;
  }
`;
const DeleteButton = styled(ConfirmButton)`
  background-color: #C9372C;
  &:hover {
    background-color: #ae2a19;
  }
`;
const DeleteConfirmationText = styled.div`
  color: #172b4d;
  font-weight: 400;
  margin: 12px 0px 12px;
`;
const DeleteConfirmationButton = styled(DeleteButton)`
  width: 100%;
  text-align: center;
`;


export type LabelEditorMode = 'create' | 'edit';
export interface LabelEditorProps {
  editorMode: LabelEditorMode;
  labelId: string;
  isOpen: boolean;
  onClose: Function;
};

const LabelEditor: React.FC<LabelEditorProps> = ({
  editorMode,
  labelId,
  isOpen,
  ...props
}) => {  
  const [colors] = useState([
    '#4BCE97', '#F5CD47', '#faa53d', '#f87462', '#9f8fef', 
    '#579dff', '#60c6d2', '#94C748', '#e774bb', '#8590a2',
  ]);
  const [labelTitle, setLabelTitle] = useState('');
  const [labelColor, setLabelColor] = useState(colors[0]);
  const [currentLabel, setCurrentLabel] = useState(getInitialLabel());
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);

  const boardData = useBoardData();
  const boardDataDispatch = useBoardDataDispatch();
  const boardColumnsDispatch = useBoardColumnsDispatch();

  useEffect(() => {
    if (editorMode === 'edit') {
      const label = boardData?.labels.find((label) => label.id === labelId);
      if (label) {
        setCurrentLabel(label);
        setLabelTitle(label.title);
        setLabelColor(label.color);
      }
    } else if (editorMode === 'create') {
      setCurrentLabel(getInitialLabel());
    }
    inputRef.current?.focus();
  }, []);
  
  useHotkeys('esc', () => props.onClose(), {enableOnFormTags: true});
  useHotkeys('enter', () => handleConfirmButtonClick(), {enableOnFormTags: true});

  function createLabel() {
    boardDataDispatch({ 
      type: 'createLabel',
      title: labelTitle,
      color: labelColor,
    });
    props.onClose();
  }
  function handleLabelInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (editorMode === 'create') {
      setLabelTitle(event.target.value);
    } else if (editorMode === 'edit') {
      setLabelTitle(event.target.value);
    }
  }
  function handleColorButtonClick(color: string) {
    if (editorMode === 'create') {
      setLabelColor(color);
    } else if (editorMode === 'edit') {
      setLabelColor(color);
    }
  }
  function handleConfirmButtonClick() {
    if (editorMode === 'create') {
      createLabel();
    } else if (editorMode === 'edit') {
      boardDataDispatch({
        type: 'renameLabel',
        label: currentLabel,
        newTitle: labelTitle,
      });
      boardDataDispatch({
        type: 'changeLabelColor',
        label: currentLabel,
        newColor: labelColor,
      });
      props.onClose();
    }
  }
  function handleDeleteConfirmation() {
    setIsConfirmingDeletion(false);
    props.onClose();
    boardColumnsDispatch({
      type: 'removeLabelFromAllCards',
      label: currentLabel,
    });
    boardDataDispatch({
      type: 'deleteLabel',
      label: currentLabel,
    });
  }
  
  const colorButtons = boardData?.backgroundColors.map((color) => {
    return (
      <ColorButton
        key={color}
        $color={color}
        $isActive={labelColor == color}
        onClick={() => handleColorButtonClick(color)}
      />
    );
  });

  return (
    <Modal
      onClose={props.onClose}
      isOpen={isOpen}
      transparentBackground={true}
      isCentered={true}
    >
      <StyledLabelEditor>
        <EditorTitleWrapper>
          {isConfirmingDeletion ? (
            <IconButton onClick={() => setIsConfirmingDeletion(false)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </IconButton>
          ) : <div></div>}
          <EditorTitle>
            {isConfirmingDeletion
              ? 'Delete label'
              : editorMode === 'create'
              ? 'Create label'
              : 'Edit label'}
          </EditorTitle>
          <XMark onClick={() => props.onClose()}
            noMarginLeft={true}
          />
        </EditorTitleWrapper>
        {!isConfirmingDeletion ? (
          <>
            <LabelTitleInput
              type="text"
              value={labelTitle}
              onChange={handleLabelInputChange}
              placeholder="Label title"
              ref={inputRef}
            />
            <ColorButtonsContainer>{colorButtons}</ColorButtonsContainer>
            <BottomButtonsContainer>
              <ConfirmButton onClick={handleConfirmButtonClick}>
                {editorMode === 'create' ? 'Create' : 'Save'}
              </ConfirmButton>
              {editorMode == 'edit' && (
                <DeleteButton onClick={() => setIsConfirmingDeletion(true)}>
                  Delete
                </DeleteButton>
              )}
            </BottomButtonsContainer>
          </>
        ) : (
          <>
            <DeleteConfirmationText>
              The label will be removed from all cards. This action cannot be undone.
            </DeleteConfirmationText>
            <DeleteConfirmationButton onClick={handleDeleteConfirmation}>
              Delete
            </DeleteConfirmationButton>
          </>
        )}
      </StyledLabelEditor>
    </Modal>
  );
};

export default LabelEditor;

