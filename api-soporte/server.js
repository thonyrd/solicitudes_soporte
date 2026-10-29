const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API Soporte funcionando'
  });
});

// Obtener todas las peticiones
app.get('/api/soportes', (req, res) => {
  const sql = 'SELECT * FROM peticiones ORDER BY id DESC';

  db.query(sql, (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al consultar los soportes'
      });
    }

    res.status(200).json(resultados);
  });
});

// Obtener una petición por ID
app.get('/api/soportes/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  const sql = 'SELECT * FROM peticiones WHERE id = ?';

  db.query(sql, [id], (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al consultar la petición de soporte'
      });
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: 'Petición de Soporte no encontrada'
      });
    }

    res.status(200).json(resultados[0]);
  });
});

// Crear una nueva petición
app.post('/api/soportes', (req, res) => {
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  // Validación de campos obligatorios según la DB
  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad) {
    return res.status(400).json({
      mensaje: 'Complete todos los campos obligatorios (asunto, solicitante, descripcion, categoria, prioridad)'
    });
  }

  const sql = `
    INSERT INTO peticiones
    (asunto, solicitante, descripcion, categoria, prioridad, estado, fechaRegistro)
    VALUES (?, ?, ?, ?, ?, ?, CURDATE())
  `;

  const valores = [
    asunto.trim(),
    solicitante.trim(),
    descripcion.trim(),
    categoria.trim(),
    prioridad.trim(),
    estado ? estado.trim() : 'Pendiente' // Estado por defecto si no se envía
  ];

  db.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al registrar el soporte'
      });
    }

    res.status(201).json({
      id: resultado.insertId,
      asunto: asunto.trim(),
      solicitante: solicitante.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria.trim(),
      prioridad: prioridad.trim(),
      estado: estado ? estado.trim() : 'Pendiente',
      fechaRegistro: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    });
  });
});

// Actualizar una petición
app.put('/api/soportes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
    return res.status(400).json({
      mensaje: 'Complete todos los campos para actualizar'
    });
  }

 
  const sql = `
    UPDATE peticiones
    SET asunto = ?, solicitante = ?, descripcion = ?,
        categoria = ?, prioridad = ?, estado = ?
    WHERE id = ?
  `;

  const valores = [
    asunto.trim(),
    solicitante.trim(),
    descripcion.trim(),
    categoria.trim(),
    prioridad.trim(),
    estado.trim(),
    id
  ];

  db.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al actualizar la Petición de Soporte'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Petición de Soporte no encontrada'
      });
    }

    res.status(200).json({
      mensaje: 'Petición de Soporte actualizada correctamente'
    });
  });
});


app.delete('/api/soportes/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }


  const sql = 'DELETE FROM peticiones WHERE id = ?';

  db.query(sql, [id], (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al eliminar la Petición de Soporte'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Petición de Soporte no encontrada'
      });
    }

    res.status(200).json({
      mensaje: 'Petición de Soporte eliminada correctamente'
    });
  });
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
