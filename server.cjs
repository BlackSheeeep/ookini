const { createRequestHandler } = require("@remix-run/express");
const express = require("express");
const reservationRoutes = require("./routes/reservation.cjs");
const recommendSightsRoutes = require("./routes/recommend_sights.cjs");
const feeplanningRoutes = require("./routes/feeplanning.cjs");
const storesRoutes = require("./routes/stores.cjs");
const axios = require("axios");
(async function () {
  const viteDevServer =
    process.env.NODE_ENV === "production"
      ? null
      : await import("vite").then((vite) =>
          vite.createServer({
            server: { middlewareMode: true },
          })
        );

  const app = express();
  app.use("/api/res", reservationRoutes);
  app.use("/api/recommend_sights", recommendSightsRoutes);
  app.use("/api/feeplannings", feeplanningRoutes);
  app.use("/api/stores", storesRoutes);
  // app.use("/wp-json/wp/v2", async (req, res) => {
  //   const method = req.method.toLowerCase();
  //   console.log(req.baseUrl);
  //   const result = await axios[method](
  //     `https://wp.address-ookini.com/${req.baseUrl}`
  //   );
  //   console.log("result", JSON.stringify(result.data));
  //   res.send(JSON.stringify(result));
  // });
  app.use(
    viteDevServer ? viteDevServer.middlewares : express.static("build/client")
  );

  const build = viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js");

  app.all("*", createRequestHandler({ build }));

  app.listen(3000, () => {
    console.log("App listening on http://localhost:3000");
  });
})();
