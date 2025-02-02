const { request, connection } = require("./common.cjs");
const dayjs = require("dayjs");
const express = require("express");
const lodash = require("lodash");
const router = express.Router();
router.get("/:id", async (req, res) => {
  const storeId = req.params.id;
  const [err, result] = await request("get", ["recommend_sights", "list"]);
  if (err) {
    res.sendStatus(500);
    res.send(JSON.stringify(err));
    return;
  }
  const { data = [{}] } = result;
  const ret = data
    .filter((item) => item.nearby_stores?.some((store) => store.id == storeId))
    .map((item) => {
      return {
        ...lodash.omit(item, "nearby_stores"),
        sight_img: item.sight_img?.guid,
      };
    });
  res.send(JSON.stringify(ret));
});

module.exports = router;
