const { mysqlConnection } = require('./constants');
const mysql  = require('mysql');
const connection = mysql.createPool(mysqlConnection);

  
class RepositoryMysql {
    items = [];    
    lastId = 1;

    addItem(item) {
       connection.query(`INSERT INTO usuarios( apynom, contraseña,telefono, email,activo) VALUES("${item.apynom}", "${item.password}","${item.telefono}","${item.email}", 1 )`, 
       function (error, results, fields) {
        if (error) throw error;
        console.log(results)
      });
    }
    getItemsForResponse(res) {
        connection.query(` SELECT * FROM usuarios`,  function (error, results, fields) {
                res.json({
                    results, 
                    length: results.length
                  });
            })
            
    }
    // getItem(id) {         
    //     return this.items.find(item => item.idusuarios === id);
    // }

    getItem(id,res){
        
        connection.query(`SELECT * FROM usuarios WHERE usuarios.apynom LIKE '%${id}%' OR usuarios.email LIKE '%${id}%'`, 
        function (error, results, fields){
            if (error) throw error;
            console.log(results);
            res.json({
                results, 
                length: results.length
              });
        });

    }

    deleteItem(id) {
        connection.query(`DELETE FROM usuarios 
        WHERE usuarios.idusuarios = ${id}`, function (error, results, fields) {
         if (error) throw error;
         console.log(results)
       });
       return true;
    }
    search(searchString) {
        return this.items.filter(each => each.description.match('.*' + searchString + '.*'));
    }
}

module.exports = new RepositoryMysql();