import "dotenv/config";
import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.json());

import session from "express-session";
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});
app.use(sessionMiddleware)


import http from "http";
const server = http.createServer(app);
import setupSocketServer from "./util/sockets.js";
setupSocketServer(server, sessionMiddleware);




import pagesRouter from "./routers/pagesRouter.js";
app.use(pagesRouter);
import registerRouter from "./routers/registerRouter.js";
app.use(registerRouter);

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
