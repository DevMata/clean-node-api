import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: {} as MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(collection: any): any {
    const { _id: id, ...rest } = collection;
    return { id, ...rest };
  },
};
