import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { addOrUpdateOthers, addOrUpdateSpecs, addScooty, deleteScooty, getAllLimitedScootyData, getAllScooty, getAllScootyModelsList, getScooty, updateScooty } from "../controllers/scooty.controller.js";

const scootyRouter = Router()

scootyRouter.route('/').get(getAllScooty).post(upload.single('image'), addScooty)
scootyRouter.route('/specs').post(addOrUpdateSpecs)
scootyRouter.route('/model').get(getAllScootyModelsList)
scootyRouter.route('/:id').get(getScooty).delete(deleteScooty).put(upload.single('image'), updateScooty)
scootyRouter.route('/others').post(upload.fields([{ name: 'colorImg', maxCount: 20 }, { name: 'featureImg', maxCount: 30 }]), addOrUpdateOthers)
scootyRouter.route('/limited/all-scooty').get(getAllLimitedScootyData)

export default scootyRouter