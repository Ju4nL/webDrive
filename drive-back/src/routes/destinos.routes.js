import express from "express";
import { addDestination, getDestinations ,updateDestinationStatus} from "../controllers/destinos.controller.js";

const router = express.Router();

router.get("/:rideId", getDestinations);
router.post("/", addDestination);
router.put('/:id/status', updateDestinationStatus);

export default router;
