const mysql  = require('mysql');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'curso_fullstack'
});


 // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'


pool.query('SELECT * from usuarios', function (error, results, fields) {
  if (error) throw error;
  
  console.table(results);
  console.table(fields);
  console.log(fields);
  pool.end();
});

module.exports = pool;