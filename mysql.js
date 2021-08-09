const mysql  = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'curso_fullstack'
});

 // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
 /* connection.query(`insert into libros (titulo,autor,editorial,precio,cantidad)
  values ('${nombreLibro}','${autor}','Planeta',350.50,${cantidad});`, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    console.log(results)
  }); */

 const apynom = "emi";

connection.query(`SELECT * FROM usuarios WHERE apynom like '%${apynom}%'`, function (error, results, fields) {
  if (error) throw error;
  console.table(results);
  console.log(fields);
}); 
 
connection.end(); 