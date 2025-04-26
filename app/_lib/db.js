import mysql from "mysql2/promise";

export async function query(sql, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [results] = await connection.execute(sql, params);
  return results;
}

export const getUserBookings = async (userId) => {
  const sql = `
      SELECT b.Id, b.Status, b.Amount, b.UserId, b.Date, b.BoothId, 
             bo.Name AS BoothName 
      FROM Bookings b
      JOIN Booths bo ON b.BoothId = bo.Id 
      WHERE b.UserId = ?
    `;

  const bookings = await query(sql, [userId]);
  return bookings;
};
