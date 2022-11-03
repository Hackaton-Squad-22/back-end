import express from 'express';

import createToken from '../auth/createToken.js';
import loginValidation from '../middlewares/login.middlewares.js';

const router = express.Router();

router.post('/', loginValidation, async (req, res) => {
  const { id, email } = req.body;
  return res.status(200).json({
    token: createToken(id, email),
  });
});

export default router;
