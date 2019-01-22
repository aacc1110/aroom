require('dotenv').config(); // .env 파일에서 환경변수 불러오기
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');

const bodyParser = require('koa-bodyparser');
const api = require('./api');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 4001; // PORT 값이 설정되어있지 않다면 4000을 사용합니다.
app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(helmet());

const models = require('./models/index');
models.sequelize
	.sync()
	.then(() => {
		console.log('POSTGRESQL CONNECTION');
	})
	.catch(err => {
		console.err(err);
	});

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

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
router.get('/', ctx => {
	console.log('Url : ', ctx.url);
	ctx.body = 'Setup PostgreSQL with Sequelize in KOA';
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
	console.log('KOA server is listening to port 4001');
});
