
import AppError from "../utils/error.utils.js";
import { fileUpload, multipleFileUpload } from "../utils/fileUpload.utils.js";
import cloudinary from 'cloudinary';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Scooty, ScootyModel } from "../models/scooty.model.js";
import { ScootySpecification } from "../models/specification.model.js";

const addScooty = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;

    const scooty = await Scooty.findOne({ name });

    if (scooty) {
        throw new AppError("Scooty already exists for this model", 400);
    }

    if (!req.file) {
        throw new AppError("Image is required", 400);
    }

    const scootyImg = await fileUpload(req.file);

    const newScooty = new Scooty({
        name,
        price,
        description,
        image: {
            publicId: scootyImg.public_id,
            url: scootyImg.secure_url
        },
        addedBy: req.user._id
    });

    await newScooty.save();

    await ScootyModel.create({
        scootyModel: name,
        scooty: newScooty._id
    })

    if (!newScooty) {
        throw new AppError("Something went wrong", 400);
    }

    res.status(200).json({
        success: true,
        message: "Scooty added successfully!",
        scooty: newScooty
    });
});

const updateScooty = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;

    const scooty = await Scooty.findById(id);

    console.log(scooty)

    if (!scooty) {
        throw new AppError("Scooty not found for this model", 400);
    }

    if (scooty.name !== name) {
        const uniqueScooty = await Scooty.findOne({ name });
        if (uniqueScooty) {
            throw new AppError("Scooty already exists for this model", 400);
        }
    }

    scooty.name = await name;
    scooty.price = await price;
    scooty.description = await description;
    scooty.lastModifiedBy = req.user._id

    if (req.file) {
        const scootyImg = await fileUpload(req.file, scooty.image.publicId);

        scooty.image = {
            publicId: scootyImg.public_id,
            url: scootyImg.secure_url
        }
    }

    await scooty.save()

    if (name) {
        const scootyModel = await ScootyModel.findOne({ scooty: id });
        scootyModel.scootyModel = await name;
        await scootyModel.save();
    }

    res.status(200).json({
        success: true,
        message: "Scooty updated successfully!",
        scooty
    })
});

const deleteScooty = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const scooty = await Scooty.findById(id);

    if (!scooty) {
        throw new AppError("Scooty not found", 400);
    }

    if (scooty.image.publicId) {
        await cloudinary.v2.uploader.destroy(scooty.image.publicId);
    }

    if (scooty.features.length > 0) {
        scooty.features.map(async feature => {
            if (feature.featureImg.publicId) {
                await cloudinary.v2.uploader.destroy(feature.featureImg.publicId);
            }
        });
    }

    if (scooty.colors.length > 0) {
        scooty.colors.map(async color => {
            if (color.colorScootyImg.publicId) {
                await cloudinary.v2.uploader.destroy(color.colorScootyImg.publicId);
            }
        });
    }

    if (scooty.specification) await ScootySpecification.findByIdAndDelete(scooty.specification);
    await ScootyModel.findOneAndDelete({ scooty: id });

    await Scooty.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Scooty deleted successfully!"
    })
});

const getAllScooty = asyncHandler(async (req, res) => {
    const { search, page = 1 } = req.query
    console.log(req.query)
    const searchCondition = search ? { name: { $regex: search, $options: "i" } } : {};

    const limit = 5;
    const skip = (page - 1) * limit;

    const scooty = await Scooty.find(searchCondition)
        .populate("specification")
        .skip(skip)
        .limit(limit);

    const scootyCount = await Scooty.countDocuments(searchCondition);

    res.status(200).json({
        success: true,
        scooty,
        totalPage: Math.ceil(scootyCount / limit)
    });
});

const getScooty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const scooty = await Scooty.findById(id).populate("specification");

    if (!scooty) {
        throw new AppError("Scooty not found", 400);
    }

    res.status(200).json({
        success: true,
        scooty
    });
});

const addOrUpdateSpecs = asyncHandler(async (req, res) => {
    const { scootyId, bodyDimensions, engine, transmission, tyresAndBrakes, frameAndSuspension, electronics } = req.body.specs;

    const scooty = await Scooty.findById(scootyId);
    if (!scooty) {
        throw new AppError("Scooty not found", 400);
    }

    let scootySpec = await ScootySpecification.findOne({ scooty: scootyId });
    console.log(scootySpec)
    if (scootySpec) {
        // Update existing specifications
        scootySpec.bodyDimensions = {
            length: bodyDimensions.length,
            width: bodyDimensions.width,
            height: bodyDimensions.height,
            wheelBox: bodyDimensions.wheelBox,
            groundClearance: bodyDimensions.groundClearance,
            seatHeight: bodyDimensions.seatHeight,
            seatLength: bodyDimensions.seatLength,
            kerbWeight: bodyDimensions.kerbWeight,
            fuelCapacity: bodyDimensions.fuelCapacity,
        };
        scootySpec.engine = {
            engineType: engine.engineType,
            displacement: engine.displacement,
            maxPower: engine.maxPower,
            maxRpm: engine.maxRpm,
            maxTorque: engine.maxTorque,
            mileage: engine.mileage,
            compressionRatio: engine.compressionRatio,
            bore: engine.bore,
            stroke: engine.stroke,
            startingMethod: engine.startingMethod,
            fuelSystem: engine.fuelSystem,
            airFilterType: engine.airFilterType
        };
        scootySpec.transmission = {
            clutchType: transmission.clutchType,
            noOfGears: transmission.noOfGears,
        };
        scootySpec.tyresAndBrakes = {
            tyreType: tyresAndBrakes.tyreType,
            frontTyre: tyresAndBrakes.frontTyre,
            rearTyre: tyresAndBrakes.rearTyre,
            frontBrake: tyresAndBrakes.frontBrake,
            rearBrake: tyresAndBrakes.rearBrake
        };
        scootySpec.frameAndSuspension = {
            frameType: frameAndSuspension.frameType,
            frontSuspension: frameAndSuspension.frontSuspension,
            rearSuspension: frameAndSuspension.rearSuspension
        };
        scootySpec.electronics = {
            headLights: electronics.headLights,
            tailLights: electronics.tailLights,
            winkers: electronics.winkers,
            battery: electronics.battery
        };

        await scootySpec.save();
    } else {
        scootySpec = await ScootySpecification.create({
            scooty: scootyId,
            bodyDimensions: {
                length: bodyDimensions.length,
                width: bodyDimensions.width,
                height: bodyDimensions.height,
                wheelBox: bodyDimensions.wheelBox,
                groundClearance: bodyDimensions.groundClearance,
                seatHeight: bodyDimensions.seatHeight,
                seatLength: bodyDimensions.seatLength,
                kerbWeight: bodyDimensions.kerbWeight,
                fuelCapacity: bodyDimensions.fuelCapacity,
            },
            engine: {
                engineType: engine.engineType,
                displacement: engine.displacement,
                maxPower: engine.maxPower,
                maxRpm: engine.maxRpm,
                maxTorque: engine.maxTorque,
                mileage: engine.mileage,
                compressionRatio: engine.compressionRatio,
                bore: engine.bore,
                stroke: engine.stroke,
                startingMethod: engine.startingMethod,
                fuelSystem: engine.fuelSystem,
                airFilterType: engine.airFilterType
            },
            transmission: {
                clutchType: transmission.clutchType,
                noOfGears: transmission.noOfGears,
            },
            tyresAndBrakes: {
                tyreType: tyresAndBrakes.tyreType,
                frontTyre: tyresAndBrakes.frontTyre,
                rearTyre: tyresAndBrakes.rearTyre,
                frontBrake: tyresAndBrakes.frontBrake,
                rearBrake: tyresAndBrakes.rearBrake
            },
            frameAndSuspension: {
                frameType: frameAndSuspension.frameType,
                frontSuspension: frameAndSuspension.frontSuspension,
                rearSuspension: frameAndSuspension.rearSuspension
            },
            electronics: {
                headLights: electronics.headLights,
                tailLights: electronics.tailLights,
                winkers: electronics.winkers,
                battery: electronics.battery
            }
        });

        // Link the new specifications to the scooty
        scooty.specification = scootySpec._id;
        scooty.lastModifiedBy = req.user._id
        await scooty.save();
    }

    res.status(200).json({
        success: true,
        message: scootySpec ? "Specifications updated" : "Specifications added",
        scootySpec
    });
});

const addOrUpdateOthers = asyncHandler(async (req, res) => {
    const { scootyId, colors: colorsString, features: featuresString } = req.body;
    const colors = JSON.parse(colorsString);
    const features = JSON.parse(featuresString);
    console.log(scootyId)
    const scooty = await Scooty.findById(scootyId);

    if (!scooty) {
        throw new AppError("Scooty not found", 400);
    }

    let uploadedFiles = []
    if (req?.files?.colorImg) {
        uploadedFiles = await multipleFileUpload(req?.files?.colorImg);
    }
    console.log("bscgaygwyx", uploadedFiles)
    colors.forEach(color => {
        let existingColor = scooty.colors.find(c => c.uniqueId === color.uniqueId);
        if (!existingColor) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === color.uniqueId);
            if (uploadedFile) {
                scooty.colors.push({ ...color, colorScootyImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingColor.uniqueId);
            console.log("hello")
            if (uploadedFile) {
                console.log("1")
                console.log(color)
                existingColor.colorName = color.colorName;
                existingColor.colorCode = color.colorCode;
                existingColor.colorScootyImg = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
            } else {
                console.log(2)
                existingColor.colorName = color.colorName;
                existingColor.colorCode = color.colorCode;
            }
        }
    });


    scooty.colors = scooty.colors.filter(existingColor => {
        return colors.some(color => color.uniqueId === existingColor.uniqueId);
    });


    let uploadedFeatureFiles = []
    if (req?.files?.featureImg) {
        uploadedFeatureFiles = await multipleFileUpload(req?.files?.featureImg);
    }

    features.forEach(feature => {
        let existingFeature = scooty.features.find(c => c.uniqueId === feature.uniqueId);
        if (!existingFeature) {
            const uploadedFile = uploadedFeatureFiles.find(uf => uf.uniqueId === feature.uniqueId);
            if (uploadedFile) {
                scooty.features.push({ ...feature, featureImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFeatureFiles.find(uf => uf.uniqueId === existingFeature.uniqueId);
            if (uploadedFile) {
                existingFeature.title = feature.title;
                existingFeature.featureImg = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
            } else {
                existingFeature.title = feature.title;
            }
        }
    });


    scooty.features = scooty.features.filter(existingFeature => {
        return features.some(feature => feature.uniqueId === existingFeature.uniqueId);
    });

    scooty.lastModifiedBy = req.user._id
    await scooty.save();


    res.status(200).json({
        success: true,
        message: "Colors added/updated successfully!",
        colors: scooty.colors
    });
});

const getAllScootyModelsList = asyncHandler(async (req, res) => {
    const scooty = await ScootyModel.find();

    res.status(200).json({
        success: true,
        scooty
    });
});

const getAllLimitedScootyData = asyncHandler(async (req, res) => {
    console.log(1)
    const scootyData = await Scooty.aggregate([
        {
            $lookup: {
                from: 'scootyspecifications',
                localField: 'specification',
                foreignField: '_id',
                as: 'specification'
            }
        },
        {
            $unwind: '$specification'
        },
        {
            $project: {
                name: '$name',
                price: '$price',
                image: '$image.url',
                mileage: '$specification.engine.mileage',
                displacement: '$specification.engine.displacement',
                weight: '$specification.bodyDimensions.kerbWeight'
            }
        }
    ])

    console.log(scootyData)

    res.status(200).json({
        success: true,
        scootyData
    })
})


export { addScooty, updateScooty, deleteScooty, getScooty, getAllLimitedScootyData, getAllScooty, addOrUpdateSpecs, addOrUpdateOthers, getAllScootyModelsList };
