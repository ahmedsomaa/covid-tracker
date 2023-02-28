import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    location: {
      lat: { type: Number, required: true, min: -90, max: 90 },
      lng: { type: Number, required: true, min: -180, max: 180 }
    },
    countryCode: { type: String, required: true },
    temperature: { type: Number, required: true, min: 9, max: 42 },
    symptomps: {
      fatigue: { type: Boolean, required: true },
      cough: { type: Boolean, required: true },
      sore: { type: Boolean, required: true },
      headaches: { type: Boolean, required: true },
      nose: { type: Boolean, required: true },
      breath: { type: Boolean, required: true },
      body: { type: Boolean, required: true },
      smell: { type: Boolean, required: true },
      diarrhea: { type: Boolean, required: true },
      vomiting: { type: Boolean, required: true }
    },
    infected: { type: Boolean, default: false, required: true }
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

export default Record;
