import {} from 'dotenv/config'
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (email, id) => {
  const token = jwt.sign({ email, id }, JWT_SECRET, jwtConfig); 
  return token;
};

export default createToken;
