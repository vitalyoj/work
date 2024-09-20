import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VacancyList from "./components/VacancyList";
import Navbar from "./components/Navbar";

function App() {
  return (
  <Router>
      <Navbar />
      <Routes>
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/" element={<VacancyList />} />
      
        <Route path="/students" element={<VacancyList />} />
      
      
        <Route path="/employers" element={<VacancyList />} />
      </Routes>
    </Router>
  );
}

export default App;
