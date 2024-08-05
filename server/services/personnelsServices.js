const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataPersonnels = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [personnel, personnelFields] = await connection.query(
      "select * from personnel"
    );
    const [listIdUserManagerProject, listIdUserManagerProjectFields] =
      await connection.query("select manager from projects");
    const [listIdUserManagerTask, listIdUserManagerTaskFields] =
      await connection.query("select taskmanager from tasks");
    const dataHome = {
      personnel: personnel,
      listIdUserManagerProject: listIdUserManagerProject,
      listIdUserManagerTask: listIdUserManagerTask,
    };
    connection.release();
    pool.end();
    return dataHome;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getDataPersonnelById = async (id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [personnel, personnelFields] = await connection.query(
      `select * from personnel where id = ${id}`
    );
    const data = {
      personnel: personnel,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getDataPersonnels, getDataPersonnelById };
