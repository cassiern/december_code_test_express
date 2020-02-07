const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
	console.log(err, 'Mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected')
});