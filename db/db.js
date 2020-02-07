const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;
const db = mongoose.connection;


mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

db.on('connected', () => {
	console.log('Mongoose is connected')
});

db.on('error', (err) => {
	console.log(err, 'Mongoose failed to connect')
});

db.on('disconnected', () => {
	console.log('Mongoose is disconnected')
});