const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "8.209.245.194", // 数据库主机地址
  user: "kimono", // 数据库用户名
  password: "kimono0921", // 数据库密码
  database: "kimono", // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

(async () => {
  const connection = await pool.getConnection();
  const [results, fields] = await connection.execute(
    "SELECT * FROM `wp_pods_reservations`"
  );
})();
