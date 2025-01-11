const request = require('supertest');
const app = require('../app');
const { setupDB, teardownDB } = require('./db');


beforeAll(async () => {
  await setupDB();
  jest.setTimeout(80000); 
});

afterAll(async () => {
  await teardownDB();
});

let session;
let taskId;

describe('Task Endpoints', () => {
  it('should render the signup page with a success message', async () => {
    const response = await request(app).post('/auth/signup').send({
      username: 'kasper',
      email: 'kasper@gmail.com',
      password: 'securePassword123',
    });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');
    session = response.headers['set-cookie'];  // Save session for future requests
  });

  it('should create a task and redirect to dashboard', async () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const response = await request(app)
      .post('/tasks')
      .set('Cookie', session)
      .send({ 
        title: 'Test Task', 
        description: 'Test task description',
        due_date: dueDate.toISOString() 
      });
  
      expect(response.status).toBe(302);  
      expect(response.header.location).toBe('/dashboard')

      
  });

   it('should get all tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .set('Cookie', session);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');

  });
  

  it('should update a task and redirect to dashboard', async () => {
    const updatedDueDate = new Date();
    updatedDueDate.setDate(updatedDueDate.getDate() + 7);

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Cookie', session)
      .send({
        title: "Updated Task",
        due_date: updatedDueDate.toISOString(),
      });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');
   
  });

  it("should delete a task and redirect to dashboard", async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}/delete`)
      .set('Cookie', session);

    expect(response.status).toBe(302);
    expect(response.headers['set-cookie'])
    expect(response.header.location).toBe('/dashboard');
  });

  it("should restore the task and redirect to dashboard", async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}/restore`)
      .set('Cookie', session);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');

  });

  it('should delete the task permanently', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}/permanentlyDelete`)
      .set('Cookie', session);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');

    
  });

 
});
