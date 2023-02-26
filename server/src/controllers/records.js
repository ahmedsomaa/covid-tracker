import Record from '../models/record';
import hasCovid from '../utils/hasCovid';
import { iso1A3Code } from '@ideditor/country-coder';

// ----------------------------------------- handlers
const findAll = async (_request, response, next) => {
  try {
    const records = await Record.aggregate([
      {
        $match: {
          infected: {
            $eq: true
          }
        }
      },
      {
        $group: {
          _id: '$countryCode',
          cases: { $sum: 1 },
          temperature: { $avg: '$temperature' }
        }
      }
    ]);
    response
      .status(200)
      .json(
        records.map(({ _id, temperature, ...rest }) => ({
          iso3: _id,
          temperature: parseFloat(temperature.toFixed(2)),
          ...rest
        }))
      );
  } catch (error) {
    next(error);
  }
};

const create = async (request, response, next) => {
  try {
    const { patientId, location, temperature, symptomps } = request.body;
    const { lng, lat } = location;
    const newRecord = new Record({
      patientId,
      location,
      temperature,
      symptomps,
      countryCode: iso1A3Code([lng, lat]) || 'NA',
      infected: hasCovid(temperature, symptomps)
    });
    const created = await newRecord.save();
    response.status(200).json(created);
  } catch (error) {
    next(error);
  }
};

export default { create, findAll };
