import { Schema, model } from "mongoose"

const accessories = new Schema({
    accessoriesType: {
        type: String,
        enum: ["BikeModelList", "ScootyModel"]
    },
    model: {
        type: Schema.Types.ObjectId,
        refPath: "accessoriesType"
    },
    title: {
        type: String
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
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: 0
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lastModifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Accessories = model("Accessories", accessories)

export default Accessories