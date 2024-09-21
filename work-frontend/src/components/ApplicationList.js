import React, { useState, useEffect } from 'react';

function ApplicationList({ vacancyId }) {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications?vacancyId=${vacancyId}`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          setApplications([]); 
        }
      } catch (err) {
        setError('Ошибка при загрузке заявок');
      }
    };

    fetchApplications();
  }, [vacancyId]);

  return (
    <div>
      <h2>Заявки на вакансию</h2>
      {error && <p>{error}</p>}
      {applications.length === 0 ? (
        <p>Заявок пока нет.</p>
      ) : (
        <ul>
          {applications.map(application => (
            <li key={application._id}>{application.name} - {application.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApplicationList;