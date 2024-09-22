import React, { useState } from 'react';
import VacancyList from '../components/VacancyList';
import VacancySearch from '../components/VacancySearch';
import './vacpage.css'; 

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  

  const handleSearch = (data) => {
    setVacancies(data);
  };

  return (
    <div className="vacancies-page">
      <h1>Поиск вакансий</h1>
      <div className="search-container">
        <VacancySearch onSearch={handleSearch} />
      </div>
      <div className="vacancy-list">
        {vacancies.map((vacancy) => (
          <div key={vacancy._id} className="vacancy-item">
            <h2>{vacancy.title}</h2>
            <p>{vacancy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacanciesPage;