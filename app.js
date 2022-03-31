import bodyParser from "body-parser";
import express from "express";
import placesRouter from "./routes/places.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/places", placesRouter);

app.listen(5000);
