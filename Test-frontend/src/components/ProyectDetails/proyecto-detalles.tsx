import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProyectoService } from '../../services/project/project.service';

interface Proyecto {
  id: string;
  name: string;
  description: string;
}

const ProyectoDetalle = () => {
  const { id } = useParams<{ id: string }>(); 
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const proyectoService = new ProyectoService();

  useEffect(() => {
    if (id) {
      proyectoService.getProyecto(id).then((data) => {
        if (data) {
          setProyecto(data);
        } else {
          console.error('No se encontró el proyecto');
        }
      }).catch((error) => {
        console.error('Error cargando proyecto', error);
      });
    } else {
      console.error('ID del proyecto no disponible');
    }
  }, [id]);
  

  return (
    <div>
      <h1>Detalles del Proyecto</h1>
      {proyecto ? (
        <div>
          <h2>{proyecto.name}</h2>
          <p>{proyecto.description}</p>
        </div>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
};

export default ProyectoDetalle;
