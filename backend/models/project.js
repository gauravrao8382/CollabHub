import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  teamSize: { type: Number, required: true, min: 1 },
  college: { type: String },
  applicants: [
    {
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
      name: String,
      college: String,
      skills: [String],
      passingYear: String,
    }
  ],
  teamMembers: [
    {
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
      name: String,
      college: String,
      skills: [String],
      passingYear: String,
    }
  ], 
  status: { 
    type: String, 
    enum: ['Open', 'Completed', 'Closed'], 
    default: 'Open' 
  },
  gitlink:{
    type: String,
  },
  livelink:{
    type: String,
  },
  finalNote:{
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);