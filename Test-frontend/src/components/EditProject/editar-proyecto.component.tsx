
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProyectoService } from '../../services/project/project.service';

const ProyectoEditar = () => {
  const { id } = useParams<{ id: string }>();
  const [proyecto, setProyecto] = useState<{ name: string, description: string }>({ name: '', description: '' });
  const navigate = useNavigate();
  const proyectoService = new ProyectoService();

  useEffect(() => {
    if (id) {
      proyectoService.getProyecto(id).then((data) => {
        setProyecto({ name: data.name, description: data.description });
      }).catch((error) => {
        console.error('Error cargando proyecto para editar', error);
      });
    }
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProyecto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (id) {
      proyectoService.updateProyecto(id, proyecto).then(() => {
        navigate(`/proyectos`); 
      }).catch((error) => {
        console.error('Error actualizando proyecto', error);
      });
    }
  };

  return (
    <div>
      <h1>Editar Proyecto</h1>
      <input
        type="text"
        name="name"
        value={proyecto.name}
        onChange={handleInputChange}
        placeholder="Nombre del proyecto"
      />
      <input
        type="text"
        name="description"
        value={proyecto.description}
        onChange={handleInputChange}
        placeholder="Descripción del proyecto"
      />
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

export default ProyectoEditar;
