const request = require('supertest');
const app = require('./work-frontend');

describe('API Tests', () => {
  let userId;

  beforeAll(async () => {

    const userResponse = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });
    
    userId = userResponse.body._id;
  });

  afterAll(async () => {

    await request(app).delete(`/api/users/${userId}`);
  });

  test('Создание вакансии - успешный сценарий', async () => {
    const response = await request(app)
      .post('/api/vacancies')
      .send({
        title: 'Frontend Developer',
        description: 'Разработка интерфейсов',
        requirements: ['React', 'JavaScript'],
        employerId: userId,
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Frontend Developer');
  });

  test('Создание вакансии - ошибка валидации', async () => {
    const response = await request(app)
      .post('/api/vacancies')
      .send({
        title: '',
        description: 'Разработка интерфейсов',
        requirements: ['React', 'JavaScript'],
        employerId: userId,
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Все поля обязательны.');
  });

  test('Получение всех вакансий - успешный сценарий', async () => {
    const response = await request(app)
      .get('/api/vacancies');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Поиск вакансии по названию - успешный сценарий', async () => {
    const response = await request(app)
      .get('/api/vacancies/search?title=Frontend');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Подать заявку на вакансию - успешный сценарий', async () => {
    const vacancyResponse = await request(app)
      .post('/api/vacancies')
      .send({
        title: 'Backend Developer',
        description: 'Разработка серверной части',
        requirements: ['Node.js', 'Express'],
        employerId: userId,
      });

    const applicationResponse = await request(app)
      .post('/api/applications')
      .send({
        name: 'Applicant',
        email: 'applicant@example.com',
        coverLetter: 'Я хочу работать здесь',
        vacancyId: vacancyResponse.body._id,
      });

    expect(applicationResponse.statusCode).toBe(201);
    expect(applicationResponse.body).toHaveProperty('_id');
  });

  test('Ошибка при подаче заявки на вакансию - отсутствие полей', async () => {
    const response = await request(app)
      .post('/api/applications')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Все поля обязательны.');
  });

  test('Получение заявок - успешный сценарий', async () => {
    const response = await request(app)
      .get('/api/applications');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});