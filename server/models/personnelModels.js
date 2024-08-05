const connectionDataBase = require("../config/database.js");
async function insertDataPersonnel(data) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO personnel (name, email, phone, role, password)
                    VALUES (?, ?, ?, ?, ?)`;
  const values = [
    data.name,
    data.email,
    `0${data.phone}`,
    data.role,
    data.phone,
  ];
  pool.query(query, values);
}
async function updatePersonnel(data, id) {
  const pool = await connectionDataBase();
  const query = `UPDATE personnel SET name = ?, email = ?, role = ?, phone = ? WHERE id = ?`;
  const values = [data.nameUp, data.emailUp, data.roleUp, data.phoneUp, id];
  await pool.query(query, values);
}
async function deletePersonnel(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM personnel WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
module.exports = { insertDataPersonnel, updatePersonnel, deletePersonnel };
