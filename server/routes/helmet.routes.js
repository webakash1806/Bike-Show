import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { addHelmet, getAllHelmets, updateHelmets } from "../controllers/helmet.controller.js";

const router = Router()

router.route('/').get(getAllHelmets).post(upload.fields([{ name: 'helmetImg', maxCount: 20 }]), addHelmet)

router.route('/:id').put(upload.array("helmetImg"), updateHelmets)

export default router