const { request } = require("./common.cjs");

const express = require("express");
const router = express.Router();
// 模拟数据库中的预订详细信息
const reservations = {
  1: {
    id: 1,
    user: "John Doe",
    date: "2023-10-15",
    time: "18:00",
    guests: 4,
    notes: "Special request for a window seat.",
  },
  2: {
    id: 2,
    user: "Jane Smith",
    date: "2023-10-20",
    time: "19:30",
    guests: 2,
    notes: "Vegetarian menu preferred.",
  },
};

// 中间件：处理 GET /reservation/detail 请求
router.get("/detail", async (req, res) => {
  const date = req.query.date || "";
  const storeId = req.query.store_id;
  const { data = [{}] } = await request("get", ["reservation", "config"]);
  const { data: reservations } = await request("get", [
    "reservation",
    "metadata?status=draft",
  ]);
  const { reservation_times = [] } = data[0];
  console.log("query", storeId, data, reservation_times);
  const reservation = Array.isArray(data)
    ? reservation_times.map((item) => {
        const sum = date
          ? reservations
              .filter((reserve) => {
                return reserve["store-id"] === storeId;
              })
              .filter((reserve) => {
                const time = new Date(reserve["reservation-date"] || "");
                const configTime = new Date(
                  date + " " + item["reservation_time"] || ""
                );
                const offset = Math.abs(time.getTime() - configTime.getTime());

                return offset < 5 * 1000 * 60;
              })
              ?.reduce((pre, item) => {
                pre += Number(item["reservation-people"]);
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
  console.log("after filter", reservation);
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.send(JSON.stringify(reservation));
});

module.exports = router;
