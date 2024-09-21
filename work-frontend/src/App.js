import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VacancyList from "./components/VacancyList";
import Navbar from "./components/Navbar";
import VacanciesPage from './components/VacancyPage';
import SearchResults from './components/SearchResults';
import AddVacancy from './components/AddVacancy';
import VacancyDetails from './components/VacancyDetails';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
  <Router>
      <Navbar />
      <Routes>
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/" />
        <Route path="/findvacancy" element={<VacanciesPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/applications" element={<VacancyDetails />} />
        <Route path="/addvacancy" element={<AddVacancy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
