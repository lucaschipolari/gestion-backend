const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Array para almacenar tareas (en memoria)
let tareas = [];

// Ruta POST para crear tareas con equipo
app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion, cargaHoraria, prioridad, equipo } = req.body;
    
    // Validación básica
    if (!titulo || !descripcion || !cargaHoraria || !prioridad) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    
    if (!equipo || equipo.length === 0) {
        return res.status(400).json({ error: 'Debe asignar al menos un desarrollador' });
    }
    
    const nuevaTarea = {
        id: Date.now(),
        titulo,
        descripcion,
        cargaHoraria,
        prioridad,
        equipo,
        fechaCreacion: new Date()
    };
    
    tareas.push(nuevaTarea);
    console.log('Nueva tarea creada:', nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Ruta GET para ver todas las tareas
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});