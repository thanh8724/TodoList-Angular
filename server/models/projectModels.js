const connectionDataBase = require("../config/database.js");
async function insertDataProject(data) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO projects (name, manager, description, date_start, date)
                    VALUES (?, ?, ?, ?, ?)`;
  const values = [
    data.nameProject,
    data.managerProject,
    data.descriptionProject,
    data.startDate,
    data.endDate,
  ];
  pool.query(query, values);
}
async function updateProgressProject(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE projects SET progress = ? WHERE id = ?`;
  const values = [
    data.progress,
    data.id,
  ];
  await pool.query(query, values);
}
async function deleteProject(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM projects WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
module.exports = { insertDataProject, updateProgressProject, deleteProject };
