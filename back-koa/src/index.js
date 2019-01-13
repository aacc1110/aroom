require('dotenv').config(); // .env 파일에서 환경변수 불러오기
const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const { jwtMiddleware } = require('lib/token');

const app = new Koa();
const router = new Router();
const api = require('./api');

mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true },
);

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000을 사용합니다.

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	ctx.set(
		'Access-Control-Allow-Methods',
		'POST, GET, PUT, PATCH, DELETE, OPTIONS',
	);
	await next();
});
const bodyParser = require('koa-bodyparser');
app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(jwtMiddleware);
router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
router.get('/', ctx => {
	console.log(3);
	ctx.body = 'hello KOA';
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
	console.log('back-koa server is listening to port 4000');
});
