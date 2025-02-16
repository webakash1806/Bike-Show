import { Router } from "express";
import { addBike, addOrUpdateOthers, addOrUpdateSpecs, deleteBike, getAllBikeModelsList, getAllBikes, getAllLimitedBikesData, getBike, updateBike } from "../controllers/bike.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const bikeRouter = Router()

bikeRouter.route('/').get(getAllBikes).post(upload.single('image'), addBike)
bikeRouter.route('/limited/all-bike').get(getAllLimitedBikesData)
bikeRouter.route('/model').get(getAllBikeModelsList)
bikeRouter.route('/:id').get(getBike).delete(deleteBike).put(upload.single('image'), verifyJWT, updateBike)
bikeRouter.route('/specs').post(addOrUpdateSpecs)
bikeRouter.route('/others').post(upload.fields([{ name: 'colorImg', maxCount: 20 }, { name: 'featureImg', maxCount: 20 }]), addOrUpdateOthers)

export default bikeRouter