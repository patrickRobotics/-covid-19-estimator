import covid19ImpactEstimator from '../estimator';


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
const result = covid19ImpactEstimator(timeInDaysTestData.data);

console.log(result);
