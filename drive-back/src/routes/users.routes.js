import express from "express" 
import { getUser ,getDrivers} from "../controllers/user.controller.js";

const router = express.Router(); 

router.get("/find/:userId", getUser);
router.get("/drivers", getDrivers);

export default router;
