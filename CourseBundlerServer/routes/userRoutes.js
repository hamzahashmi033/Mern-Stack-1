import express from "express"
import { addToPlaylist, changePassword, deleteMyprofile, deleteUser, forgetPassword, getAllUsers, getUserProfile, loginuser, logoutUser, registerUser, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateRole } from "../controllers/userControllers.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js"

const router = express.Router()
// register a user
router.route("/register").post(singleUpload,registerUser)
// login a user
router.route("/login").post(loginuser)
// logout a user
router.route("/logout").get(logoutUser)
// get my profile data 
router.route("/me").get(isAuthenticated,getUserProfile)
// change password
router.route("/changepassword").put(isAuthenticated,changePassword)
// update profile (name,email)
router.route("/updateprofile").put(isAuthenticated,updateProfile)
// delete my profile
router.route("/deleteprofile").delete(isAuthenticated,deleteMyprofile)
// update profile picture
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload,updateProfilePicture)
// forgetPassword
router.route("/forgetpassword").post(forgetPassword)
// reset Password
router.route("/resetpassword/:token").put(resetPassword)
// add course to playlist array in user model
router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist)
// delete course to playlist array in user model
router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist)
// Admin Routes : get all users
router.route("/admin/users").get(isAuthenticated,authorizedAdmin,getAllUsers)
// Admin Routes : update role
router.route("/admin/user/:id").put(isAuthenticated,authorizedAdmin,updateRole).delete(isAuthenticated,authorizedAdmin,deleteUser)
export default router;