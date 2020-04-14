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

const computeImpact = (data) => {
  const currentlyInfected = data.reportedCases * 10;
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

const computeSevereImpact = (data) => {
  const currentlyInfected = data.reportedCases * 50;
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

  const severeImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return severeImpact;
};

const covid19ImpactEstimator = (data) => {
  const impactData = computeImpact(data);
  const severeImpactData = computeSevereImpact(data);
  return {
    data,
    impact: {
      currentlyInfected: impactData.currentlyInfected,
      infectionsByRequestedTime: impactData.infectionsByRequestedTime,
      severeCasesByRequestedTime: impactData.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactData.hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactData.casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactData.casesForVentilatorsByRequestedTime,
      dollarsInFlight: impactData.dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactData.currentlyInfected,
      infectionsByRequestedTime: severeImpactData.infectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactData.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactData.hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeImpactData.casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactData.casesForVentilatorsByRequestedTime,
      dollarsInFlight: severeImpactData.dollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
