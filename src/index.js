import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import About from './pages/About.js'
import Layout from './pages/Layout.js'
import './styles/index.css'

const App = () => {
  return (
    <BrowserRouter>

      {/* Due to routing errors when deploying the app on github pages, must specify the route paths as project-name/ */}
      <Routes>
        <Route path="bible-verse-imgify/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/bible-verse-imgify/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);