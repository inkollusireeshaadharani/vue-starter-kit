<template>
  <h1>Task manager application</h1>

    <div class="styled-container">
      <h2>Add task</h2>
      <input v-model="newTaskTitle" placeholder="Enter task title">
      <input v-model="status" placeholder="Task status">
      <button @click="addTask">Add Task</button>
    </div>

    <div class="styled-container">  
      <h2>List of Tasks</h2>
      <div class="tasks" v-for="task in tasks">
        <li>
        <span class="name">
          {{ task.name }}
        </span>
        <span>
          {{ task.status }}
        </span>
        
        <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </div>
    </div>

  </template>
  
<script>
  import { addTask, getTasks, deleteTask } from '../db/surreal.js';
  
  export default {
    data() {
      return {
        newTaskTitle: '',
        status: '',
        tasks: []
      }
    },
    async created() {
      this.tasks = await getTasks()
    },
    methods: {
      async addTask() {
        await addTask(this.newTaskTitle, this.status)
        this.newTaskTitle = ''
        this.status = ''
        this.tasks = await getTasks()
      },
      async deleteTask(id) {
        await deleteTask(id)
        this.tasks = await getTasks()
      }
    }
  }
  </script>
