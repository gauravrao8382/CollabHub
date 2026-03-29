import User from "../models/user.js";
import Project from "../models/project.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/signin.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000
      });
    } else {
      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      await user.save();
    }

    await sendEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "OTP verified" });

  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


export const completeSignup = async (req, res) => {
  try {
    const { email, name, college, passingYear, skills } = req.body;

    const user = await User.findOne({ email });

    user.name = name;
    user.college = college;
    user.passingYear = passingYear;
    user.skills = skills;
    user.isVerified = true;
    user.otp = null;

    await user.save();
    const  token = generateToken(user);
      res.json({ message: "Signup completed", token, user} );

  } catch (err) {
    res.status(500).json({ message: "Error completing signup" });
  }
};


export const login = async (req, res) => {
  try {

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};


export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, teamSize, college } = req.body;
    // 🔥 Create project securely
    const owner = req.user.id; 
    const user = await User.findById(owner);
    console.log(req.user.id);
    const project = await Project.create({
      title,
      description,
      techStack,
      teamSize,
      college,

      owner: req.user.id,
      status: "Open",
      applicants: [],
      teamMembers: [{
          userId: user._id,
          name: user.name,
          college: user.college,
          skills: user.skills,
          passingYear: user.passingYear,
      }]
    });
    await User.findByIdAndUpdate(owner, {
      $push: { createdProjects: project._id }
    });
    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Error creating project" });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Fetched projects:", projects);
    res.json({ message: "Projects fetched successfully", projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

export const applyToProject = async (req, res) => {
  try{
    const { name, college, skills, passingYear } = req.body;
    const projectId = req.params.id;
    const userId = req.user.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        applicants: {
          userId: userId,
          name,
          college,
          skills,
          passingYear
        }
      }
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        appliedProjects: {
          projectId: projectId,
          status: 'Applied'
        }
      }
    });
    console.log(`User ${userId} applied to project ${projectId}`);
    res.json({ message: "Applied to project successfully" });
  } catch (err) {
    console.error("Error applying to project:", err);
    res.status(500).json({ message: "Error applying to project" });

  }
}

export const getProjectById = async (req, res) => {
  try{
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    res.json({ message: "Project fetched successfully", project });
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Error fetching project" });
  }
}

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, techStack, teamSize, college } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    project.title = title;
    project.description = description;
    project.techStack = techStack;
    project.teamSize = teamSize;
    project.college = college;
    await project.save();
    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Error updating project" });
  }
}

export const userProfile = async (req, res) => {
  try {
    const {userId} = req.params;
    console.log("Fetching profile for user ID:", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User profile fetched successfully", user });
  }
    catch (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).json({ message: "Error fetching user profile" });
    }
}

export const acceptApplicant = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.teamMembers.includes(userId)) {
      return res.status(400).json({ message: "User already in team" });
    }

    const applicant = project.applicants.find(
      (a) => a.userId.toString() === userId
    );

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    project.teamMembers.push(applicant);

    project.applicants = project.applicants.filter(
      (a) => a.userId.toString() !== userId
    );

    await project.save();

    res.status(200).json({
      message: "Applicant accepted successfully",
      project
    });

  } catch (err) {
    console.error("Accept Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectApplicant = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const exists = project.applicants.some(
      (a) => a.userId.toString() === userId
    );

    if (!exists) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    
    project.applicants = project.applicants.filter(
      (a) => a.userId.toString() !== userId
    );

    await project.save();

    res.status(200).json({
      message: "Applicant rejected successfully",
      project
    });

  } catch (err) {
    console.error("Reject Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const toggleHiringStatus = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { status } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = status;
    await project.save();
    res.json({ message: "Project status updated successfully", project });
  }
  catch (err) {
    console.error("Error updating project status:", err);
    res.status(500).json({ message: "Error updating project status" });
  }
}