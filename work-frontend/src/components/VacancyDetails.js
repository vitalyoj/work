import React from 'react';
import AddApplication from './AddApplication';  
import ApplicationList from './ApplicationList'; 
import './AddApplications.css';

function VacancyDetails({ vacancyId }) {
  return (
    <div>
      <h1>Детали вакансии</h1>
      {}
      
      {/* Компонент для подачи заявки */}
      <AddApplication vacancyId={vacancyId} />
      
      {/* Компонент для отображения списка заявок */}
      <ApplicationList vacancyId={vacancyId} />
    </div>
  );
}

export default VacancyDetails;