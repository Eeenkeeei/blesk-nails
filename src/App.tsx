import React from 'react';
import './App.css';

const App: React.FC = () => {
  console.log(process.env);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>{process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEVELOPMENT_URL : process.env.REACT_APP_PUBLIC_URL}</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
