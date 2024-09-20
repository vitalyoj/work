import React, { useState, useEffect } from "react";
import axios from "axios";
import './VacancyList.css';
import AddVacancy from './AddVacancy';

const VacancyList = () => {
  // Инициализация состояния для списка вакансий
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Используем useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vacancies');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();

        // Проверяем, является ли data массивом
        if (Array.isArray(data)) {
          setVacancies(data);  // Устанавливаем данные
        } else {
          setError('Неверный формат данных');
        }
      } catch (error) {
        setError(error.message);  // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false);  // Отключаем режим загрузки
      }
    };

    fetchVacancies();
  }, []);

 const handleAddVacancy = (newVacancy) => {
    setVacancies([...vacancies, newVacancy]); // Добавляем новую вакансию в список
  };

  const handleDeleteVacancy = async (id) => {
    await fetch(`http://localhost:5000/api/vacancies/${id}`, {
      method: 'DELETE',
    });
    setVacancies(vacancies.filter(vacancy => vacancy._id !== id)); // Удаляем вакансию из списка
  };

  if (loading) return <p>Загрузка вакансий...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="vacancy-list">
      <h1>Список вакансий</h1>
      <AddVacancy onAdd={handleAddVacancy} /> {/* Добавляем форму для добавления вакансий */}
      {vacancies.length > 0 ? (
        vacancies.map(vacancy => (
          <div key={vacancy._id} className="vacancy-card">
            <h2>{vacancy.title}</h2>
            <p>{vacancy.description}</p>
            <p><strong>Требования:</strong> {vacancy.requirements.join(', ')}</p>
            <button onClick={() => handleDeleteVacancy(vacancy._id)}>Удалить</button> {/* Кнопка удаления */}
          </div>
        ))
      ) : (
        <p>Нет доступных вакансий</p>
      )}
    </div>
  );
};

export default VacancyList;