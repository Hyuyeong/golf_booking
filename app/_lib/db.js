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
  SELECT 
      b.Id, 
      b.Status, 
      b.Amount, 
      b.UserId, 
      b.Date, 
      b.BoothId, 
      b.StartTime, 
      b.Duration,
      bo.Name AS BoothName,
      pt.Name AS PlayTypeName
  FROM 
      Bookings b
  JOIN 
      Booths bo ON b.BoothId = bo.Id
  JOIN 
      PlayType pt ON b.PlayTypeId = pt.Id
  WHERE 
      b.UserId = ?;
    `;

  const bookings = await query(sql, [userId]);
  return bookings;
};

export const getBooths = async () => {
  const sql = `
      SELECT * From Booths;
    `;
  const booths = await query(sql);
  return booths;
};

export const getPlayTypes = async () => {
  const sql = `
      SELECT * From PlayType;
    `;
  const playTypes = await query(sql);
  return playTypes;
};
