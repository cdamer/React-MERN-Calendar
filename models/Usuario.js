const {Schema, model, Collection } = require('mongoose');


const UsuarioSchema = Schema({  
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
  }, {collection: 'usuarios'} );


module.exports = model('Usuario', UsuarioSchema );