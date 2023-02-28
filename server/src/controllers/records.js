import Record from '../models/record';
import hasCovid from '../utils/hasCovid';
import { iso1A3Code } from '@ideditor/country-coder';

// ----------------------------------------- handlers
const findAll = async (_request, response, next) => {
  try {
    const docs = await Record.aggregate([
      {
        $facet: {
          total: [
            {
              $group: {
                _id: '$countryCode',
                count: {
                  $count: {}
                }
              }
            }
          ],
          data: [
            {
              $match: {
                infected: true
              }
            },
            {
              $group: {
                _id: '$countryCode',
                cases: {
                  $sum: 1
                },
                temperature: {
                  $avg: '$temperature'
                }
              }
            }
          ]
        }
      }
    ]);

    const { total, data } = docs[0];
    const filteredData = data.filter((d) => d._id !== 'NA');
    const filteredTotal = total.filter((t) => t._id !== 'NA');
    const records = filteredTotal.map((t) => {
      const r = filteredData.find((d) => d._id === t._id);
      return (
        r && {
          iso3: r._id,
          temperature: r.temperature,
          cases: r.cases,
          total: t.count,
          spreadRate: parseFloat(r.cases / t.count)
        }
      );
    });
    response.status(200).json(records.filter((r) => r != null && r !== undefined && r !== ''));
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
      infected: hasCovid(temperature, symptomps),
      countryCode: iso1A3Code([location.lng, location.lat]) || 'NA'
    });
    const created = await newRecord.save();
    response.status(200).json(created);
  } catch (error) {
    next(error);
  }
};

export default { create, findAll };
