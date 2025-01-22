const { request, connection } = require("./common.cjs");
const dayjs = require("dayjs");
function getHitDays(from_date, to_date, timeArray) {
  // 将日期字符串转换为 Date 对象
  const fromDate = new Date(from_date);
  const toDate = new Date(to_date);

  // 获取 from_date 的日期部分（去掉时间）
  const startDate = new Date(fromDate);
  startDate.setHours(0, 0, 0, 0);

  // 获取 to_date 的日期部分（去掉时间）
  const endDate = new Date(toDate);
  endDate.setHours(0, 0, 0, 0);

  // 从时间数组中找出最大时间
  const maxTime = Math.max(
    ...timeArray.map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes; // 将时间转换为分钟数
    })
  );

  // 判断 to_date 的时间部分是否大于最大时间
  const toDateHours = toDate.getHours();
  const toDateMinutes = toDate.getMinutes();
  const toDateTime = toDateHours * 60 + toDateMinutes; // 将 to_date 的时间转换为分钟数

  if (toDateTime <= maxTime) {
    // 如果 to_date 的时间部分小于或等于最大时间，则不计入最后一天
    endDate.setDate(endDate.getDate() - 1);
  }

  // 存储命中的天数
  const hitDays = [];

  // 循环遍历每一天
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    hitDays.push(`${year}-${month}-${day}`); // 格式化为 "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1); // 增加一天
  }

  return hitDays;
}
function isTimeInRange(targetTime, from_date, to_date) {
  // 将目标时间、from_date 和 to_date 转换为 dayjs 对象
  const target = dayjs(targetTime);
  const from = dayjs(from_date);
  const to = dayjs(to_date);

  // 判断目标时间是否在 from_date 和 to_date 之间
  return target.isAfter(from) && target.isBefore(to);
}
// 调用函数
const express = require("express");
const router = express.Router();
router.get("/disabled_date", async (req, res) => {
  const { data = [{}] } = await request("get", ["reservation", "config"]);
  const { disabled_date, reservation_times } = data[0];
  const ret = [];
  disabled_date.forEach((item) => {
    const { from_date, to_date } = item;
    const hitDays = getHitDays(
      from_date,
      to_date,
      reservation_times.map((item) => item.reservation_time)
    );

    ret.push(...hitDays);
  });
  res.send(JSON.stringify(ret));
});
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
  const { reservation_times = [], disabled_date } = data[0];
  const reservation = Array.isArray(data)
    ? reservation_times.map((item) => {
        const totalTime = date + " " + item["reservation_time"] || "";
        const isDisabled = disabled_date.some((disabled) =>
          isTimeInRange(totalTime, disabled.from_date, disabled.to_date)
        );
        const sum = date
          ? reservations
              .filter((reserve) => {
                return reserve["store_id"] === storeId;
              })
              .filter((reserve) => {
                const time = new Date(reserve["reservation_date"] || "");
                const configTime = new Date(totalTime);
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
          disabled: isDisabled,
        };
      })
    : undefined;

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.send(JSON.stringify(reservation));
});

module.exports = router;
