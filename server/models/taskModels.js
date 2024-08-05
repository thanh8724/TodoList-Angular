const connectionDataBase = require("../config/database.js");
async function insertDataTask(data) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO tasks (name, idProject, description, date_start, date, priority, progress)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.task,
    data.project,
    data.description,
    data.startDate,
    data.endDate,
    data.priority,
    1,
  ];
  try {
    const result = await pool.query(query, values);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function insertTable_TaskPrsonnel(idTask, idPersonnel) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO task_personnel (idTask, idPersonnel)
                    VALUES (?, ?)`;
  const values = [idTask, idPersonnel];
  pool.query(query, values);
}
async function updateTask(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE tasks SET priority = ?, progress = ?, date = ?, taskManager = ? WHERE id = ?`;
  const values = [
    data.priority,
    data.progress,
    data.dateEnd,
    data.manager,
    data.id,
  ];
  await pool.query(query, values);
}
async function deleteTask(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM tasks WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
async function deleteEmployeTask(idTask) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM task_personnel WHERE idTask = ?`;
  const values = [idTask];
  pool.query(query, values);
}
module.exports = {
  insertDataTask,
  insertTable_TaskPrsonnel,
  updateTask,
  deleteTask,
  deleteEmployeTask,
};
