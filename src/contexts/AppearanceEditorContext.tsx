import React, { createContext, useContext, ReactNode, useState } from 'react';
import AppearanceEditor, { AppearanceEditorProps } from '../components/AppearanceEditor';
import { BoardColumn, Card } from '../assets/shared/types';

interface AppearanceEditorPassedProps {
  column: BoardColumn;
  card: Card;
}
interface AppearanceEditorContextType {
  openAppearanceEditor: (props: AppearanceEditorPassedProps) => void;
}

const AppearanceEditorContext = createContext<AppearanceEditorContextType | undefined>(undefined);

export function useAppearanceEditor() {
  const context = useContext(AppearanceEditorContext);
  if (!context) {
    throw new Error('useAppearanceEditor must be used within a AppearanceEditorProvider');
  }
  return context;
}

export function AppearanceEditorProvider({ children }: { children: ReactNode }) {
  let modalProps: AppearanceEditorPassedProps | null = null;
  const [isOpen, setIsOpen] = useState(false);

  function openAppearanceEditor(props: AppearanceEditorPassedProps) {
    modalProps = props;
    setIsOpen(true);
  }
  function closeModal() {
    // setModalProps(null);
    setIsOpen(false);
  }
  

  return (
    <AppearanceEditorContext.Provider value={{ openAppearanceEditor }}>
      {/* {modalProps && } */}
      {children}
    </AppearanceEditorContext.Provider>
  );
}