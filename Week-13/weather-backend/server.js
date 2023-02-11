import express from "express";
import config from "./constants.js";
import router from "./router/router.js";

const app = express();
const port = config.PORT;

app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}..`));
