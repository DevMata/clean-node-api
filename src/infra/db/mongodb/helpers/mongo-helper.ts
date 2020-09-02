import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: {} as MongoClient,
  uri: '',

  async connect(url: string): Promise<void> {
    this.uri = url;
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = {} as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected || !this.client.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map(collection: any): any {
    const { _id: id, ...rest } = collection;
    return { id, ...rest };
  },
};
