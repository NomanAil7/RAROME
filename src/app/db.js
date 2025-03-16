import mysql from 'mysql2/promise';

export const database = mysql.createPool({
  host: 'localhost',     
  user: 'root',
  password: '',
  database: 'rarome', 
});
