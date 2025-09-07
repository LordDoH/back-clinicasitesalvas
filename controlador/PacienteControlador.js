const Paciente = require("../modelo/PacienteModelo");

const PacienteControlador = {
  async vistaTodo(req, res) {
    try {
      const pacientes = await Paciente.montrarTodo(); //este Paciente llama al de la linea 1
      res.status(200).json(pacientes);
    } catch (error) {
      console.error("Error al listar pacientes:", error);
      res.status(500).json({ mensaje: "Error al obtener los pacientes" });
    }
  },

  // GET /paciente/:iddocumento
  async vistaDoc(req, res) {
    // console.log('Se ejecuto una busqueda de un paciente, con id', req.params.t1);
    const { t1: id } = req.params;
    try {
      const pacientes = await Paciente.mostrarDoc(id);
      // console.log('Pacientes encontrados:', pacientes);
      res.status(200).json(pacientes);
    } catch (error) {
      console.error("Error al mostrar pacientes:", error);
      res.status(500).json({ mensaje: "Error al obtener el pacientes" });
    }
  },

  async crearPaciente(req, res) {
    const {
      t1: documento,
      t2: nombres,
      t3: telefono,
      t4: correo,
      t5: direccion,
    } = req.body;
    if (!documento || !nombres || !telefono || !correo || !direccion) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son obligatorios" });
    }

    try {
      const nuevopaciente = new Paciente(
        documento,
        nombres,
        telefono,
        correo,
        direccion
      );
      const pacienteGuardado = await nuevopaciente.guardarPaciente();
      res.status(201).json(pacienteGuardado);
    } catch (error) {
      console.error("Error al crear paciente:", error);
      res.status(500).json({ mensaje: "Error al crear el paciente" });
    }
  },

  async actualizarPaciente(req, res) {
    const { id } = req.params;
    const {
      t1: documento,
      t2: nombres,
      t3: telefono,
      t4: correo,
      t5: direccion,
    } = req.body;

    const datos = { documento, nombres, telefono, correo, direccion };

    // Limpia campos vacíos o undefined
    Object.keys(datos).forEach((key) => {
      if (!datos[key]) delete datos[key];
    });

    if (Object.keys(datos).length === 0) {
      return res.status(400).json({ mensaje: "No hay datos para actualizar" });
    }

    try {
      const pacienteExistente = await Paciente.mostrarDoc(id);
      if (!pacienteExistente) {
        return res.status(404).json({ mensaje: "Paciente no encontrado" });
      }

      const pacienteActualizado = await Paciente.editarPaciente(id, datos);
      res.status(200).json(pacienteActualizado);
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      res.status(500).json({ mensaje: "Error al actualizar el paciente" });
    }
  },

  async eliminar(req, res) {
    const { id } = req.params;
    try {
      const eliminado = await Paciente.delete(id);
      if (!eliminado) {
        return res.status(404).json({ mensaje: "Paciente no encontrado" });
      }
      res.status(200).json({ mensaje: "Paciente eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar Paciente:", error);
      res.status(500).json({ mensaje: "Error al eliminar el Paciente" });
    }
  },
};

module.exports = PacienteControlador;
