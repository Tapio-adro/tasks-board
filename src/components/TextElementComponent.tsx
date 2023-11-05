import React, { useEffect, useRef, useState } from 'react';
import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import { BoardColumn, Card, TextElement } from '../assets/shared/types';
import { useBoardColumnsDispatch } from '../contexts/BoardColumnsContext';
import OutsideClickHandler from 'react-outside-click-handler';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import RenamableField from './RenamableField';
import draftToMarkdown from 'draftjs-to-markdown';


const StyledTextElement = styled.div`
  margin-bottom: 24px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  height: 32px;
  gap: 8px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.colors.titleText};
  width: 100%;
  input, .title {
    font-weight: 500;
    font-size: 18px;
    padding: 4px;
    flex: 1;
  }
  >div:not(.title) {
    flex: 1;
  }
`;
const GreyButton = styled.button`
  color: ${(props) => props.theme.colors.titleText};
  background-color: #091e420f;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    background-color: #091e4224;
  }
`;
const BottomButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  margin-left: 1px;
`;
const ConfirmButton = styled(GreyButton)`
  background-color: #0C66E4;
  font-size: 14px;
  color: #fff;  
  &:hover {
    background-color: #0055cc;
  }
`;
const CancelButton = styled(GreyButton)`
  background-color: transparent;
  font-weight: 600;
`;
const TextContainer = styled.div`
  color: ${(props) => props.theme.colors.titleText};
  cursor: pointer;
  padding: 8px;
`;
const TextPlaceholder = styled.div`
  color: ${(props) => props.theme.colors.titleText};
  padding: 12px;
  font-size: 14px;
  height: 64px;
  border-radius: 4px;
  margin-top: 8px;
  background-color: #091E420F;
  cursor: pointer;
  &:hover {
    background-color: #091e4224;
  }
`;

interface TextElementComponentProps {
  column: BoardColumn;
  card: Card;
  textElement: TextElement;
}

const TextElementComponent: React.FC<TextElementComponentProps> = ({column, card, textElement}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const boardColumnsDispatch = useBoardColumnsDispatch();
  const editorRef = useRef<Editor | null>(null);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    if (textElement.isJustCreated) {
      startEditing();
      editorRef.current?.focusEditor();

      boardColumnsDispatch({
        type: 'disableCardElementJustCreated',
        boardColumn: column,
        card: card,
        element: textElement,
      });
    }
  }, [])
  useEffect(() => {
    editorRef.current?.focusEditor();
  }, [textElement.isEditorActive])

  function startEditing() {
    setEditorActiveness(true);
  }
  function confirmEditing() {
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        
    boardColumnsDispatch({
      type: 'setTextElementText',
      boardColumn: column,
      card: card,
      textElement: textElement,
      newText: text,
    });
    setEditorActiveness(false);
  }
  function cancelEditing() {
    const contentBlocks = htmlToDraft(textElement.text).contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks)
    setEditorState(EditorState.createWithContent(contentState));
    setEditorActiveness(false);
  }
  function setEditorActiveness(isEditorActive: boolean) {
    boardColumnsDispatch({
      type: 'setTextElementEditorActiveness',
      boardColumn: column,
      card: card,
      textElement: textElement,
      isEditorActive: isEditorActive,
    });
  }
  function renameElement(newTitle: string) {
    boardColumnsDispatch({
      type: 'renameCardElement',
      boardColumn: column,
      card: card,
      element: textElement,
      newTitle: newTitle,
    });
  }
  function isTextEmpty() {
    console.log(editorState.getCurrentContent().getPlainText());
    return editorState.getCurrentContent().getPlainText().replace(/^\s*$(?:\r\n?|\n)/gm, '') === '';
  }
  function deleteElement() {
    boardColumnsDispatch({
      type: 'deleteCardElement',
      boardColumn: column,
      card: card,
      element: textElement,
    });
  }
  
  const editor = textElement.isEditorActive ? (
    <>
      <Editor
        ref={editorRef}
        editorState={editorState}
        wrapperClassName="text-editor-wrapper"
        editorClassName="text-editor"
        toolbarClassName="text-editor-toolbar"
        onEditorStateChange={onEditorStateChange}
        toolbar={getEditorToolbarOptions()}
      />
      <BottomButtonsWrapper>
        <ConfirmButton onClick={confirmEditing}>Confirm</ConfirmButton>
        <CancelButton onClick={cancelEditing}>Cancel</CancelButton>
      </BottomButtonsWrapper>
    </>
  ) : null;
  const text = textElement.isEditorActive ? null : (
    <>
      {isTextEmpty() ? (
        <TextPlaceholder onClick={startEditing}>Add some text</TextPlaceholder>
      ) : (
        <TextContainer onClick={startEditing}>
          <div dangerouslySetInnerHTML={{ __html: textElement.text }} />
        </TextContainer>
      )}
    </>
  );

  return (
    <>
      <OutsideClickHandler onOutsideClick={confirmEditing}>
        <StyledTextElement>
          <TitleWrapper>
            <Title>
              <RenamableField 
                fieldValue={textElement.title}
                onFieldValueChange={renameElement}
              />
            </Title>
            {!textElement.isEditorActive ? (
              <GreyButton onClick={startEditing}>Edit</GreyButton>
            ) : (<GreyButton onClick={deleteElement}>Delete</GreyButton>)}
          </TitleWrapper>
          {editor}
          {text}
        </StyledTextElement>
      </OutsideClickHandler>
    </>
  );
};

export default TextElementComponent;

function getEditorToolbarOptions() {
  return {
    options: ['inline', 'blockType', 'list'],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['bold', 'italic', 'underline', 'strikethrough'],
      // bold: { icon: 'bold', className: undefined },
      // italic: { icon: 'italic', className: undefined },
      // underline: { icon: 'underline', className: undefined },
      // strikethrough: { icon: 'strikethrough', className: undefined },
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    list: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['unordered', 'ordered'],
    },
    // textAlign: {
    //   inDropdown: false,
    //   className: undefined,
    //   component: undefined,
    //   dropdownClassName: undefined,
    //   options: ['left', 'center', 'right', 'justify'],
    //   left: { icon: 'left', className: undefined },
    //   center: { icon: 'center', className: undefined },
    //   right: { icon: 'right', className: undefined },
    //   justify: { icon: 'justify', className: undefined },
    // },
    // colorPicker: {
    //   icon: 'color',
    //   className: undefined,
    //   component: undefined,
    //   popupClassName: undefined,
    //   colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
    //     'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
    //     'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
    //     'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
    //     'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
    //     'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    // },
    // link: {
    //   inDropdown: false,
    //   className: undefined,
    //   component: undefined,
    //   popupClassName: undefined,
    //   dropdownClassName: undefined,
    //   showOpenOptionOnHover: true,
    //   defaultTargetOption: '_self',
    //   options: ['link', 'unlink'],
    //   link: { icon: 'link', className: undefined },
    //   unlink: { icon: 'unlink', className: undefined },
    //   linkCallback: undefined
    // },
    // emoji: {
    //   icon: 'emoji',
    //   className: undefined,
    //   component: undefined,
    //   popupClassName: undefined,
    //   emojis: [
    //     '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
    //     '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
    //     '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
    //     '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
    //     '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
    //     '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
    //     '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
    //     '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
    //     '✅', '❎', '💯',
    //   ],
    // },
    // embedded: {
    //   icon: 'embedded',
    //   className: undefined,
    //   component: undefined,
    //   popupClassName: undefined,
    //   embedCallback: undefined,
    //   defaultSize: {
    //     height: 'auto',
    //     width: 'auto',
    //   },
    // },
    // image: {
    //   icon: 'image',
    //   className: undefined,
    //   component: undefined,
    //   popupClassName: undefined,
    //   urlEnabled: true,
    //   uploadEnabled: true,
    //   alignmentEnabled: true,
    //   uploadCallback: undefined,
    //   previewImage: false,
    //   inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    //   alt: { present: false, mandatory: false },
    //   defaultSize: {
    //     height: 'auto',
    //     width: 'auto',
    //   },
    // },
    // remove: { icon: 'eraser', className: undefined, component: undefined },
    // history: {
    //   inDropdown: false,
    //   className: undefined,
    //   component: undefined,
    //   dropdownClassName: undefined,
    //   options: ['undo', 'redo'],
    //   undo: { icon: 'undo', className: undefined },
    //   redo: { icon: 'redo', className: undefined },
    // },
  }
}