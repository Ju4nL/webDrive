import express from "express" 
import {  getRides,updateRideDriver } from "../controllers/carrera.controller.js";

const router = express.Router(); 

router.get("/",getRides);
router.put('/update-driver', updateRideDriver);

export default router;
