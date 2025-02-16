import { Router } from "express";
import { addContactForm, addProductEnquiryForm, addTestDriveForm, getAllContactForm, getAllProductEnquiryForm, getAllTestDriveForm, getSingleContactForm, getSingleProductEnquiry, getSingleTestDriveForm, updateContactForm, updateProductEnquiryForm, updateTestDriveForm } from "../controllers/form.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/product-enquiry', addProductEnquiryForm)
router.put('/product-enquiry', updateProductEnquiryForm)
router.get('/product-enquiry/:id', getSingleProductEnquiry)
router.get('/product-enquiry', verifyJWT, getAllProductEnquiryForm)
router.post('/test-drive', addTestDriveForm)
router.put('/test-drive', updateTestDriveForm)
router.get('/test-drive/:id', getSingleTestDriveForm)
router.get('/test-drive', verifyJWT, getAllTestDriveForm)
router.post('/contact', addContactForm)
router.put('/contact', updateContactForm)
router.get('/contact/:id', getSingleContactForm)
router.get('/contact', verifyJWT, getAllContactForm)
router.get('/contact', getAllContactForm)


export default router