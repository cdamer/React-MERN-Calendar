    // host + /api/events
    
const { Router } = require('express');
const { check } = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { esFecha } = require('../helpers/esFecha');

const router = Router();







// todas tienen que pasar por la validacion de JWT
// como todos los eventos deben validar token, se pone aca y todo
// lo que venga a partir de aca
// se le va a validar el token
router.use(validarJWT);






// Rutas

// obtener eventos
router.get('/', getEventos );


// crear evento
router.post(
    '/', 
    [   // middlewares de express-validator, como es un array, se pueden agregar varios
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( esFecha ),
        check('end',   'La fecha de finalizacion es obligatoria').custom( esFecha ),
        validarcampos  // middleware para validar campos...
    ],
    crearEvento 
);

// Actualizar evento
router.put(
    '/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( esFecha ),
        check('end',   'La fecha de finalizacion es obligatoria').custom( esFecha ),
        validarcampos
    ],
    actualizarEvento 
);

// Borrar evento
router.delete('/:id', eliminarEvento );


module.exports = router;
