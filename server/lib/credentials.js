const { v4: uuidv4 } = require('uuid');

const generateSecret = () => Math.random().toString(36).slice(-8);

const generateCredentials = () => {
  return {
    token: uuidv4(),
    secret: generateSecret()
  }
}

const extractCredentials = (header) => {
  const [token, secret] = Buffer.from(header, 'base64').toString('ascii').split(':');
  return {token, secret};
}

module.exports ={
  generateCredentials,
  extractCredentials
}
