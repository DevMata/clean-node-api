import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
  it('should returns an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Antonio',
        email: 'antonio@email.com',
        password: 'secret_password',
        passwordConfirmation: 'secret_password',
      })
      .expect(200);
  });
});
