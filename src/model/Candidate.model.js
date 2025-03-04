
import mongoose from "mongoose";


const CandidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    linkedin: String,
    skills: String,
    experience: String,
    resumeText: String, // Extracted text from PDF
    resumePath: String, // File path of uploaded resume
  });
  
  export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema)