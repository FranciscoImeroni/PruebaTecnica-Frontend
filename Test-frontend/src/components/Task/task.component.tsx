import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getTasks, updateTaskStatus, deleteTask } from '../../services/task/task.service';
import './task.component.css';
import TaskBoard from '../TaskBoard/task-board.component';
import Swal from 'sweetalert2';


interface Task {
  _id: string;
  name: string;
  status: string;
}

const TaskComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    if (source.droppableId !== destination.droppableId) {
      try {
        const updatedStatus = destination.droppableId.toUpperCase();
        await updateTaskStatus(movedTask._id, updatedStatus);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };


  const handleDeleteTask = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteTask(id);
        fetchTasks();
        Swal.fire('Eliminado!', 'La tarea ha sido eliminada.', 'success');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-container">
      <h1>Gestión de Tareas</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskBoard tasks={tasks} onDelete={handleDeleteTask} />
      </DragDropContext>
    </div>
  );
};

export default TaskComponent;
