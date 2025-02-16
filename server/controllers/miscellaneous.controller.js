import { Bike } from "../models/bike.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Scooty } from "../models/scooty.model.js"
import Helmet from "../models/helmet.model.js"
import Accessories from "../models/accessories.model.js";
import { HeroBanner, Newsletter } from "../models/miscellaneous.model.js";
import AppError from "../utils/error.utils.js";
import { fileUpload } from "../utils/fileUpload.utils.js";
import cloudinary from 'cloudinary';
import fetch from "node-fetch";

const searchQuery = asyncHandler(async (req, res) => {
    const { search } = req.query

    const searchPattern = search
        .replace(/[.*+"'?^${}()|[\]{}\\]/g, '')
        .split("")
        .join(".*?");

    const queryParam = {
        $or: [
            { name: { $regex: searchPattern, $options: "i" } },
            { title: { $regex: searchPattern, $options: "i" } },
            { description: { $regex: searchPattern, $options: "i" } },
            { "helmet.colorName": { $regex: searchPattern, $options: "i" } },
        ]
    }

    const bikes = await Bike.aggregate([
        {
            $match: queryParam
        },
        {
            $addFields: {
                similarity: {
                    $cond: {
                        if: {
                            $or: [
                                { $regexMatch: { input: "$name", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$title", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$description", regex: searchPattern, options: "i" } }
                            ]
                        },
                        then: 1,
                        else: 0,
                    },
                },
            },
        },
        {
            $sort: { similarity: -1 },
        },
        {
            $project: {
                image: "$image.url",
                name: "$name",
                category: "Bike"
            }
        }
    ]);

    const scooty = await Scooty.aggregate([
        {
            $match: queryParam
        },
        {
            $addFields: {
                similarity: {
                    $cond: {
                        if: {
                            $or: [
                                { $regexMatch: { input: "$name", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$title", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$description", regex: searchPattern, options: "i" } }
                            ]
                        },
                        then: 1,
                        else: 0,
                    },
                },
            },
        },
        {
            $sort: { similarity: -1 },
        },
        {
            $project: {
                image: "$image.url",
                name: "$name",
                category: "Scooty"
            }
        }
    ]);

    const helmet = await Helmet.aggregate([
        {
            $unwind: "$helmet"
        },
        {
            $match: {
                $or: [
                    { "helmet.title": { $regex: searchPattern, $options: "i" } },
                    { "helmet.colorName": { $regex: searchPattern, $options: "i" } },
                ]
            }
        },
        {
            $addFields: {
                similarity: {
                    $cond: {
                        if: {
                            $or: [
                                { $regexMatch: { input: "$helmet.title", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$helmet.colorName", regex: searchPattern, options: "i" } },
                            ]
                        },
                        then: 1,
                        else: 0,
                    },
                },
            },
        },
        {
            $sort: { similarity: -1 },
        },
        {
            $project: {
                image: "$helmet.helmetImg.url",
                title: "$helmet.title",
                category: "Helmet"
            }
        }
    ]);

    const accessories = await Accessories.aggregate([
        {
            $match: queryParam
        },
        {
            $addFields: {
                similarity: {
                    $cond: {
                        if: {
                            $or: [
                                { $regexMatch: { input: "$title", regex: searchPattern, options: "i" } },
                                { $regexMatch: { input: "$description", regex: searchPattern, options: "i" } }
                            ]
                        },
                        then: 1,
                        else: 0,
                    },
                },
            },
        },
        {
            $sort: { similarity: -1 },
        },
        {
            $project: {
                image: "$image.url",
                title: "$title",
                category: "Accessories"
            }
        }
    ]);

    const result = [...bikes, ...scooty, ...helmet, ...accessories]

    res.status(200).json({
        success: true,
        result
    });
})

const addNewsletter = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new AppError("Email is required", 400)
    }

    const uniqueEmail = await Newsletter.findOne({ email })
    if (uniqueEmail) {
        throw new AppError("Already subscribed!", 400)
    }

    const newsletter = await Newsletter.create({
        email
    })

    if (!newsletter) {
        throw new AppError("Something went wrong", 400)
    }

    res.status(200).json({
        success: true,
        message: "Newsletter added",
    });
})

const addBanner = asyncHandler(async (req, res) => {

    let uploadedFiles
    console.log(req.file)
    if (req.file) {
        uploadedFiles = await fileUpload(req.file)
    }
    console.log(uploadedFiles)
    const addBanner = await HeroBanner.create({
        image: {
            publicId: uploadedFiles.public_id,
            url: uploadedFiles.secure_url
        }
    })

    if (!addBanner) {
        throw new AppError("Something went wrong", 400)
    }

    res.status(200).json({
        success: true,
        message: "Banner added",
    });
})

const updateBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const banner = await HeroBanner.findById(id);

    if (!banner) {
        throw new AppError("Banner not found", 400);
    }

    console.log(banner)

    let image

    console.log(req.file)

    if (req.file) {
        image = await fileUpload(req.file, banner.image.publicId);
    }

    console.log(image)

    banner.image = {
        publicId: image.public_id,
        url: image.secure_url
    }

    await banner.save()

    res.status(200).json({
        success: true,
        message: "Banner updated",
        banner
    })
})

const deleteBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const banner = await HeroBanner.findById(id);

    if (!banner) {
        throw new AppError("Banner not found", 400);
    }

    if (banner.image.publicId) {
        await cloudinary.uploader.destroy(banner.image.publicId)
    }

    await banner.deleteOne()

    res.status(200).json({
        success: true,
        message: "Banner deleted"
    })
})

const getBanner = asyncHandler(async (req, res) => {
    const banner = await HeroBanner.find({});

    res.status(200).json({
        success: true,
        banner
    })
})

const verifyRecaptcha = (async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });


    const data = await response.json();

    console.log(data?.score)

    if (data.success && data.score > 0.5) {
        res.json({ success: true });
    } else {
        res.status(403).json({ success: false, message: "Failed reCAPTCHA verification", score: data.score });
    }
});


export { searchQuery, addNewsletter, addBanner, updateBanner, verifyRecaptcha, deleteBanner, getBanner }