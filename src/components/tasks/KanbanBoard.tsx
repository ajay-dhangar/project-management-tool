import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';
import { CreateTaskModal } from './CreateTaskModal';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100 dark:bg-green-900/20' }
];

export function KanbanBoard() {
  const { state, dispatch } = useApp();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    const task = state.tasks.find(t => t.id === draggableId);
    if (!task) return;

    const newStatus = destination.droppableId as 'todo' | 'in-progress' | 'completed';
    const updatedTask = {
      ...task,
      status: newStatus,
      updatedAt: new Date()
    };

    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    
    // Add activity
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: Date.now().toString(),
        type: 'task_updated',
        description: `moved task "${task.title}" to ${newStatus.replace('-', ' ')}`,
        userId: state.user!.id,
        user: state.user!,
        projectId: task.projectId,
        taskId: task.id,
        createdAt: new Date()
      }
    });

    toast.success(`Task moved to ${newStatus.replace('-', ' ')}`);
  };

  const getTasksByStatus = (status: string) => {
    return state.tasks.filter(task => task.status === status);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {column.title}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({getTasksByStatus(column.id).length})
                  </span>
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Plus size={16} />}
                  onClick={() => setIsCreateTaskModalOpen(true)}
                >
                  Add Task
                </Button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] p-4 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? column.color : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="space-y-3">
                      {getTasksByStatus(column.id).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onClick={() => setSelectedTask(task)}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskDetailModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
      />
    </>
  );
}