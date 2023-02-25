import app from '../index';
import supertest from 'supertest';
import Record from '../models/record';

const request = supertest(app);

// sample user record
const record = {
  patientId: 'auth0|123',
  temperature: 38.5,
  location: {
    lng: 23.45,
    lat: 25.5
  },
  symptomps: {
    fatigue: true,
    cough: true,
    sore: true,
    headaches: true,
    nose: true,
    breath: true,
    body: true,
    smell: true,
    sneeze: true,
    itchy: true
  }
};

describe('-- Records Controller Test Suite', () => {
  afterAll(async () => {
    await Record.remove({ patientId: record.patientId });
  });

  describe('--- GET /records', () => {
    it('should return all records', async () => {
      const { status, body } = await request.get('/records');
      expect(status).toBe(200);
      expect(body.length).toBe(1);
    });
  });

  describe('--- POST /records', () => {
    it('should create new record', async () => {
      const { status, body } = await request
        .post('/records')
        .set('Content-type', 'application/json')
        .send(record);
      expect(status).toBe(200);
      expect(body.patientId).toBe('auth0|123');
    });
  });
});
