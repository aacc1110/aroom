import model from '../../models';

const { user } = model;

class Users {
	static signUp(ctx) {
		const { email, username, password } = ctx.request.body;
	}
}

export default Users;
