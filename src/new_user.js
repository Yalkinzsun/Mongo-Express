const User = require('./bd');
(async () => {
	let newUser = {login: 'Kirill Skorobogatov', password: 'qwerty123'};
	newUser = new User(newUser);
	await newUser.save();
	process.exit(0);
})();