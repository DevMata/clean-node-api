import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await require('./config/app')).default;
    app.listen(env.port, () => console.log(`API listens to port ${env.port}`));
  })
  .catch(console.error);
