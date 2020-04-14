const normalizeDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'months':
      return timeToElapse * 30;
    case 'weeks':
      return timeToElapse * 7;
    default:
      break;
  }
  return timeToElapse;
};

const computeFactor = (periodType, timeToElapse) => {
  const days = normalizeDays(periodType, timeToElapse);
  return Math.floor(days / 3);
};

const getImpact = (data, isSevere) => {
  const currentlyInfected = isSevere ? data.reportedCases * 50 : data.reportedCases * 10;
  const days = normalizeDays(data.periodType, data.timeToElapse);
  const factor = computeFactor(data.periodType, data.timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(
    data.totalHospitalBeds * 0.35 - severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = Math.trunc(
    (
      data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD
      * infectionsByRequestedTime
    ) / days
  );

  const impact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return impact;
};

const covid19ImpactEstimator = (data) => {
  const impact = getImpact(data);
  const severeImpact = getImpact(data, true);
  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
