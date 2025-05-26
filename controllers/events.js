const { response } = require('express');
// const { request } = require('express');
const Evento = require('../models/evento');


const getEventos = async (req, res=response) => {
    // Obtener eventos
    const eventos = await Evento.find()
                                .populate('user', 'name') // populate para obtener el nombre del usuario que creó el evento
                                .sort({ start: -1 }); // ordenar por fecha de inicio, de más reciente a más antiguo 
    res.json({
        ok: true,
        eventos
    });
}


const crearEvento = async (req, res) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid; // asignar el usuario que crea el evento
        // Guardar evento
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear evento'
        });
    }


}

const actualizarEvento = async (req, res) => {    
    // Actualizar evento
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        // Actualizar los campos del evento
        const nuevoEvento = {
            ...req.body,
            user: req.uid // asegurarse de que el usuario que actualiza es el mismo que creó el evento
        };

        // Guardar cambios
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento'
        });
    }

}



const eliminarEvento = async (req, res) => {  
    // Eliminar evento
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        // Eliminar el evento
        await Evento.findByIdAndDelete( eventoId );
        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento'
        });
    }
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}   
