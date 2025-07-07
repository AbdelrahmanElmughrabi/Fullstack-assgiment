// main.tsx
// React application entry point. Mounts the App component to the DOM and imports global styles.

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
