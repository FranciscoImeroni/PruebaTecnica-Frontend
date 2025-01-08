import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProyectoService } from '../../services/project/project.service'; 
import './proyecto.component.css';

interface Proyecto {
  _id: string;
  name: string;
  description: string;
}

const ProyectosComponent = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const proyectoService = new ProyectoService();

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = () => {
    proyectoService.getProyectos()
      .then((response) => {
        const proyectosConId = response.map((proyecto: any) => ({
          _id: proyecto._id,
          name: proyecto.name,
          description: proyecto.description,
        }));
        setProyectos(proyectosConId);
      })
      .catch((error) => {
        console.error('Error cargando proyectos', error);
      });
  };

  const verDetalles = (id: string) => {
    if (id) {
      alert('ID: ' + id);
      navigate(`/project/${id}`);
    } else {
      alert('ID del proyecto no disponible');
    }
  };

  const editarProyecto = (id: string) => {
    navigate(`/project/editar/${id}`);
  };

  const eliminarProyecto = (id: string) => {
    proyectoService.deleteProyecto(id)
      .then(() => {
        cargarProyectos();
      })
      .catch((error) => {
        console.error('Error eliminando proyecto', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProject = () => {
    const { name, description } = newProject;
    if (name && description) {
      proyectoService.createProyecto(newProject)
        .then(() => {
          cargarProyectos();
          setNewProject({ name: '', description: '' });
        })
        .catch((error) => {
          console.error('Error creando proyecto', error);
        });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const regresarAlDashboard = () => {
    navigate('/dashboard'); 
  };

  return (
    <div>
      <button onClick={regresarAlDashboard} className="back-button">
        Atras
      </button>
      <h1>Proyectos</h1>
      <div className="form-container">
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Nombre del proyecto"
        />
        <input
          type="text"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Descripción del proyecto"
        />
        <button onClick={handleCreateProject}>Crear Proyecto</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <tr key={proyecto._id}>
                <td>{proyecto.name}</td>
                <td>{proyecto.description}</td>
                <td>
                  <button onClick={() => verDetalles(proyecto._id)}>Ver</button>
                  <button onClick={() => editarProyecto(proyecto._id)}>Editar</button>
                  <button onClick={() => eliminarProyecto(proyecto._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No hay proyectos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProyectosComponent;
