import React, { useState } from 'react';

const AddVacancy = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  //const [locationId, setLocationId] = useState('');  
  //const [categoryId, setCategoryId] = useState('');  
  //const [employerId, setEmployerId] = useState(''); 

  const [createdAt, setcreatedid] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVacancy = {
      title,
      description,
      requirements: requirements.split(',').map(req => req.trim()),
     // locationId, 
     // categoryId, 
      //employerId,
      //locationId: locationId || null, 
      //categoryId: categoryId || null, 
     // employerId: employerId || null,
      //createdAt: createdAt || Date.now(),

    };

    
    console.log('Отправляемые данные:', newVacancy); // Лог
    try {
      const response = await fetch('http://localhost:5000/api/vacancies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVacancy),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка на сервере:', errorData);
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    
      const data = await response.json();
      console.log('Вакансия успешно добавлена:', data);
    } catch (error) {
      console.error('Ошибка при добавлении вакансии:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-vacancy-form">
      <h2>Добавить новую вакансию</h2>
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Требования (через запятую):</label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
        />
      </div>
      <button type="submit">Добавить вакансию</button>
      
    </form>
  );
};

export default AddVacancy;