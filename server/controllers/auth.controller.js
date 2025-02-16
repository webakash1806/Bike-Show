import Accessories from "../models/accessories.model.js";
import User from "../models/auth.model.js";
import { Bike } from "../models/bike.model.js";
import Contact from "../models/contact.model.js";
import Helmet from "../models/helmet.model.js";
import ProductEnquiry from "../models/productEnquiry.model.js";
import { Scooty } from "../models/scooty.model.js";
import TestDrive from "../models/testDriveForm.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";
import crypto from 'crypto'
import sendMail from "../utils/mail.utils.js";
import bcrypt from 'bcryptjs'

const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
}

const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, confirmPassword, role = "ADMIN" } = req.body

    if (req?.user?.role !== "ADMIN") {
        throw new AppError("You are not authorized to perform this action", 401)
    }

    const uniqueUser = await User.findOne({ email })
    if (uniqueUser) {
        throw new AppError("User already exists", 400)
    }

    if (password !== confirmPassword) {
        throw new AppError("Password and confirm password does not match", 400)
    }

    const user = await User.create({ fullName, email, password, role })

    if (!user) {
        throw new AppError("Something went wrong!", 400)
    }

    const token = await user.generateJWTToken()

    await user.save()
    user.password = undefined

    return res
        .status(200)
        .cookie("token", token, cookieOption)
        .json({
            success: true,
            user,
            message: "Registered successfully!",
        })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new AppError("Email is not registered", 400)
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new AppError("Invalid password", 400)
    }

    const token = await user.generateJWTToken()

    user.password = undefined

    return res.status(200)
        .cookie("token", token, cookieOption)
        .json({
            success: true,
            user,
            message: "Logged in!",
        })
})

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true, secure: true, sameSite: 'None' })
        .json({
            success: true,
            message: "Logged out!",
        })
})

const getProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    let response = {
        success: true,
        user
    };

    if (["ADMIN"].includes(user.role)) {
        const updatedBikeCount = await Bike.countDocuments({ lastModifiedBy: user._id });
        const addedBikeCount = await Bike.countDocuments({ addedBy: user._id });

        const updatedScootyCount = await Scooty.countDocuments({ lastModifiedBy: user._id });
        const addedScootyCount = await Scooty.countDocuments({ addedBy: user._id });

        const updatedAccessoriesCount = await Accessories.countDocuments({ lastModifiedBy: user._id });
        const addedAccessoriesCount = await Accessories.countDocuments({ addedBy: user._id });

        const updatedHelmetsCount = await Helmet.countDocuments({ lastModifiedBy: user._id });
        const addedHelmetsCount = await Helmet.countDocuments({ addedBy: user._id });

        const enquiryForms = await ProductEnquiry.find({ handledBy: user._id });

        const inProgressCount = enquiryForms.filter(form => form.status === "Active").length;
        const resolvedCount = enquiryForms.filter(form => form.status === "Resolved").length;

        const testDriveForm = await TestDrive.find({ handledBy: user._id });

        const testDriveInProgressCount = testDriveForm.filter(form => form.status === "Active").length;
        const testDriveResolvedCount = testDriveForm.filter(form => form.status === "Resolved").length;

        const contactForm = await Contact.find({ handledBy: user._id });

        const contactFormInProgressCount = contactForm.filter(form => form.status === "Active").length;
        const contactFormResolvedCount = contactForm.filter(form => form.status === "Resolved").length;


        response = {
            ...response,
            updatedBikeCount,
            addedBikeCount,
            updatedScootyCount,
            addedScootyCount,
            updatedAccessoriesCount,
            addedAccessoriesCount,
            updatedHelmetsCount,
            addedHelmetsCount,
            inProgressCount,
            resolvedCount,
            testDriveInProgressCount,
            testDriveResolvedCount,
            contactFormInProgressCount,
            contactFormResolvedCount
        };

        res.status(200).json(response)
    } else if (["EDITOR"].includes(user.role)) {
        const updatedBikeCount = await Bike.countDocuments({ lastModifiedBy: user._id });
        const addedBikeCount = await Bike.countDocuments({ addedBy: user._id });

        const updatedScootyCount = await Scooty.countDocuments({ lastModifiedBy: user._id });
        const addedScootyCount = await Scooty.countDocuments({ addedBy: user._id });

        const updatedAccessoriesCount = await Accessories.countDocuments({ lastModifiedBy: user._id });
        const addedAccessoriesCount = await Accessories.countDocuments({ addedBy: user._id });

        const updatedHelmetsCount = await Helmet.countDocuments({ lastModifiedBy: user._id });
        const addedHelmetsCount = await Helmet.countDocuments({ addedBy: user._id });

        response = {
            ...response,
            updatedBikeCount,
            addedBikeCount,
            updatedScootyCount,
            addedScootyCount,
            updatedAccessoriesCount,
            addedAccessoriesCount,
            updatedHelmetsCount,
            addedHelmetsCount
        };

        res.status(200).json(response)
    } else if (["SALES"].includes(user.role)) {
        const enquiryForms = await ProductEnquiry.find({ handledBy: user._id });

        const inProgressCount = enquiryForms.filter(form => form.status === "Active").length;
        const resolvedCount = enquiryForms.filter(form => form.status === "Resolved").length;

        const testDriveForm = await TestDrive.find({ handledBy: user._id });

        const testDriveInProgressCount = testDriveForm.filter(form => form.status === "Active").length;
        const testDriveResolvedCount = testDriveForm.filter(form => form.status === "Resolved").length;

        const contactForm = await Contact.find({ handledBy: user._id });

        const contactFormInProgressCount = contactForm.filter(form => form.status === "Active").length;
        const contactFormResolvedCount = contactForm.filter(form => form.status === "Resolved").length;

        response = {
            ...response,
            inProgressCount,
            resolvedCount,
            testDriveInProgressCount,
            testDriveResolvedCount,
            contactFormInProgressCount,
            contactFormResolvedCount
        };

        res.status(200).json(response);

    }

})

const profile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
})

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        const existingUser = await User.findOne({
            email
        })

        if (!existingUser) {
            return res.status(403).send({
                status: false,
                message: "user not found"
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetPasswordExpiry = Date.now() + 600000

        existingUser.resetPasswordToken = resetToken
        existingUser.resetPasswordExpires = resetPasswordExpiry

        const { resetPasswordExpires } = existingUser
        const expiryTime = encodeURIComponent(resetPasswordExpires)

        await existingUser.save()

        const resetUrl = `http://localhost:5175/reset-password/${resetToken}/${email}/${expiryTime}`

        const subject = '🔒 Password Reset Request'
        const message = `
     <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 24rem; background-color: #f4f4f4; border-radius: 8px; padding: 20px; box-sizing: border-box; color-scheme: light dark; background-color: #ffffff; background-color: #1a1a1a;">
      <tr>
        <td style="text-align: center; padding: 20px 0;">
          
          <img src="https://img.icons8.com/ios-filled/50/E7000B/lock.png" alt="Lock Icon" style="width: 40px; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;">
    
          <p style="font-size: 1.2rem; font-weight: bold; margin: 0; color: #000000; color: #ffffff;">
            Hello, <span style="color: #E7000B;">${existingUser.fullName}</span>
          </p>
    
          <p style="font-weight: 400; text-align: center; margin: 20px 0; color: #555555; color: #cccccc;">
            It seems you’ve requested to reset your password. Let’s get you back on track! Click the button below to securely reset your password:
          </p>
    
          <a href="${resetUrl}" style="display: inline-block; background-color: #E7000B; background-image: linear-gradient(to top right, #1751fe, #E7000B, #0199ff); border: none; color: white; border-radius: 0.375rem; padding: 12px 25px; font-weight: bold; font-size: 1.1rem; margin: 15px 0; letter-spacing: 0.05rem; text-decoration: none;">
            Reset My Password
          </a>
    
          <p style="font-weight: 400; text-align: center; margin: 20px 0; color: #555555; color: #cccccc;">
            If you did not request a password reset, no worries—just ignore this email, and your password will remain unchanged.
          </p>
    
          <div style="text-align: center; margin-top: 20px;">
            <p style="margin: 0; font-size: 1rem; color: #000000; color: #ffffff;">
              Stay safe
            </p>
    
            <img src="https://www.honda2wheelersindia.com/assets/images/LogoHondaNew_24.png" alt="Shield Icon" style="width: 60px; margin: 10px 0;">
            <p style="margin: 0; color: #E7000B; font-weight: bold;">Big Swing Honda</p>
            <p style="margin: 0; color: #555555; color: #cccccc;">Support Team</p>
          </div>
    
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.facebook.com/BigSwingHondaGurgaon" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/E7000B/facebook.png" alt="Facebook" style="width: 25px; display: inline-block;">
            </a>
           
            <a href="https://www.instagram.com/bigswinghonda/" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/E7000B/instagram.png" alt="Instagram" style="width: 25px; display: inline-block;">
            </a>
           
          </div>
    
        </td>
      </tr>
    </table>`

        await sendMail(email, subject, message)

        res.status(200).json({ message: 'Password reset email sent' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'error in password recovery',
        });
    }

}

const resetPassword = async (req, res) => {

    const { token } = req.params;
    let { newPassword } = req.body;



    try {
        const existingUser = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        }).select('+password');


        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        newPassword = await bcrypt.hash(newPassword, 10);


        existingUser.password = newPassword;
        existingUser.resetPasswordToken = undefined;
        existingUser.resetPasswordExpires = undefined;
        await existingUser.save();

        res.status(200).json({ success: true, message: 'Password successfully updated' });



    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'error in reset password',
        });
    }


}


export { register, login, logout, profile, getProfile, forgotPassword, resetPassword }