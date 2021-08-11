const express = require('express');
const app = require('../app');
const router = express.Router();
const todoRepository = require('../repository');



function validTodoItem(item) {
  console.log(item)
  return item.apynom !== undefined &&
          item.telefono !== '' &&
          item.password !== '' &&
          item.email !== '' 
}

function processItem(req, res, callback) {
  const id = req.params.id;
  if (id !== NaN ) {
    const item = callback(id,res);   
    if (item === undefined) {
      throw {message: 'Item not found', status: 404};
      //res.status(404).json({error: 'Item not found'})
    } else {
      res.json(item);
    }
  } else {
    throw {message: 'Invalid', status: 400};
  }
}
/* GET users listing. */
router.get('/', function(req, res) {
  const search = req.query.search;
  console.log(req.query.search);
  let items;
  if (search && search !== '') {
    items = todoRepository.search(search);
  } else {
     items = todoRepository.getItemsForResponse(res); 
     todoRepository.items = items;
     console.log(todoRepository.items);
  }
  
});
/* GET ONE user . */
router.get('/:id', function(req, res) {
  processItem(req, res, (id) => {
    return todoRepository.getItem(id,res);
   }  );  
});

// router.get('/usuarios/:id', (request, response) => {
//   const id = request.params.id;

//   pool.query('SELECT * FROM usuarios WHERE idusuarios = ?', id, (error, result) => {
//       if (error) throw error;

//       response.send(result);
//   });
// });

/* POST users. */
router.post('/', function(req, res) {
    const todoItem = req.body;    
    if (!validTodoItem(todoItem)) {
      res.status(400).json({error: 'Invalid Todo Item'});
    } else {
      res.status(201).json(todoRepository.addItem(todoItem));
    }
  });

  router.delete('/:id', function(req, res) {
   processItem(req, res, (id) => {
    return todoRepository.deleteItem(id);
   }  );

  });  
module.exports = router;