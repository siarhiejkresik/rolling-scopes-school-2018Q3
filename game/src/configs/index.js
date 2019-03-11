const SERVER_ADDRESS_LOCAL = 'http://127.0.0.1:3000';
const SERVER_ADDRESS_HEROKU = 'https://siarhiej-kresik-game-2018q3.herokuapp.com';

export const SERVER_ADDRESS = process.env.NODE_ENV === 'production' ? SERVER_ADDRESS_HEROKU : SERVER_ADDRESS_LOCAL;

export const MAX_NUM_OF_RECORDS = 6;
