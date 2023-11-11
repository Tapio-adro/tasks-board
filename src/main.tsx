import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './assets/style/styleReset.css';
import './assets/style/style.sass';
import { getInitialBoards } from './assets/scripts/objectsGenerator.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
