import './App.css';

import Header from './Components/Header'

function App() {
  return (
    <div className="app">

      <Header title="Brett's Test" />

      <main className="app-main">
        <h1>Main Event</h1>
        This is the main section
      </main>
      
      <footer className="app-footer">
        This is the footer section
      </footer>
    </div>
  );
}

export default App;
