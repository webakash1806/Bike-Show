import { model, Schema } from "mongoose"


const helmetSchema = new Schema({
    helmetType: {
        type: String,
        enum: ["HALF", "FULL"]
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    helmet: [{
        uniqueId: {
            type: String
        },
        title: {
            type: String
        },
        colorName: {
            type: String
        },
        helmetImg: {
            publicId: {
                type: String,
                default: ""
            },
            url: {
                type: String,
                default: ""
            }
        },
        variant: [{
            size: {
                type: String,
                enum: ["S", "M", "L", "XL"]
            },
            price: {
                type: Number,

            },
        }]
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


const Helmet = model("Helmet", helmetSchema)

export default Helmet