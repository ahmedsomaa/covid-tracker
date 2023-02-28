export default function hasCovid(temperature, symptomps) {
  return temperature >= 38 && Object.values(symptomps).reduce((a, b) => a && b, true);
}
