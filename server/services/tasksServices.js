const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataTasks = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [tasks, tasksFields] = await connection.query(
      "select * from tasks order by priority ASC"
    );
    const [projects, projectsFields] = await connection.query(
      "select * from projects"
    );
    const [personnels, personnelsFields] = await connection.query(
      "select * from personnel"
    );
    const [personnels_task, personnels_taskFields] = await connection.query(
      "select * from task_personnel"
    );
    const dataHome = {
      tasks: tasks,
      projects: projects,
      personnels: personnels,
      personnels_task: personnels_task,
    };
    connection.release();
    pool.end();
    return dataHome;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getDataTaskById = async (id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [tasks, tasksFields] = await connection.query(
      `select * from tasks where id = ${id}`
    );
    const data = {
      tasks: tasks,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getDataTasks, getDataTaskById };
