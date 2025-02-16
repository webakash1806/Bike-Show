import { Bike, BikeModelList } from "../models/bike.model.js";
import AppError from "../utils/error.utils.js";
import { fileUpload, multipleFileUpload } from "../utils/fileUpload.utils.js";
import cloudinary from 'cloudinary';
import { BikeSpecification } from "../models/specification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addBike = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;
    const { _id } = req.user

    console.log(req.body)

    const bike = await Bike.findOne({ name });

    if (bike) {
        throw new AppError("Bike already exists for this model", 400);
    }


    if (!req.file) {
        throw new AppError("Image is required", 400);
    }

    const bikeImg = await fileUpload(req.file);

    const newBike = new Bike({
        name,
        price,
        description,
        image: {
            publicId: bikeImg.public_id,
            url: bikeImg.secure_url
        },
        addedBy: _id
    });

    await newBike.save();

    await BikeModelList.create({
        bikeModel: name,
        bike: newBike._id
    })

    if (!newBike) {
        throw new AppError("Something went wrong", 400);
    }

    res.status(200).json({
        success: true,
        message: "Bike added successfully!",
        bike: newBike
    });
});

const updateBike = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;
    const { _id } = req.user
    const bike = await Bike.findById(id);

    if (!bike) {
        throw new AppError("Bike not found", 400);
    }

    if (name !== bike.name) {
        const uniqueBike = await Bike.findOne({ name });
        if (uniqueBike) {
            throw new AppError("Bike already exists for this model", 400);
        }
    }

    bike.name = await name;
    bike.price = await price;
    bike.description = await description;
    bike.lastModifiedBy = await _id;

    if (req.file) {
        const bikeImg = await fileUpload(req.file, bike.image.publicId);

        bike.image = {
            publicId: bikeImg.public_id,
            url: bikeImg.secure_url
        }
    }

    await bike.save()

    if (name) {
        const bikeModel = await BikeModelList.findOne({ bike: id });
        bikeModel.bikeModel = await name;
        await bikeModel.save();
    }

    res.status(200).json({
        success: true,
        message: "Bike updated successfully!",
        bike
    })
});

const deleteBike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const bike = await Bike.findById(id);
    if (!bike) {
        throw new AppError("Bike not found", 400);
    }

    if (bike.image.publicId) {
        await cloudinary.v2.uploader.destroy(bike.image.publicId);
    }

    if (bike.features.length > 0) {
        bike.features.map(async feature => {
            if (feature.featureImg.publicId) {
                await cloudinary.v2.uploader.destroy(feature.featureImg.publicId);
            }
        });
    }

    if (bike.colors.length > 0) {
        bike.colors.map(async color => {
            if (color.colorBikeImg.publicId) {
                await cloudinary.v2.uploader.destroy(color.colorBikeImg.publicId);
            }
        });
    }

    if (bike.specification) await BikeSpecification.findByIdAndDelete(bike.specification);
    await BikeModelList.findOneAndDelete({ bike: id });

    await Bike.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Bike deleted successfully!"
    })
});

const getAllBikes = asyncHandler(async (req, res) => {
    const { search, page = 1 } = req.query
    console.log(req.query)
    const searchCondition = search ? { name: { $regex: search, $options: "i" } } : {};

    const limit = 5;
    const skip = (page - 1) * limit;

    const bikes = await Bike.find(searchCondition)
        .populate("specification")
        .skip(skip)
        .limit(limit);

    const bikesCount = await Bike.countDocuments(searchCondition);

    res.status(200).json({
        success: true,
        bikes,
        totalPage: Math.ceil(bikesCount / limit)
    });
});

const getBike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("object")
    console.log(1)
    const bike = await Bike.findById(id).populate("specification");

    if (!bike) {
        throw new AppError("Bike not found", 400);
    }

    res.status(200).json({
        success: true,
        bike,
    });
});

const getAllLimitedBikesData = asyncHandler(async (req, res) => {
    const bikeData = await Bike.aggregate([
        {
            $lookup: {
                from: 'bikespecifications',
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

    res.status(200).json({
        success: true,
        bikeData
    })
})

const addOrUpdateSpecs = asyncHandler(async (req, res) => {
    const { bikeId, bodyDimensions, engine, transmission, tyresAndBrakes, frameAndSuspension, electronics } = req.body.specs;

    const bike = await Bike.findById(bikeId);
    if (!bike) {
        throw new AppError("Bike not found", 400);
    }

    let bikeSpec = await BikeSpecification.findOne({ bike: bikeId });
    console.log(bikeSpec)
    if (bikeSpec) {
        bikeSpec.bodyDimensions = {
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
        bikeSpec.engine = {
            engineType: engine.engineType,
            displacement: engine.displacement,
            maxPower: engine.maxPower,
            mileage: engine.mileage,
            maxRpm: engine.maxRpm,
            maxTorque: engine.maxTorque,
            compressionRatio: engine.compressionRatio,
            bore: engine.bore,
            stroke: engine.stroke,
            startingMethod: engine.startingMethod,
            fuelSystem: engine.fuelSystem,
        };
        bikeSpec.transmission = {
            clutchType: transmission.clutchType,
            noOfGears: transmission.noOfGears,
        };
        bikeSpec.tyresAndBrakes = {
            frontTyre: tyresAndBrakes.frontTyre,
            rearTyre: tyresAndBrakes.rearTyre,
            frontBrake: tyresAndBrakes.frontBrake,
            rearBrake: tyresAndBrakes.rearBrake
        };
        bikeSpec.frameAndSuspension = {
            frameType: frameAndSuspension.frameType,
            frontSuspension: frameAndSuspension.frontSuspension,
            rearSuspension: frameAndSuspension.rearSuspension
        };
        bikeSpec.electronics = {
            headLights: electronics.headLights,
            tailLights: electronics.tailLights,
            winkers: electronics.winkers,
            battery: electronics.battery
        };

        await bikeSpec.save();
    } else {
        bikeSpec = await BikeSpecification.create({
            bike: bikeId,
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
                mileage: engine.mileage,
                maxTorque: engine.maxTorque,
                compressionRatio: engine.compressionRatio,
                bore: engine.bore,
                stroke: engine.stroke,
                startingMethod: engine.startingMethod,
                fuelSystem: engine.fuelSystem,
            },
            transmission: {
                clutchType: transmission.clutchType,
                noOfGears: transmission.noOfGears,
            },
            tyresAndBrakes: {
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

        // Link the new specifications to the bike
        bike.specification = bikeSpec._id;
        bike.lastModifiedBy = req.user._id;
        await bike.save();
    }

    res.status(200).json({
        success: true,
        message: bikeSpec ? "Specifications updated" : "Specifications added",
        bikeSpec
    });
});

const addOrUpdateOthers = asyncHandler(async (req, res) => {
    const { bikeId, colors: colorsString, features: featuresString } = req.body;
    const colors = JSON.parse(colorsString);
    const features = JSON.parse(featuresString);
    console.log(bikeId)
    const bike = await Bike.findById(bikeId);

    if (!bike) {
        throw new AppError("Bike not found", 400);
    }

    let uploadedFiles = []
    if (req?.files?.colorImg) {
        uploadedFiles = await multipleFileUpload(req?.files?.colorImg);
    }
    console.log("bscgaygwyx", uploadedFiles)
    colors.forEach(color => {
        let existingColor = bike.colors.find(c => c.uniqueId === color.uniqueId);
        if (!existingColor) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === color.uniqueId);
            if (uploadedFile) {
                bike.colors.push({ ...color, colorBikeImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingColor.uniqueId);
            console.log("hello")
            if (uploadedFile) {
                console.log("1")
                console.log(color)
                existingColor.colorName = color.colorName;
                existingColor.colorCode = color.colorCode;
                existingColor.colorBikeImg = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
            } else {
                console.log(2)
                existingColor.colorName = color.colorName;
                existingColor.colorCode = color.colorCode;
            }
        }
    });


    bike.colors = bike.colors.filter(existingColor => {
        return colors.some(color => color.uniqueId === existingColor.uniqueId);
    });


    let uploadedFeatureFiles = []
    if (req?.files?.featureImg) {
        uploadedFeatureFiles = await multipleFileUpload(req?.files?.featureImg);
    }

    features.forEach(feature => {
        let existingFeature = bike.features.find(c => c.uniqueId === feature.uniqueId);
        if (!existingFeature) {
            const uploadedFile = uploadedFeatureFiles.find(uf => uf.uniqueId === feature.uniqueId);
            if (uploadedFile) {
                bike.features.push({ ...feature, featureImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
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


    bike.features = bike.features.filter(existingFeature => {
        return features.some(feature => feature.uniqueId === existingFeature.uniqueId);
    });

    bike.lastModifiedBy = req.user._id;

    await bike.save();


    res.status(200).json({
        success: true,
        message: "Colors added/updated successfully!",
        colors: bike.colors
    });
});

const getAllBikeModelsList = asyncHandler(async (req, res) => {
    console.log("bikeModels")
    const bikeModels = await BikeModelList.find({});
    res.status(200).json({
        success: true,
        data: bikeModels
    });
});


export { addBike, updateBike, deleteBike, getBike, getAllBikes, getAllLimitedBikesData, addOrUpdateSpecs, addOrUpdateOthers, getAllBikeModelsList };
