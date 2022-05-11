module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('/도와주새우', { type: 'WATCHING' });
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};