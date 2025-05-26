//es para mantener el tipado inteligente...
const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = express.response ) => {
    
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }   

        usuario = new Usuario( req.body );
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();  
        usuario.password = bcrypt.hashSync( password, salt );
        // Guardar usuario
        await usuario.save();

        // Generar el token - JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
        
    }
}


const loginUsuario = async (req, res  = express.response ) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }   
        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }   

        // Generar el token - JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
        
    }
}


const revalidarToken = async (req, res = express.response ) => {
    const { uid, name } = req;
    // Generar el token - JWT
    const token = await generarJWT( uid, name );  

    res.json({
        ok: true,
        token
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};