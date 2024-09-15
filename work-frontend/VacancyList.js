import React, { useState, useEffect } from "react";
import axios from "axios";

const VacancyList = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    axios.get("/api/vacancies")
      .then(res => setVacancies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Vacancies</h1>
      <ul>
        {vacancies.map(vacancy => (
          <li key={vacancy._id}>
            <h3>{vacancy.title}</h3>
            <p>{vacancy.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VacancyList;