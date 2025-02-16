import { model, Schema } from "mongoose";

const contactFormSchema = new Schema({
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

const Contact = model("Contact", contactFormSchema)

export default Contact