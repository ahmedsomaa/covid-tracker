import hasCovid from './hasCovid';

describe('-- hasCovid utility Function Test Suite', () => {
  it('should return true for infected users', () => {
    expect(
      hasCovid(40, {
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
      })
    ).toBeTruthy();
  });
  it('should return false for un-infected users', () => {
    expect(
      hasCovid(37, {
        fatigue: false,
        cough: true,
        sore: true,
        headaches: false,
        nose: true,
        breath: true,
        body: true,
        smell: false,
        sneeze: true,
        itchy: true
      })
    ).toBeFalsy();
  });
});
