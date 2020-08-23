import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';
const { MONGO_URL } = process.env;

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('Account Mongo Repository', () => {
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

  it('should return an account on success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@email.com');
    expect(account.password).toBe('any_password');
  });
});
