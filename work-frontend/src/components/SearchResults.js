import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const [vacancies, setVacancies] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get('title');

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch(`/api/vacancies/search?title=${searchTitle}`);
        const data = await response.json();
        setVacancies(data);
      } catch (error) {
        console.error('Ошибка загрузки вакансий:', error);
      }
    };

    if (searchTitle) {
      fetchVacancies();
    }
  }, [searchTitle]);

  return (
    <div>
      <h1>Результаты поиска</h1>
      {vacancies.length > 0 ? (
        <ul>
          {vacancies.map((vacancy) => (
            <li key={vacancy._id}>
              <h3>{vacancy.title}</h3>
              <p>{vacancy.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Вакансий не найдено по запросу "{searchTitle}".</p>
      )}
    </div>
  );
};

export default SearchResults;