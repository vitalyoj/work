import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VacancySearch = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Перенаправляем на страницу с результатами поиска
    navigate(`/search-results?title=${title}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label>Название вакансии:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type="submit">Поиск</button>
    </form>
  );
};

export default VacancySearch;