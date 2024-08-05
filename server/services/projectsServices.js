const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataProjects = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [projects, projectsFields] = await connection.query(
      "select * from projects"
    );
    const [personnel, personnelFields] = await connection.query(
      "select * from personnel"
    );
    const [tasks, tasksFields] = await connection.query(
      "select id, progress, idProject from tasks"
    );
    const data = {
      projects: projects,
      personnel: personnel,
      progressTask: tasks,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getDataProjectById = async (id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [project, projectFields] = await connection.query(
      `select * from projects where id = ${id}`
    );
    const data = {
      project: project,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getDataProjects, getDataProjectById };
