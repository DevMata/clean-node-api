import request from 'supertest';
import app from '../config/app';

describe('Content Type Middleware', () => {
  it('should return default content type as JSON', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  it('should return xml content type when is forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });

    await request(app).get('/test_content_type_xml').expect('content-type', /xml/);
  });
});
