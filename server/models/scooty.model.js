import { model, Schema } from "mongoose";

const scootySchema = new Schema({

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
        colorScootyImg: {
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
    specification: {
        type: Schema.Types.ObjectId,
        ref: "ScootySpecification"
    },
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: "Accessories"
    }],
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


const scootyModel = new Schema({
    scootyModel: {
        type: String
    },
    scooty: {
        type: Schema.Types.ObjectId,
        ref: "Scooty"
    }
}, {
    timestamps: true
})

const Scooty = model("Scooty", scootySchema)

const ScootyModel = model("ScootyModel", scootyModel)

export { Scooty, ScootyModel }