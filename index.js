import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ownersRoutes from "./routes/owners.routes.js";
import { dbConnection } from "./config/db.js";
import petsRoutes from "./routes/pets.routes.js";
import vetsRoutes from "./routes/vets.routes.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Prueba del Index");
});

app.use(cors());
app.use(bodyParser());

app.use("/owners", ownersRoutes);
app.use("/pets", petsRoutes);
app.use("/vets", vetsRoutes);

try {
  dbConnection.authenticate();
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
