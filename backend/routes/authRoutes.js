import express from "express";
import { signup, verifyOtp, completeSignup, login, createProject, getProjects, applyToProject, getProjectById, updateProject, userProfile, acceptApplicant, rejectApplicant, toggleHiringStatus} from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/complete-signup", completeSignup);
router.post("/login", login);
router.post("/create-project", authMiddleware, createProject);
router.get("/getprojects", getProjects);
router.post("/apply/:id", authMiddleware, applyToProject);
router.get("/project/:id", authMiddleware, getProjectById);
router.put("/project/:id/edit", authMiddleware, updateProject);
router.get("/profile/:userId", authMiddleware, userProfile);
router.patch("/accept/:projectId/:userId", authMiddleware, acceptApplicant);
router.patch("/reject/:projectId/:userId", authMiddleware, rejectApplicant);
router.put("/toggle-hiring/:id", authMiddleware, toggleHiringStatus);
export default router;