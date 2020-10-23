import React from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>  
        <div class="h3">
        <h3 class="w3-red">Match Cards to Win</h3>
        </div>
      </header>
      <div>
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      </div>
      <div>
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      </div>
      <div>
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      </div>
      <div>
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
      </div>
    
    </div>
  );
}

export default App;
