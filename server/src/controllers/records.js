import Record from '../models/record';
import hasCovid from '../utils/hasCovid';

// ----------------------------------------- handlers
const findAll = async (_request, response, next) => {
  try {
    const records = await Record.find({}).select({ patientId: 1, location: 1, infected: 1 });
    response
      .status(200)
      .json(
        records.map(({ patientId, location, _id, infected }) => ({
          id: _id,
          patientId,
          coords: [location.lng, location.lat],
          infected
        }))
      );
  } catch (error) {
    next(error);
  }
};

const create = async (request, response, next) => {
  try {
    const { patientId, location, temperature, symptomps } = request.body;
    const newRecord = new Record({
      patientId,
      location,
      temperature,
      symptomps,
      infected: hasCovid(temperature, symptomps)
    });
    const created = await newRecord.save();
    response.status(200).json(created);
  } catch (error) {
    next(error);
  }
};

export default { create, findAll };
