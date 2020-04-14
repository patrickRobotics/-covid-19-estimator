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
  const factor = computeFactor(data.periodType, data.timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(
    data.totalHospitalBeds * 0.35 - severeCasesByRequestedTime
  );

  const impact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };

  return impact;
};

const computeSevereImpact = (data) => {
  const currentlyInfected = data.reportedCases * 50;
  const factor = computeFactor(data.periodType, data.timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(
    data.totalHospitalBeds * 0.35 - severeCasesByRequestedTime
  );

  const severeImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
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
      hospitalBedsByRequestedTime: impactData.hospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeImpactData.currentlyInfected,
      infectionsByRequestedTime: severeImpactData.infectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactData.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactData.hospitalBedsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
