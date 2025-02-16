import { model, Schema } from "mongoose";


const testDriveFormSchema = new Schema({
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
        enum: ["Bike", "Scooty"]
    },
    date: {
        type: Date,
        required: true
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

const TestDrive = model("TestDrive", testDriveFormSchema)

export default TestDrive