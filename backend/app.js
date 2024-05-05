import "dotenv/config";
import express from "express";
const app = express();

app.use(express.static("public"));

app.use(express.json());

import session from "express-session";
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


import pagesRouter from "./routers/pagesRouter.js";
app.use(pagesRouter);
import registerRouter from "./routers/registerRouter.js";
app.use(registerRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
