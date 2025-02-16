import Contact from "../models/contact.model.js";
import ProductEnquiry from "../models/productEnquiry.model.js";
import TestDrive from "../models/testDriveForm.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";


const addProductEnquiryForm = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, model, dealer, category, message } = req.body


    if (!name || !email || !phoneNumber || !model || !dealer || !category) {
        throw new AppError("All fields are required", 400)
    }

    const productEnquiry = await ProductEnquiry.create({
        name,
        email,
        phoneNumber,
        model,
        dealer,
        category,
        message
    })

    if (!productEnquiry) {
        throw new AppError("Something went wrong!", 400)
    }

    res.status(200).json({
        success: true,
        message: "Product Enquiry sent successfully!",
    })
})

const updateProductEnquiryForm = asyncHandler(async (req, res) => {
    const { userId, status, id } = req.body

    const productEnquiry = await ProductEnquiry.findById(id)

    if (!productEnquiry) {
        throw new AppError("Product Enquiry not found", 400)
    }

    productEnquiry.handledBy = userId
    productEnquiry.status = status

    await productEnquiry.save()

    res.status(200).json({
        success: true,
        message: status === "Active" ? "Marked as active" : "Marked as resolved",
    })

})

const getAllProductEnquiryForm = asyncHandler(async (req, res) => {
    const isAdmin = req.user.role === 'ADMIN';
    const matchCondition = isAdmin ? {} : { handledBy: req.user._id };

    const { search, page = 1, status } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;
    const searchCondition = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { dealer: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ]
        }
        : {};
    const matchConditionWithStatus = {
        $and: [
            {
                $or: [
                    matchCondition,
                    { handledBy: { $exists: false } }
                ]
            },
            status ? { status } : {},
            searchCondition
        ]
    };
    const productEnquiry = await ProductEnquiry.aggregate([
        { $match: matchConditionWithStatus },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "handledBy",
                foreignField: "_id",
                as: "handledBy"
            }
        },
        {
            $unwind: {
                path: "$handledBy",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
    const total = await ProductEnquiry.countDocuments(matchConditionWithStatus);
    const pages = Math.ceil(total / limit);


    res.status(200).json({
        success: true,
        productEnquiry: productEnquiry.reverse(),
        totalPage: pages
    })


})

const getSingleProductEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params
    const productEnquiry = await ProductEnquiry.findById(id).populate("model").populate("handledBy")

    if (!productEnquiry) {
        throw new AppError("Enquiry is not available", 400)
    }


    res.status(200).json({
        success: true,
        productEnquiry
    })
})

const addTestDriveForm = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, model, dealer, vehicleType, message, date } = req.body


    if (!name || !email || !phoneNumber || !model || !dealer || !vehicleType || !date) {
        throw new AppError("All fields are required", 400)
    }

    const productEnquiry = await TestDrive.create({
        name,
        email,
        phoneNumber,
        model,
        dealer,
        category: vehicleType,
        message,
        date
    })

    if (!productEnquiry) {
        throw new AppError("Something went wrong!", 400)
    }

    res.status(200).json({
        success: true,
        message: "Test drive request sent successfully!",
    })
})

const updateTestDriveForm = asyncHandler(async (req, res) => {
    const { userId, status, id } = req.body

    const testDrive = await TestDrive.findById(id)

    if (!testDrive) {
        throw new AppError("Test Drive not found", 400)
    }

    testDrive.handledBy = userId
    testDrive.status = status

    await testDrive.save()

    res.status(200).json({
        success: true,
        message: status === "Active" ? "Marked as active" : "Marked as resolved",
    })

})

const getAllTestDriveForm = asyncHandler(async (req, res) => {
    const isAdmin = req.user.role === 'ADMIN';
    const matchCondition = isAdmin ? {} : { handledBy: req.user._id };

    const { search, page = 1, status } = req.query

    const limit = 50
    const skip = (page - 1) * limit

    const searchCondition = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { dealer: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ]
        }
        : {};

    const matchConditionWithStatus = {
        $and: [
            {
                $or: [
                    matchCondition,
                    { handledBy: { $exists: false } }
                ]
            },
            status ? { status } : {},
            searchCondition
        ]
    };

    const testDrive = await TestDrive.aggregate([
        { $match: matchConditionWithStatus },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "handledBy",
                foreignField: "_id",
                as: "handledBy"
            }
        },
        {
            $unwind: {
                path: "$handledBy",
                preserveNullAndEmptyArrays: true
            }
        }
    ])

    const total = await TestDrive.countDocuments(matchConditionWithStatus);
    const pages = Math.ceil(total / limit);

    res.status(200).json({
        success: true,
        testDrive: testDrive.reverse(),
        totalPage: pages
    })


})

const getSingleTestDriveForm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const testDrive = await TestDrive.findById(id).populate("handledBy").populate("model")

    if (!testDrive) {
        throw new AppError("Test Drive is not available", 400)
    }


    res.status(200).json({
        success: true,
        testDrive
    })
})

const addContactForm = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, dealer, message } = req.body


    if (!name || !email || !phoneNumber || !dealer || !message) {
        throw new AppError("All fields are required", 400)
    }

    const contactForm = await Contact.create({
        name,
        email,
        phoneNumber,
        dealer,
        message
    })

    if (!contactForm) {
        throw new AppError("Something went wrong!", 400)
    }

    res.status(200).json({
        success: true,
        message: "Contact form sent successfully!",
    })
})

const updateContactForm = asyncHandler(async (req, res) => {
    const { userId, status, id } = req.body

    const contactForm = await Contact.findById(id)

    if (!contactForm) {
        throw new AppError("Contact form not found", 400)
    }

    contactForm.handledBy = userId
    contactForm.status = status

    await contactForm.save()

    res.status(200).json({
        success: true,
        message: status === "Active" ? "Marked as active" : "Marked as resolved",
    })

})

const getAllContactForm = asyncHandler(async (req, res) => {
    const isAdmin = req.user.role === 'ADMIN';
    const matchCondition = isAdmin ? {} : { handledBy: req.user._id };

    const { search, page = 1, status } = req.query;
    const limit = 50;
    const skip = (page - 1) * limit;

    const searchCondition = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { dealer: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ]
        }
        : {};

    const matchConditionWithStatus = {
        $and: [
            {
                $or: [
                    matchCondition,
                    { handledBy: { $exists: false } }
                ]
            },
            status ? { status } : {},
            searchCondition
        ]
    };

    const contactForm = await Contact.aggregate([
        { $match: matchConditionWithStatus },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "handledBy",
                foreignField: "_id",
                as: "handledBy"
            }
        },
        {
            $unwind: {
                path: "$handledBy",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);


    const total = await Contact.countDocuments(matchConditionWithStatus);
    const pages = Math.ceil(total / limit);

    res.status(200).json({
        success: true,
        contactForm: contactForm.reverse(),
        totalPage: pages
    })


})

const getSingleContactForm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const contactForm = await Contact.findById(id).populate("handledBy")

    if (!contactForm) {
        throw new AppError("Contact form is not available", 400)
    }


    res.status(200).json({
        success: true,
        contactForm
    })
})

export {
    addProductEnquiryForm,
    updateProductEnquiryForm,
    getAllProductEnquiryForm,
    getSingleProductEnquiry,
    updateTestDriveForm,
    addTestDriveForm,
    getAllTestDriveForm,
    addContactForm,
    getAllContactForm,
    getSingleTestDriveForm,
    updateContactForm,
    getSingleContactForm
}