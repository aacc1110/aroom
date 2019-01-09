const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');
const booksCtrlc = require('../comments/comments.controller');

/* const handler = (ctx, next) => {
  ctx.body = `${ctx.request.method} ${ctx.request.path}`
}; */

books.get('/', booksCtrl.list);
books.get('/:id', booksCtrl.get);

books.post('/', booksCtrl.create);

books.delete('/', booksCtrl.delete);
books.delete('/:id', booksCtrl.delete);

// books.put('/', booksCtrl.replace);
books.put('/:id', booksCtrlc.replace);

// books.patch('/', booksCtrl.update);
books.patch('/:id', booksCtrlc.update);

module.exports = books;