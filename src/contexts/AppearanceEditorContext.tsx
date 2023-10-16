import React, { createContext, useContext, ReactNode, useState } from 'react';
import AppearanceEditor, { AppearanceEditorProps } from '../components/AppearanceEditor';

interface AppearanceEditorContextType {
  openAppearanceEditor: (props?: AppearanceEditorProps) => void;
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
  const [modalProps, setModalProps] = useState<AppearanceEditorProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  function openAppearanceEditor(props?: AppearanceEditorProps) {
    if (!props) return;
    setModalProps(props);
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }
  

  return (
    <AppearanceEditorContext.Provider value={{ openAppearanceEditor }}>
      {children}
      {modalProps && <AppearanceEditor {...modalProps} showModal={showModal} onClose={closeModal} />}
    </AppearanceEditorContext.Provider>
  );
}