import express from "express";
// import { authorizeAdmin } from "../../../../Downloads/CourseBundler SourceCode/backend/middlewares/auth.js";
import { contact, courseRequest, getDashboardStats } from "../controllers/othercontrollers.js";
import { isAuthenticated,authorizedAdmin } from "../middleware/auth.js";

const router = express.Router()

router.route("/contact").post(contact)
router.route("/request").post(courseRequest)
router.route("/admin/stats").get(isAuthenticated,authorizedAdmin,getDashboardStats)
export default router;