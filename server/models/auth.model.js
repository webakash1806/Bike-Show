import { Schema, model } from "mongoose";
import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'SALES'],
        default: 'ADMIN'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (err) {
        return next(new AppError(err.message, 500))
    }
})

userSchema.methods = {
    comparePassword: async function (password) {
        try {
            return await bcrypt.compare(password, this.password)
        } catch (err) {
            return false
        }
    },
    generateJWTToken: function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    },
    generateResetPasswordToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')

        this.resetPasswordExpiry = Date.now() + 5 * 60 * 1000

        return resetToken
    }
}


export default model('User', userSchema)