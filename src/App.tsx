import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {MainPage} from "./components/MainPage";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <MainPage/>
      </BrowserRouter>
  );
};

export default App;
