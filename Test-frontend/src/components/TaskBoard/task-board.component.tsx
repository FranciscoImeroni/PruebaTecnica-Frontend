/* import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Task {
  id: string;
  name: string;
  status: string;
}

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDelete }) => {
  const statuses = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className="task-board">
      {statuses.map((status) => (
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
                        <button
                          onClick={() => onDelete(task.id)}
                          className="delete-button"
                        >
                          Eliminar
                        </button>
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
  );
};

export default TaskBoard;
 */
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


interface Task {
  _id: string;
  name: string;
  status: string;
}

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}


const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDelete }) => {
  const statuses = ['pending', 'in_progress', 'completed'];
  console.log('Tasks in TaskBoard:', tasks);

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <Droppable droppableId={status} key={status}>
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
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-item"
                      >
                        <strong>{task.name}</strong>
                        <button onClick={() => onDelete(task._id)}>Delete</button>
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
  );
};

export default TaskBoard;
