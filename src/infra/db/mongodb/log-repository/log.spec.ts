import { MongoHelper } from '../helpers/mongo-helper';
import { Collection } from 'mongodb';
import { LoginMongoRepository } from './log';

const { MONGO_URL } = process.env;

const makeSut = (): LoginMongoRepository => {
  return new LoginMongoRepository();
};

describe('Log Mongo Repository', () => {
  let errorCollection: Collection;

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL || ' ');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorCollection.countDocuments();

    expect(count).toBe(1);
  });
});
