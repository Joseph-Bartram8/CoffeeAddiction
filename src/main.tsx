import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import './index.css';

const Main: React.FC = () => {
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

// Render the Main component into the #root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
