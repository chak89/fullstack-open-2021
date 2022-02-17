require('dotenv').config()

//Use TESDB if NODE_ENV=test
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	MONGODB_URI
}