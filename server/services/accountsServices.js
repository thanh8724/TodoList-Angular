const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataHome = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [personnel, personnelFields] = await connection.query(
      "select * from personnel"
    );
    const dataHome = {
      personnel: personnel,
    };
    connection.release();
    pool.end();
    return dataHome;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = getDataHome;
