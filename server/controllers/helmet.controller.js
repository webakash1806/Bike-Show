import Helmet from "../models/helmet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { multipleFileUpload } from "../utils/fileUpload.utils.js";

const addHelmet = asyncHandler(async (req, res) => {
    const { helmetType, title, description, helmet: helmetList } = req.body;

    console.log(req.body)

    const helmet = JSON.parse(helmetList);
    console.log(helmet)
    const newHelmet = new Helmet({
        helmetType,
        title,
        description,
        addedBy: req.user._id
    });

    let uploadedFiles = []
    if (req?.files?.helmetImg) {
        uploadedFiles = await multipleFileUpload(req?.files?.helmetImg);
    }

    helmet.forEach(helmet => {
        let existingHelmet = newHelmet.helmet.find(c => c.uniqueId === helmet.uniqueId);
        if (!existingHelmet) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === helmet.uniqueId);
            if (uploadedFile) {
                newHelmet.helmet.push({ ...helmet, helmetImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingHelmet.uniqueId);
            console.log("hello")
            if (uploadedFile) {
                console.log("1")
                console.log(helmet)
                existingHelmet.title = helmet.title;
                existingHelmet.uniqueId = helmet.uniqueId;
                existingHelmet.variant = helmet.variant;
                existingHelmet.colorName = helmet.colorName;
                existingHelmet.helmetImg = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
            } else {
                console.log(2)
                existingHelmet.title = helmet.title;
                existingHelmet.uniqueId = helmet.uniqueId;
                existingHelmet.variant = helmet.variant;
                existingHelmet.colorName = helmet.colorName;
            }
        }
    });


    newHelmet.helmet = newHelmet.helmet.filter(existingHelmet => {
        return helmet.some(helmet => helmet.uniqueId === existingHelmet.uniqueId);
    });

    await newHelmet.save();

    return res.status(200).json({
        success: true,
        message: "Helmet added",
        newHelmet
    })
});

const getAllHelmets = asyncHandler(async (req, res) => {
    const helmets = await Helmet.find();
    return res.status(200).json({
        success: true,
        message: "Helmets fetched",
        helmets
    })
})

const updateHelmets = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { helmetType, title, description, helmet: helmetList } = req.body;

    const helmet = JSON.parse(helmetList);
    console.log(helmet);

    const newHelmet = await Helmet.findByIdAndUpdate(id, {
        helmetType,
        title,
        description,
        lastModifiedBy: req.user._id
    }, { new: true });

    let uploadedFiles = [];
    if (req?.files) {
        console.log(1)
        uploadedFiles = await multipleFileUpload(req?.files);
    }

    helmet.forEach(helmet => {
        let existingHelmet = newHelmet.helmet.find(c => c.uniqueId === helmet.uniqueId);
        if (!existingHelmet) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === helmet.uniqueId);
            if (uploadedFile) {
                newHelmet.helmet.push({ ...helmet, helmetImg: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingHelmet.uniqueId);
            if (uploadedFile) {

                existingHelmet.title = helmet.title;
                existingHelmet.uniqueId = helmet.uniqueId;
                existingHelmet.variant = helmet.variant;
                existingHelmet.colorName = helmet.colorName;
                existingHelmet.helmetImg = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
            } else {
                console.log(2)
                existingHelmet.title = helmet.title;
                existingHelmet.uniqueId = helmet.uniqueId;
                existingHelmet.variant = helmet.variant;
                existingHelmet.colorName = helmet.colorName;
            }
        }
    });

    newHelmet.helmet = newHelmet.helmet.filter(existingHelmet => {
        return helmet.some(helmet => helmet.uniqueId === existingHelmet.uniqueId);
    });

    await newHelmet.save();

    return res.status(200).json({
        success: true,
        message: "Helmet updated",
        newHelmet
    })
});

export { addHelmet, getAllHelmets, updateHelmets }