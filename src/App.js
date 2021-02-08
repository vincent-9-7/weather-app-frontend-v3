import './App.css';
import React from "react";
import NavBar from './components/NavBar/NavBar'
import MainPage from './pages/MainPage'
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */ 

function App() {
  return (
    <>
      <div className="navBar">
        <NavBar />
      </div>

      <div className="main">
        <MainPage />
      </div>
    </>
  );
}

export default App;
