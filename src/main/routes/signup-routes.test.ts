import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
const { MONGO_URL } = process.env;

describe('SignUp Routes', () => {
  beforeEach(async () => {
    const accountsCollections = MongoHelper.getCollection('accounts');
    await accountsCollections.deleteMany({});
  });

  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL || ' ');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

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
