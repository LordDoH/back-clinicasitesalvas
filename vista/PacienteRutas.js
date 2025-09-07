const express = require('express');
const router = express.Router();
const rutapaciente = require('../controlador/PacienteControlador');

router.get('/', rutapaciente.vistaTodo);
router.get('/:t1', rutapaciente.vistaDoc);
router.post('/', rutapaciente.crearPaciente);
router.put('/:id', rutapaciente.actualizarPaciente);
router.delete('/:id', rutapaciente.eliminar);


module.exports = router;