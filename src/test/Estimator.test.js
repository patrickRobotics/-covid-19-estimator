import covid19ImpactEstimator from '../estimator';

describe('Covid-19 Estimator', () => {
  const timeInDaysTestData = {
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 3,
        avgDailyIncomePopulation: 0.62
      },
      periodType: 'days',
      timeToElapse: 28,
      reportedCases: 1968,
      population: 5665288,
      totalHospitalBeds: 133318
    },
    estimate: {
      impact: {
        currentlyInfected: 19680,
        infectionsByRequestedTime: 10076160,
        severeCasesByRequestedTime: 1511424,
        hospitalBedsByRequestedTime: -1464762,
        casesForICUByRequestedTime: 503808,
        casesForVentilatorsByRequestedTime: 201523,
        dollarsInFlight: 669344
      },
      severeImpact: {
        currentlyInfected: 98400,
        infectionsByRequestedTime: 50380800,
        severeCasesByRequestedTime: 7557120,
        hospitalBedsByRequestedTime: -7510458,
        casesForICUByRequestedTime: 2519040,
        casesForVentilatorsByRequestedTime: 1007616,
        dollarsInFlight: 3346724
      }
    }
  };

  const timeInWeeksTestData = {
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 3,
        avgDailyIncomePopulation: 0.62
      },
      periodType: 'weeks',
      timeToElapse: 5,
      reportedCases: 2125,
      population: 6602148,
      totalHospitalBeds: 134415
    },
    estimate: {
      impact: {
        currentlyInfected: 21250,
        infectionsByRequestedTime: 43520000,
        severeCasesByRequestedTime: 6528000,
        hospitalBedsByRequestedTime: -6480954,
        casesForICUByRequestedTime: 2176000,
        casesForVentilatorsByRequestedTime: 870400,
        dollarsInFlight: 2312777
      },
      severeImpact: {
        currentlyInfected: 106250,
        infectionsByRequestedTime: 217600000,
        severeCasesByRequestedTime: 32640000,
        hospitalBedsByRequestedTime: -32592954,
        casesForICUByRequestedTime: 10880000,
        casesForVentilatorsByRequestedTime: 4352000,
        dollarsInFlight: 11563885
      }
    }
  };

  const timeInMonthsTestData = {
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 2,
        avgDailyIncomePopulation: 0.7
      },
      periodType: 'months',
      timeToElapse: 3,
      reportedCases: 2015,
      population: 8323658,
      totalHospitalBeds: 109404
    },
    estimate: {
      impact: {
        currentlyInfected: 20150,
        infectionsByRequestedTime: 21635897753600,
        severeCasesByRequestedTime: 3245384663040,
        hospitalBedsByRequestedTime: -3245384624748,
        casesForICUByRequestedTime: 1081794887680,
        casesForVentilatorsByRequestedTime: 432717955072,
        dollarsInFlight: 336558409500
      },
      severeImpact: {
        currentlyInfected: 100750,
        infectionsByRequestedTime: 108179488768000,
        severeCasesByRequestedTime: 16226923315200,
        hospitalBedsByRequestedTime: -16226923276908,
        casesForICUByRequestedTime: 5408974438400,
        casesForVentilatorsByRequestedTime: 2163589775360,
        dollarsInFlight: 1682792047502
      }
    }
  };

  it('Test for time in days', () => {
    const result = covid19ImpactEstimator(timeInDaysTestData.data);
    expect(result.data).toEqual(expect.objectContaining(timeInDaysTestData.data));
    expect(expect.objectContaining(result.impact)).toEqual(
      timeInDaysTestData.estimate.impact
    );
    expect(result.severeImpact).toEqual(
      expect.objectContaining(timeInDaysTestData.estimate.severeImpact)
    );
  });

  it('Test for time in weeks', () => {
    const result = covid19ImpactEstimator(timeInWeeksTestData.data);
    expect(result.data).toEqual(expect.objectContaining(timeInWeeksTestData.data));
    expect(result.impact).toEqual(
      expect.objectContaining(timeInWeeksTestData.estimate.impact)
    );
    expect(result.severeImpact).toEqual(
      expect.objectContaining(timeInWeeksTestData.estimate.severeImpact)
    );
  });

  it('Test for time in months', () => {
    const result = covid19ImpactEstimator(timeInMonthsTestData.data);
    expect(result.data).toEqual(expect.objectContaining(timeInMonthsTestData.data));
    expect(result.impact).toEqual(
      expect.objectContaining(timeInMonthsTestData.estimate.impact)
    );
    expect(result.severeImpact).toEqual(
      expect.objectContaining(timeInMonthsTestData.estimate.severeImpact)
    );
  });
});
