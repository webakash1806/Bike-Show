import Accessories from "../models/accessories.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";
import { fileUpload } from "../utils/fileUpload.utils.js";
import cloudinary from 'cloudinary';

const addAccessories = asyncHandler(async (req, res) => {
    const { accessoriesType, model, title, price, description } = req.body;
    const { _id } = req.user
    console.log(req.body)

    if (!req.file) {
        throw new AppError("Image is required", 400);
    }

    console.log(accessoriesType)
    console.log(model)


    let image = await fileUpload(req.file);

    const newAccessories = new Accessories({
        accessoriesType,
        model,
        title,
        image: {
            publicId: image.public_id,
            url: image.secure_url
        },
        price,
        description,
        addedBy: _id
    })

    await newAccessories.save()

    return res.status(200).json({
        success: true,
        message: "Accessories added",
        newAccessories
    })
})

const updateAccessories = asyncHandler(async (req, res) => {
    const { accessoriesType, model, modelName, title, price, description } = req.body;
    const { id } = req.params;
    const { _id } = req.user

    const accessories = await Accessories.findById(id);

    if (!accessories) {
        throw new AppError("Accessories not found", 400);
    }

    accessories.accessoriesType = await accessoriesType;
    accessories.model = await model;
    accessories.modelName = await modelName;
    accessories.title = await title;
    accessories.price = await price;
    accessories.description = await description;
    accessories.lastModifiedBy = _id

    if (req.file) {
        const image = await fileUpload(req.file, accessories.image.publicId);

        accessories.image = {
            publicId: image.public_id,
            url: image.secure_url
        }
    }

    await accessories.save()

    return res.status(200).json({
        success: true,
        message: "Accessories updated",
        accessories
    })
})

const deleteAccessories = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const accessories = await Accessories.findById(id);

    if (!accessories) {
        throw new AppError("Accessories not found", 400);
    }

    if (accessories.image.publicId) {
        await cloudinary.v2.uploader.destroy(accessories.image.publicId);
    }

    await Accessories.findByIdAndDelete(id)

    return res.status(200).json({
        success: true,
        message: "Accessories deleted"
    })
})

const getAllAccessories = asyncHandler(async (req, res) => {
    const { accessories = "" } = req.query

    if (accessories.toLowerCase() === "bike") {
        console.log("hello")
        const bikeAccessories = await Accessories.find({ accessoriesType: "BikeModelList" })
            .populate({
                path: "model",
                populate: {
                    path: "bike",
                },
            });
        return res.status(200).json({
            success: true,
            bikeAccessories
        })
    } else if (accessories.toLowerCase() === "scooty") {
        const scootyAccessories = await Accessories.find({ accessoriesType: "ScootyModel" })
            .populate({
                path: "model",
                populate: {
                    path: "scooty",
                },
            })
        return res.status(200).json({
            success: true,
            scootyAccessories
        })
    } else {

        const bikeAccessories = await Accessories.find({ accessoriesType: "BikeModelList" })
            .populate({
                path: "model",
                populate: {
                    path: "bike",
                },
            });


        const scootyAccessories = await Accessories.find({ accessoriesType: "ScootyModel" })
            .populate({
                path: "model",
                populate: {
                    path: "scooty",
                },
            })

        return res.status(200).json({
            success: true,
            bikeAccessories,
            scootyAccessories
        })
    }
})

const getAccessories = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const accessories = await Accessories.findById(id)

    if (!accessories) {
        throw new AppError("Accessories not found", 400);
    }

    res.status(200).json({
        success: true,
        accessories
    })
})

export { addAccessories, updateAccessories, deleteAccessories, getAllAccessories, getAccessories }