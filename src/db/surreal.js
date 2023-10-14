import Surreal from 'surrealdb.js'

const db = new Surreal()

async function connectToDB () {
  // Connect to SurrealDB
  try {
    await db.connect('http://localhost:8000/rpc')
  } catch (error) {
    alert('Could not connect to SurrealDB. ')
  }
  useNamespace()
}

// Select namespace / database
async function useNamespace () {
  try {
    await db.use({ ns: 'test', db: 'test' })
  } catch (error) {
    alert('Could not select specified namespace / database.')
  }
}

// Create tasks table
async function createTasksTable () {
  try {
    await db.query(`
      DEFINE TABLE task_db SCHEMAFULL;

      DEFINE FIELD name ON TABLE task_db TYPE string;
      DEFINE FIELD status ON TABLE task_db TYPE string;
      `)
  } catch (error) {
    alert('Could not create tasks table.')
  }
}

// Get all tasks
export async function getTasks () {
  useNamespace()

  try {
    const response = await db.query('SELECT * FROM task_db;')
    return response[0].result
  } catch (error) {
    alert('Could not fetch tasks.')
  }
}

// Create new task
export async function addTask (title, description) {
  try {
    return await db.query(`
    INSERT INTO task_db (name, status)
    VALUES ('${title}', '${description}');
  `)
  } catch (error) {
    alert('Could not add task.')
  }
}

// Delete task
export async function deleteTask (id) {
  try {
    return await db.query(`
    DELETE FROM task_db
    WHERE id = ${id};
  `)
  } catch (error) {
    alert('Could not delete task.')
  }
}

async function main () {
  try {
    await connectToDB()
    await createTasksTable()
  } catch (error) {
    alert('Could not set up application. ')
  }
}

main()

// Export functions
export default { addTask, getTasks, deleteTask }
