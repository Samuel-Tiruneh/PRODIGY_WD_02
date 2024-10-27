import React, { useState } from 'react';
import './App.css';
import Stopwatch from './components/Stopwatch';

const App = () => {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <span className="typewriter" id="typewriter">Stopwatch ⏱️</span>
        </h1>
      </header>
      <Stopwatch />
    </div>
  );
}

export default App;
