import { Schema, model } from "mongoose"

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true
    }
},
    { timestamps: true })

const Newsletter = model("Newsletter", newsletterSchema)


const heroBannerSchema = new Schema({
    image: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true })

const HeroBanner = model("HeroBanner", heroBannerSchema)

export { Newsletter, HeroBanner }