import express from 'express';
import patientServices from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching all patients!');
	res.send(patientServices.getNonSsnEntries());
});

export default router;