const mongoose = require('mongoose');

async function connectdb() {
    try {
        await mongoose.connect('mongodb+srv://minhnbph16523:minhnguyen04@cluster0.hdnshg8.mongodb.net/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Connected to MongoDB successfully');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
    } catch (error) {
        console.log('Connected to MongoDB failed');
    }

}

module.exports = { connectdb }

