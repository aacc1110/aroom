const model = require('../../models');

const { User } = model;

exports.signUp = async ctx => {
	ctx.body = 'sdfsdfs';
	console.log('sdfsdfsdf');
	/* 	const { username, email, password } = ctx.request.body;
	return User.create({
		username,
		email,
		password,
	}).then(userData => ({
		success: true,
		message: 'User successfully created',
		userData,
	})); */
};
