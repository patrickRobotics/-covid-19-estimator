const express = require('express');

const router = express.Router();

const covid19ImpactEstimator = require('../estimator');

router.get('/', (req, res) => {
  res.render('index', { title: 'Covid-19 Estimator' });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const { avgAge } = req.body;
  const { avgDailyIncomeInUSD } = req.body;
  const { avgDailyIncomePopulation } = req.body;
  const { population } = req.body;
  const { periodType } = req.body;
  const { timeToElapse } = req.body;
  const { reportedCases } = req.body;
  const { totalHospitalBeds } = req.body;
  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  const estimate = covid19ImpactEstimator(data);
  res.render('estimate', { title: 'Covid-19 Estimations', estimate });
});

module.exports = router;
