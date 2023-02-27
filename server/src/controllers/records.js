import Record from '../models/record';
import hasCovid from '../utils/hasCovid';
import { iso1A3Code } from '@ideditor/country-coder';

// ----------------------------------------- handlers
const findAll = async (_request, response, next) => {
  try {
    const records = await Record.aggregate([
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
    records[0].data.sort((a, b) => a._id - b._id);
    records[0].total.sort((a, b) => a._id - b._id);
    response.status(200).json(
      records.map(({ total, data }) =>
        data.map((d, index) => ({
          iso3: d._id,
          cases: d.cases,
          total: total[index].count,
          temperature: parseFloat(d.temperature.toFixed(2)),
          spreadRate: parseFloat(d.cases / total[index].count)
        }))
      )[0]
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
      infected: hasCovid(temperature, symptomps),
      countryCode: iso1A3Code([lng, lat]) || 'NA'
    });
    const created = await newRecord.save();
    response.status(200).json(created);
  } catch (error) {
    next(error);
  }
};

export default { create, findAll };
