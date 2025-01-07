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
  const { data } = await request("get", ["reservation", "config"]);
  const { data: reservations } = await request("get", [
    "reservation",
    "metadata",
  ]);
  console.log("res", reservations);
  const reservation = Array.isArray(data)
    ? data.map((item) => ({
        max_reservation: item.max_reservation,
        id: item.id,
        reservation_time: item.reservation_time,
      }))
    : undefined;

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.send(JSON.stringify(reservation));
});

module.exports = router;
