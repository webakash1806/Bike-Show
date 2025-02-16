import { Router } from "express";
import { searchQuery, addNewsletter, addBanner, updateBanner, deleteBanner, getBanner, verifyRecaptcha } from "../controllers/miscellaneous.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router()

router.get("/search", searchQuery)
router.post("/newsletter", addNewsletter)

router.route("/banner").get(getBanner).post(upload.single("image"), addBanner)
router.route("/banner/:id").delete(deleteBanner).put(upload.single("image"), updateBanner)

router.post("/verify-captcha", verifyRecaptcha)

export default router