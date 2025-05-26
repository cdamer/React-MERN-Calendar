const mongoose = require('mongoose');



// mongoose.connect('mongodb://127.0.0.1:27017/test');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.BD_CNN );
        console.log('BD online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}   
