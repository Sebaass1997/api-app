const express = require('express');
const app = require('../app');
const router = express.Router();

const todoRepository = require('../repository');

function validTodoItem(item) {
  return item.description !== undefined &&
          item.description !== '' &&
          item.completed !== undefined
}

function processItem(req, res, callback) {
  const id = Number.parseInt(req.params.id);
  if (id !== NaN && id > 0 ) {
    const item = callback(id);
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
  console.log(req.query);
  let items;
  if (search && search !== '') {
    items = todoRepository.search(search);
  } else {
     items = todoRepository.getItemsForResponse(res); 
  }
  
});

router.get('/:id', function(req, res) {
  processItem(req, res, (id) => {
    return todoRepository.getItem(id);
   }  );
});

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