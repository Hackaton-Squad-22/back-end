const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) res.status(400).json({ message: 'Email is not valid' });
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be more then 6 characteres' });
  }
  next();
};

const loginValidation = [
  emailValidation,
  passwordValidation,
];

export default loginValidation