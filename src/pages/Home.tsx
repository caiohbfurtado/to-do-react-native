import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const existsTask = tasks.some(currentTask => currentTask.id === id);

    if (!existsTask) {
      return;
    }

    setTasks(prevState => prevState.map(currentTask => currentTask.id === id ? {
      ...currentTask,
      done: !currentTask.done,
    } : {...currentTask}));
  }

  function handleRemoveTask(id: number) {
    const existsTask = tasks.some(currentTask => currentTask.id === id);

    if (!existsTask) {
      return;
    }
    
    setTasks(prevState => prevState.filter(currentTask => currentTask.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})