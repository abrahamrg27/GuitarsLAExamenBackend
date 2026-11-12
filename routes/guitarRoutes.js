import { Router } from "express";
import { createGuitar, getGuitars } from "../controllers/guitarController.js";

const guitarRoutes = Router();

guitarRoutes.get("/", getGuitars);
guitarRoutes.post("/", createGuitar);

export default guitarRoutes;
