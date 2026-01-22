
import React, { useState, useMemo } from 'react';
import { Column, FilterState, Task, TaskType, ViewType } from '../../../types';
import { KanbanBoard, CreateTaskModal, TaskDetailsModal } from '../kanban/KanbanBoard';
import { FlatList } from './FlatList';
import { TreeList } from './TreeList';
import { MOCK_COLUMNS, MOCK_USERS } from '../../../utils/constants';

interface WorkItemsViewProps {
  filters: FilterState;
  viewType: ViewType;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  createModalType: TaskType | null;
  setCreateModalType: (type: TaskType) => void;
}

export const WorkItemsView: React.FC<WorkItemsViewProps> = ({ 
  filters, viewType, isCreateModalOpen, setIsCreateModalOpen, createModalType, setCreateModalType
}) => {
  const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Apply filters to columns
  const filteredColumns = useMemo(() => {
    return columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => {
        const searchLower = filters.search?.toLowerCase();
        if (searchLower) {
            const matchesTitle = task.title?.toLowerCase().includes(searchLower);
            const matchesDisplayId = task.displayId?.toLowerCase().includes(searchLower);
            if (!matchesTitle && !matchesDisplayId) return false;
        }
        if (filters.type && task.type !== filters.type) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        if (filters.assigneeId && task.assignee.id !== filters.assigneeId) return false;
        if (filters.projectId && task.projectId !== filters.projectId) return false;
        // status filter maps to column title usually, but simplified here
        if (filters.status && col.title !== filters.status) return false; 
        return true;
      })
    }));
  }, [columns, filters]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCreateTask = (newTask: Task) => {
      // Add to Todo column by default or based on status logic
      const newColumns = [...columns];
      const todoColIndex = newColumns.findIndex(c => c.id === 'todo');
      if (todoColIndex > -1) {
          const todoCol = newColumns[todoColIndex];
          const taskToAdd = {
              ...newTask,
              id: `t${Date.now()}`,
              displayId: `#NEW-${Math.floor(Math.random()*1000)}`,
              statusColor: 'bg-gray-400',
              dueDate: newTask.dueDate || '2025-12-31',
              assignee: newTask.assignee || MOCK_USERS[0],
              projectId: 'p1',
              progress: 0,
              creatorId: 'u1'
          };
          newColumns[todoColIndex] = { ...todoCol, tasks: [taskToAdd, ...todoCol.tasks], count: todoCol.count + 1 };
          setColumns(newColumns);
      }
      setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
      // Logic to update task in columns state
      const newColumns = columns.map(col => ({
          ...col,
          tasks: col.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      }));
      setColumns(newColumns);
      setSelectedTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
      const newColumns = columns.map(col => ({
          ...col,
          tasks: col.tasks.filter(t => t.id !== taskId),
          count: col.tasks.filter(t => t.id !== taskId).length
      }));
      setColumns(newColumns);
      setSelectedTask(null);
  };

  const handleAddClick = (typeOrStatus?: TaskType | string) => {
      // Could enhance to pre-fill status if added from TreeList group header
      setCreateModalType(typeof typeOrStatus === 'string' ? TaskType.Task : (typeOrStatus || TaskType.Task));
      setIsCreateModalOpen(true);
  };

  const renderContent = () => {
      switch (viewType) {
          case 'list':
              return <FlatList columns={filteredColumns} onTaskClick={handleTaskClick} />;
          case 'tree':
              return <TreeList columns={filteredColumns} onTaskClick={handleTaskClick} onAddClick={() => handleAddClick(TaskType.Task)} />;
          case 'kanban':
          default:
              return (
                <KanbanBoard 
                    columns={filteredColumns} 
                    setColumns={setColumns} 
                    onTaskClick={handleTaskClick} 
                    onAddClick={handleAddClick} 
                />
              );
      }
  };

  return (
    <>
        {renderContent()}

        {isCreateModalOpen && (
            <CreateTaskModal 
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateTask}
                defaultType={createModalType}
            />
        )}

        {selectedTask && (
            <TaskDetailsModal 
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
            />
        )}
    </>
  );
};
