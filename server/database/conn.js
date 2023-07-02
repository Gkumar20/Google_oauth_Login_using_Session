const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

// Append the database name "TNPBVP" to the URI
const dbUri = `${uri}TNPBVP`;


mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });