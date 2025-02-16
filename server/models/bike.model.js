import { model, Schema } from "mongoose";

const bikeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    features: [{
        uniqueId: {
            type: String
        },
        title: {
            type: String
        },
        featureImg: {
            publicId: {
                type: String,
                default: ""
            },
            url: {
                type: String,
                default: ""
            }
        },
    }],
    colors: [{
        uniqueId: {
            type: String
        },
        colorName: {
            type: String
        },
        colorCode: {
            type: String
        },
        colorBikeImg: {
            publicId: {
                type: String,
                default: ""
            },
            url: {
                type: String,
                default: ""
            }
        }
    }],
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: "Accessories"
    }],
    specification: {
        type: Schema.Types.ObjectId,
        ref: "BikeSpecification"
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lastModifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const bikeModelList = new Schema({
    bikeModel: {
        type: String
    },
    bike: {
        type: Schema.Types.ObjectId,
        ref: "Bike"
    }
}, {
    timestamps: true
})

bikeSchema.index({
    name: "text",
    description: "text",
    "features.title": "text",
    "colors.colorName": "text"
});


const Bike = model("Bike", bikeSchema)

const BikeModelList = model("BikeModelList", bikeModelList)

export { Bike, BikeModelList }