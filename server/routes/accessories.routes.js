import { Router } from "express";
import { addAccessories, deleteAccessories, getAccessories, getAllAccessories, updateAccessories } from "../controllers/accessories.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/').get(getAllAccessories).post(upload.single("image"), addAccessories)

router.route('/:id').get(getAccessories).delete(deleteAccessories).put(upload.single("image"), updateAccessories)

export default router