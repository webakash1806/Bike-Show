import { model, Schema } from "mongoose";


const productEnquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Bike", "Scooty", "Accessories"]
    },
    model: {
        type: Schema.Types.ObjectId,
        refPath: "category"
    },
    dealer: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Active", "Resolved"],
        default: "Pending"
    },
    handledBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const ProductEnquiry = model("ProductEnquiry", productEnquirySchema)

export default ProductEnquiry