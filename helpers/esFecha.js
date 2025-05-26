const moment = require('moment');

const esFecha = ( value ) => {
    if ( !value ) {
        return false; // Si no hay valor, no es una fecha válida
    }

    const fecha = moment( value );
    return fecha.isValid(); // Verifica si la fecha es válida   

}


module.exports = { esFecha };