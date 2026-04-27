import mongoose from "mongoose";
   

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String},
  name: String,
  college: String,
  passingYear: String,
  skills: [String],
  about: { type: String, default: "" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  createdProjects: [{
    projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project"
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Completed', 'Closed'],
      default: 'Open'
    } 
  }],
  appliedProjects: [{
    projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project" 
    },
    status:{
      type: String,
      enum: ['Applied', 'Accepted', 'Rejected', 'Completed'],
      default: 'Applied'
    }
  }],
  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);