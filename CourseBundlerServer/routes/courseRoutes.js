import express from "express"
import { addLectures, createCourse, deleteCourse, deleteLectures, getAllCourses, getCourseLectures } from "../controllers/courseControllers.js";
import { authorizedAdmin, authorizedSubscriber, isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router()


// get all courses with lectures array
router.route("/courses").get(getAllCourses)

// create course but only with admin role
router.route("/createcourse").post(isAuthenticated, authorizedAdmin, singleUpload, createCourse)

// add lectures, delete course, get single course detail with lectures
router.route("/course/:id").get(isAuthenticated,authorizedSubscriber, getCourseLectures).post(isAuthenticated, authorizedAdmin, singleUpload, addLectures).delete(isAuthenticated,authorizedAdmin,deleteCourse)
// delete lectures
router.route("/deletelecture").delete(isAuthenticated,authorizedAdmin,deleteLectures)
export default router;