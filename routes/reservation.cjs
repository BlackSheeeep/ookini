const { request, connection } = require("./common.cjs");

const express = require("express");
const router = express.Router();

// 中间件：处理 GET /reservation/detail 请求
router.get("/detail", async (req, res) => {
  const date = req.query.date || "";
  const storeId = req.query.store_id;

  const { data = [{}] } = await request("get", ["reservation", "config"]);
  // const { data: reservations } = await request("get", [
  //   "reservation",
  //   "metadata?status=draft",
  // ]);
  const [reservations, fields] = await connection.execute(
    "SELECT * FROM `wp_pods_reservations`"
  );
  const { reservation_times = [] } = data[0];
  const reservation = Array.isArray(data)
    ? reservation_times.map((item) => {
        const sum = date
          ? reservations
              .filter((reserve) => {
                return reserve["store_id"] === storeId;
              })
              .filter((reserve) => {
                const time = new Date(reserve["reservation_date"] || "");
                const configTime = new Date(
                  date + " " + item["reservation_time"] || ""
                );
                const offset = Math.abs(time.getTime() - configTime.getTime());

                return offset < 5 * 1000 * 60;
              })
              ?.reduce((pre, item) => {
                pre += Number(item["reservation_people"]);
                return pre;
              }, 0) || 0
          : 0;
        return {
          max_reservation: Number(item.max_reservation),
          id: item.id,
          reserved_num: sum,
          reservation_time: item.reservation_time,
        };
      })
    : undefined;
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.send(JSON.stringify(reservation));
});

module.exports = router;
