import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, updateTaskStatus, deleteTask } from '../../services/task/task.service';

interface Task {
  id: string;
  name: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
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
        await updateTaskStatus(movedTask.id, updatedStatus);
        fetchTasks(); 
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(id);
        fetchTasks(); 
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-board">
        {['TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-column"
              >
                <h3>{status}</h3>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-item"
                        >
                          <div>
                            <strong>{task.name}</strong>
                          </div>
                          <div>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="delete-button"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
