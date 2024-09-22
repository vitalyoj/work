import React, { useState } from 'react';
import './AddApplications.css';

function ApplyForm({ vacancyId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      name,
      email,
      coverLetter,
      vacancyId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });

      if (response.ok) {
        setMessage('Заявка успешно подана!');
        setName('');
        setEmail('');
        setCoverLetter('');
      } else {
        setMessage('Ошибка при подаче заявки');
      }
    } catch (error) {
      setMessage('Ошибка на сервере');
    }
  };

  return (
    <div>
      <h2>Подать заявку</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Сопроводительное письмо:</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        <button type="submit">Отправить заявку</button>
      </form>
    </div>
  );
}

export default ApplyForm;