const { request, connection } = require("./common.cjs");
const express = require("express");
const lodash = require("lodash");
const router = express.Router();
router.get("/group_by_area/:area_id", async (req, res) => {
  const area_id = req.params.area_id;
  const [err, result] = await request("get", ["stores", "list"]);
  if (err) {
    result.sendStatus(500);
    result.send(JSON.stringify(err));
    return;
  }
  const { data = [{}] } = result;
  const temp = data.filter((store) => {
    return store.area[0].id == area_id;
  });
  const ret = temp.map((item) => lodash.omit(item, "feeplannings"));
  res.send(JSON.stringify(ret));
});

router.get("/group_by_store/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  const [err, result] = await request("get", ["feeplannings", "list"]);
  if (err) {
    res.sendStatus(500);
    res.send(JSON.stringify(err));
    return;
  }
  const { data = [{}] } = result;
  const temp = data.filter((fee_planning) => {
    return !!fee_planning.belong_stores.find((store) => {
      return store.id == store_id;
    });
  });
  const ret = temp.map((item) => lodash.omit(item, "belong_stores"));
  res.send(JSON.stringify(ret));
});

module.exports = router;
