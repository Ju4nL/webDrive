import express from "express" 
import { createWaitTime } from "../controllers/tiemposEspera.controller.js";

const router = express.Router(); 

router.post('/', createWaitTime);

export default router;
