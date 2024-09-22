import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user-role');
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Ошибка при получении роли пользователя:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Job Platform</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/vacancies">Вакансии</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/findvacancy">Поиск вакансий</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/addvacancy">Добавить вакансию</Link>
            </li>
              
            <li className="nav-item">
              <Link className="nav-link" to="/applications">Заявки</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Логин</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Регистрация</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;